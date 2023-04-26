const { User } = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const { tryCatchWrapper } = require("../../utils/index");
const { SECRET_KEY } = process.env;

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error(
      res.status(401).json({ message: "Email or password is wrong." })
    );
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw new Error(
      res.status(401).json({ message: "Email or password is wrong" })
    );
  }
  if (!user.verify) {
    throw new Error(
      res.status(401).json({ message: "Please verify your email." })
    );
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: "starter",
    },
  });
});

module.exports = { login: tryCatchWrapper(login) };
