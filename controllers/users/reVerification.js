const { User } = require("../../models/userModel");

const { tryCatchWrapper } = require("../../utils/index");
const asyncHandler = require("express-async-handler");
const { sendEmail } = require("../../services/email/index");

const reVerification = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ code: 404, message: "User not found" });
  }
  if (user.verify) {
    res
      .status(400)
      .json({ code: 400, message: "Verification has already been passed" });
  }
  const msg = {
    to: email,
    subject: "Resending the letter to verify email by SendGrid",
    html: `<a target="_blank" href="HTTP://localhost:3000/api/auth/users/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendEmail(msg);

  res.status(200).json({ code: 200, message: "Verification email sent" });
});

module.exports = { reVerification: tryCatchWrapper(reVerification) };
