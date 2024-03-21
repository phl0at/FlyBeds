const { User } = require("../../db/models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { validateLogin } = require("../../utils/validation");
const { setTokenCookie } = require("../../utils/auth");
const express = require("express");
const router = express.Router();
// -------------------- //
// ------ LOG IN ------ //
// -------------------- //
router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;
  const user = await User.unscoped().findOne({
    where: {
      [Op.or]: {
        username: credential,
        email: credential,
      },
    },
  });
  if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    err.title = "Login failed";
    err.hideTitle = true;
    err.errors = { credential: "The provided credentials were invalid." };
    return next(err);
  }
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
// --------------------- //
// ------ LOG OUT ------ //
// --------------------- //
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Success" });
});
// ---------------------------------- //
// ------ RESTORE SESSION USER ------ //
// ---------------------------------- //
router.get("/", (req, res) => {
  const { user } = req;
  if (user) {
    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };
    return res.json({
      user: safeUser,
    });
  } else return res.json({ user: null });
});
module.exports = router;
