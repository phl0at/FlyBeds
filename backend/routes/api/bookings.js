const express = require("express");
const bcrypt = require("bcryptjs");
const sequelize = require("sequelize");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { Spot } = require("../../db/models");
const { SpotImage } = require("../../db/models");
const { Review } = require("../../db/models");
const { ReviewImage } = require("../../db/models");
const { Booking } = require("../../db/models")

const router = express.Router();

router.get("/current", requireAuth, async (req, res) => {

})








module.exports = router;
