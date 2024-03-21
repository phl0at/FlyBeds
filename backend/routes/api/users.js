const { User } = require("../../db/models");
const { setTokenCookie } = require("../../utils/auth");
const { validateSignup } = require("../../utils/validation");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
// --------------------- //
// ------ SIGN UP ------ //
// --------------------- //
router.post("/", validateSignup, async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const allUsers = await User.unscoped().findAll();
  const user = User.build({
    firstName,
    lastName,
    email,
    username,
    hashedPassword,
  });
  for (let users of allUsers) {
    if (users.dataValues.email === user.email)
      return res.status(500).json({
        message: "User already exists",
        errors: {
          email: "User with that email already exists",
        },
      });
    if (users.username === user.username)
      return res.status(500).json({
        message: "User already exists",
        errors: {
          email: "User with that username already exists",
        },
      });
  }
  await user.save();
  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };
  await setTokenCookie(res, safeUser);
  return res.json({
    user: safeUser,
  });
});
module.exports = router;
