const { register } = require("./register");
const { login } = require("./login");
const { getCurrent } = require("./getCurrent");
const { logout } = require("./logout");
const { addAvatar } = require("./addAvatar");

module.exports = { register, login, getCurrent, logout, addAvatar };
