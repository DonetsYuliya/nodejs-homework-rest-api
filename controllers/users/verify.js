const { User } = require("../../models/userModel");

const { tryCatchWrapper } = require("../../utils/index");
const asyncHandler = require("express-async-handler");

const verify = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    res.status(404).json({ code: 404, message: "User not found" });
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.status(200).json({ code: 200, message: "Verification successful" });
});

module.exports = { verify: tryCatchWrapper(verify) };
