const { User } = require("../../models/userModel");
const asyncHandler = require("express-async-handler");

const { tryCatchWrapper } = require("../../utils/index");

const logout = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const user = await User.findOne({ _id });
  if (!user) {
    throw new Error(res.status(401).json({ message: "Not authorized" }));
  }

  await User.findByIdAndUpdate(user._id, { token: null });

  res.status(204).json("No Content");
});

module.exports = { logout: tryCatchWrapper(logout) };
