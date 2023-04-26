const express = require("express");

const router = express.Router();

const {
  register,
  login,
  logout,
  getCurrent,
  addAvatar,
  verify,
  reVerification,
} = require("../../controllers/users/index");

const { validateBody } = require("../../utils/index");
const {
  registerSchema,
  loginSchema,
  emailSchema,
} = require("../../models/userModel");
const { authorization, upload } = require("../../middlewares/index");

router.post("/users/register", validateBody(registerSchema), register);

router.get("/users/verify/:verificationToken", verify);
router.post("/users/verify", validateBody(emailSchema), reVerification);

router.post("/users/login", validateBody(loginSchema), login);
router.put("/users/logout", authorization, logout);
router.get("/users/current", authorization, getCurrent);

router.patch(
  "/users/avatars",
  authorization,
  upload.single("avatar"),
  addAvatar
);

module.exports = router;
