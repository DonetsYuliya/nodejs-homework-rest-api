const { User } = require("../../models/userModel");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { tryCatchWrapper } = require("../../utils/index");
const asyncHandler = require("express-async-handler");
const { sendEmail } = require("../../middlewares/index");

const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({ message: "Email in use" });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const msg = {
    to: email,
    subject: "Test sending the letter to verify email by SendGrid",
    html: `<a target="_blank" href="HTTP://localhost:3000/api/auth/users/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(msg);

  res.status(201).json({
    user: {
      email: result.email,
      subscription: "starter",
    },
  });
});

module.exports = { register: tryCatchWrapper(register) };
