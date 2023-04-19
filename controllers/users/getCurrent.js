const asyncHandler = require("express-async-handler");
const { tryCatchWrapper } = require("../../utils/index");

const getCurrent = asyncHandler(async (req, res) => {
  const { email, subscription } = req.user;
  if (!email) {
    throw new Error(res.status(401).json({ message: "Not authorized" }));
  }

  res.status(200).json({
    email,
    subscription,
  });
});
module.exports = { getCurrent: tryCatchWrapper(getCurrent) };
