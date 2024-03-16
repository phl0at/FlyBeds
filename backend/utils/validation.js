const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const currDate = new Date().toISOString().split("T")[0];

const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach((error) => (errors[error.path] = error.msg));

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email"),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Username is required"),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("firstName")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("First Name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Last Name is required"),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

const validateQuery = [
  check("page")
    .optional({ nullable: true, checkFalsy: true })
    .isFloat({ min: 1, max: 10 })
    .withMessage("Page must be greater than or equal to 1"),
  check("size")
    .optional({ nullable: true, checkFalsy: true })
    .isFloat({ min: 1, max: 20 })
    .withMessage("Size must be greater than or equal to 1"),
  check("maxLat")
    .optional({ nullable: true, checkFalsy: true })
    .isFloat({ max: 90 })
    .withMessage("Maximum latitude is invalid"),
  check("minLat")
    .optional({ nullable: true, checkFalsy: true })
    .isFloat({ min: -90 })
    .withMessage("Minimum latitude is invalid"),
  check("maxLng")
    .optional({ nullable: true, checkFalsy: true })
    .isFloat({ max: 180 })
    .withMessage("Maximum longitude is invalid"),
  check("minLng")
    .optional({ nullable: true, checkFalsy: true })
    .isFloat({ min: -180 })
    .withMessage("Minimum longitude is invalid"),
  check("minPrice")
    .optional({ nullable: true, checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage("Minimum price must be greater than or equal to 0"),
  check("maxPrice")
    .optional({ nullable: true, checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage("Maximum price must be greater than or equal to 0"),
  handleValidationErrors,
];

const validateBooking = [
  check("startDate")
    .isAfter(currDate)
    .withMessage("startDate cannot be in the past"),
  check("endDate")
    .custom(async (endDate, { req }) => {
      if (endDate <= req.body.startDate) {
        throw new Error();
      }
    })
    .withMessage("endDate cannot be on or before startDate"),
  handleValidationErrors,
];

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isFloat({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];
const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Street address is required"),
  check("city")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("City is required"),
  check("state")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be within -90 and 90"),
  check("lng")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be within -180 and 180"),
  check("name")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isFloat({ min: 0 })
    .withMessage("Price per day must be a positive number"),
  handleValidationErrors,
];

const validateDates = (bookData, bookingId, endDate, startDate, res) => {
  for (const book of bookData) {
    let booking = book.dataValues;
    let currStart = booking.startDate.toISOString().split("T")[0];
    let currEnd = booking.endDate.toISOString().split("T")[0];
    let errors = {};

    if (bookingId) {
      //don't want to throw errors for the booking we want to edit!
      if (booking.id !== Number(bookingId)) {
        // start date falls within an existing booking
        if (startDate >= currStart && startDate <= currEnd) {
          errors.startDate = "Start date conflicts with an existing booking";
        }
        // end date falls within an existing booking
        if (endDate >= currStart && endDate <= currEnd) {
          errors.endDate = "End date conflicts with an existing booking";
        }
        // start/end within an existing booking
        if (startDate >= currStart && endDate <= currEnd) {
          errors.startDate = "Start date conflicts with an existing booking";
          errors.endDate = "End date conflicts with an existing booking";
        }
        // start/end wrapped around an existing booking
        if (startDate <= currStart && endDate >= currEnd) {
          errors.startDate = "Start date conflicts with an existing booking";
          errors.endDate = "End date conflicts with an existing booking";
        }
      }
    } else {
      // start date falls within an existing booking
      if (startDate >= currStart && startDate <= currEnd) {
        errors.startDate = "Start date conflicts with an existing booking";
      }
      // end date falls within an existing booking
      if (endDate >= currStart && endDate <= currEnd) {
        errors.endDate = "End date conflicts with an existing booking";
      }
      // start/end within an existing booking
      if (startDate >= currStart && endDate <= currEnd) {
        errors.startDate = "Start date conflicts with an existing booking";
        errors.endDate = "End date conflicts with an existing booking";
      }
      // start/end wrapped around an existing booking
      if (startDate <= currStart && endDate >= currEnd) {
        errors.startDate = "Start date conflicts with an existing booking";
        errors.endDate = "End date conflicts with an existing booking";
      }
    }
    if (errors.startDate || errors.endDate)
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors,
      });
  }
};

module.exports = {
  handleValidationErrors,
  validateSpot,
  validateReview,
  validateBooking,
  validateQuery,
  validateSignup,
  validateDates,
};
