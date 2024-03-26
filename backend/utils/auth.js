const { User, Spot, Booking, Review, ReviewImage } = require("../db/models");
const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const e = require("express");
const { secret, expiresIn } = jwtConfig;

// ----------------------------- //
// ------ AUTH MIDDLEWARE ------ //
// ----------------------------- //

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

const requireAuth = function (req, _res, next) {
  // If there is no current user, return an error
  if (!req.user) {
    const err = new Error("Authentication required");
    err.hideTitle = true;
    err.status = 401;
    return next(err);
  } else {
    return next();
  }
};

// ----------------------------- //
// ------ SPOT MIDDLEWARE ------ //
// ----------------------------- //

const spotExists = async (req, _res, next) => {
  // If the spot doesn't exist, return an error
  const spotData = await Spot.findByPk(req.params.spotId);

  if (!spotData) {
    const err = new Error("Spot couldn't be found");
    err.hideTitle = true;
    err.status = 404;
    return next(err);
  } else {
    // If it does exist, attach the queried data to the request
    req.spotData = spotData;
    return next();
  }
};

const spotOwner = async (req, _res, next) => {
  // If current user doesn't own the Spot, return an error
  if (req.user.id !== req.spotData.ownerId) {
    const err = new Error("Forbidden");
    err.hideTitle = true;
    err.status = 403;
    return next(err);
  } else {
    return next();
  }
};

// ------------------------------- //
// ------ REVIEW MIDDLEWARE ------ //
// ------------------------------- //

const reviewExists = async (req, _res, next) => {
  // If the review doesn't exist, return an error
  const reviewData = await Review.findOne({
    where: { id: req.params.reviewId },
    include: [{ model: ReviewImage }],
  });

  if (!reviewData) {
    const err = new Error("Review couldn't be found");
    err.hideTitle = true;
    err.status = 404;
    return next(err);
  } else {
    // If it does exist, attach the queried data to the request
    req.reviewData = reviewData;
    return next();
  }
};

const reviewOwner = async (req, _res, next) => {
  // If the user doesn't own the spot, return an error
  if (req.user.id !== req.reviewData.userId) {
    const err = new Error("Forbidden");
    err.hideTitle = true;
    err.status = 403;
    return next(err);
  } else {
    return next();
  }
};

const reviewImageNum = async (req, _res, next) => {
  // If there are already 10 review images, return an error
  if (req.reviewData.ReviewImages.length >= 10) {
    const err = new Error(
      "Maximum number of images for this resource was reached"
    );
    err.hideTitle = true;
    err.status = 403;
    return next(err);
  } else {
    return next();
  }
};

// -------------------------------- //
// ------ BOOKING MIDDLEWARE ------ //
// -------------------------------- //

const bookExists = async (req, _res, next) => {
  // If the booking doesn't exist, return an error
  const bookData = await Booking.findOne({
    where: {
      id: req.params.bookingId,
    },
    include: {
      model: Spot,
    },
  });

  if (!bookData) {
    const err = new Error("Booking couldn't be found");
    err.hideTitle = true;
    err.status = 404;
    return next(err);
  } else {
    // If it does exist, attach the queried data to the request
    req.bookData = bookData;
    return next();
  }
};

const bookOwner = async (req, _res, next) => {
  // Special case for delete a booking route
  if (req.route.methods.delete) {
    // If the logged in user does not own the booking or the spot,
    // return an error
    if (
      bookData.userId !== req.user.id &&
      bookData.Spot.ownerId !== req.user.id
    ) {
      const err = new Error("Forbidden");
      err.hideTitle = true;
      err.status = 403;
      return next(err);
    } else {
      return next();
    }
  } else {
    // In all other cases, if the logged in user doesn't own the booking,
    // return an error
    if (req.user.id !== req.bookData.userId) {
      const err = new Error("Forbidden");
      err.hideTitle = true;
      err.status = 403;
      return next(err);
    } else {
      return next();
    }
  }
};

module.exports = {
  setTokenCookie,
  restoreUser,
  requireAuth,
  spotExists,
  spotOwner,
  reviewExists,
  reviewOwner,
  reviewImageNum,
  bookExists,
  bookOwner,
};
