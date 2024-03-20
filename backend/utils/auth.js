const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const { User, Spot } = require("../db/models");
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

// If ownership doesn't need to be confirmed
const notOwner = (_req, res, next) => {
  res.locals.notOwner = true;
  return next();
};

// If current user doesn't own the Spot or Spot doesn't exist, return an error
const confirmSpot = async (req, res, next) => {
  const spotData = await Spot.findByPk(req.params.spotId);

  if (!spotData) {
    const err = new Error("Spot couldn't be found");
    err.hideTitle = true;
    err.status = 404;
    return next(err);
  } else {
    res.locals.spotData = spotData;
  }

  if (res.locals.notOwner) {
    return next();
  } else if (req.user.id !== spotData.ownerId) {
    const err = new Error("Forbidden");
    err.hideTitle = true;
    err.status = 403;
    return next(err);
  }

  return next();
};

// If current user doesn't own the Booking, return an error
const confirmBookingOwnership = (currUser, editBook, res) => {
  if (editBook.userId !== currUser.id)
    return res.status(403).json({ message: "Forbidden" });
};

// If current user doesn't own the Review, return an error
const confirmReviewOwnership = (currUser, reviewData, res) => {
  if (currUser.id !== reviewData.userId)
    return res.status(403).json({ message: "Forbidden" });
};

module.exports = {
  setTokenCookie,
  restoreUser,
  requireAuth,
  confirmSpot,
  notOwner,
  confirmBookingOwnership,
  confirmReviewOwnership,
};
