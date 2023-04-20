const express = require("express");

const router = express.Router();

const {
  register,
  login,
  logout,
  getCurrent,
} = require("../../controllers/users/index");
const { validateBody } = require("../../utils/index");
const { registerSchema, loginSchema } = require("../../models/userModel");
const authorization = require("../../middlewares/authorization");

router.post("/users/register", validateBody(registerSchema), register);
router.post("/users/login", validateBody(loginSchema), login);
router.put("/users/logout", authorization, logout);
router.get("/users/current", authorization, getCurrent);

module.exports = router;
