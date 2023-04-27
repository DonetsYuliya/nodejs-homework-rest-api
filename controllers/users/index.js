const { register } = require("./register");
const { login } = require("./login");
const { getCurrent } = require("./getCurrent");
const { logout } = require("./logout");
const { addAvatar } = require("./addAvatar");
const { verify } = require("./verify");
const { reVerification } = require("./reVerification");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  addAvatar,
  verify,
  reVerification,
};
