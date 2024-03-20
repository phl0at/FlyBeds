const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const { User, Spot, Booking, Review } = require("../db/models");
const { secret, expiresIn } = jwtConfig;

// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
  // Create the token
  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
  };
  const token = jwt.sign({ data: safeUser }, secret, {
    expiresIn: parseInt(expiresIn),
  });

  const isProduction = process.env.NODE_ENV === "production";

  // Set the token cookie
  res.cookie("token", token, {
    maxAge: expiresIn * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax",
  });

  return token;
};

const restoreUser = (req, res, next) => {
  //token parsed from cookies
  const { token } = req.cookies;
  req.user = null;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) return next();

    try {
      const { id } = jwtPayload.data;
      req.user = await User.findByPk(id, {
        attributes: {
          include: ["email", "createdAt", "updatedAt"],
        },
      });
    } catch (e) {
      res.clearCookie("token");
      return next();
    }

    if (!req.user) res.clearCookie("token");

    return next();
  });
};

// If there is no current user, return an error
const requireAuth = function (req, _res, next) {
  if (req.user) return next();

  const err = new Error("Authentication required");
  err.hideTitle = true;
  err.status = 401;
  return next(err);
};

// If ownership isn't required
const notOwner = (req, _res, next) => {
  req.notOwner = true;
  return next();
};

// If current user doesn't own the Spot or Spot doesn't exist, return an error
const confirmSpot = async (req, _res, next) => {
  const spotData = await Spot.findByPk(req.params.spotId);

  if (!spotData) {
    const err = new Error("Spot couldn't be found");
    err.hideTitle = true;
    err.status = 404;
    return next(err);
  } else {
    req.spotData = spotData;
  }

  if (req.notOwner) {
    return next();
  } else if (req.user.id !== spotData.ownerId) {
    const err = new Error("Forbidden");
    err.hideTitle = true;
    err.status = 403;
    return next(err);
  } else {
    return next();
  }
};

// If current user doesn't own the Booking, return an error
const confirmBooking = async (req, res, next) => {
  const bookData = await Booking.findByPk(req.params.bookingId);

  if (!bookData) {
    const err = new Error("Booking couldn't be found");
    err.hideTitle = true;
    err.status = 404;
    next(err);
  } else {
    if (req.notOwner) {
      req.bookData = bookData;
      next();
    } else if (req.user.id !== bookData.userId) {
      const err = new Error("Forbidden");
      err.hideTitle = true;
      err.status = 403;
      next(err);
    } else {
      req.bookData = bookData;
      next();
    }
  }
};

// If current user doesn't own the Review, return an error
const confirmReview = async (req, _res, next) => {
  const reviewData = await Review.findByPk(req.params.reviewId);

  if (!reviewData) {
    const err = new Error("Booking couldn't be found");
    err.hideTitle = true;
    err.status = 404;
    return next(err);
  } else {
    req.reviewData = reviewData;
  }

  if (req.notOwner) {
    return next();
  } else if (req.user.id !== reviewData.userId) {
    const err = new Error("Forbidden");
    err.hideTitle = true;
    err.status = 403;
    return next(err);
  } else {
    return next();
  }
};

module.exports = {
  setTokenCookie,
  restoreUser,
  requireAuth,
  notOwner,
  confirmSpot,
  confirmBooking,
  confirmReview,
};
