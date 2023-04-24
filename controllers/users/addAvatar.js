const path = require("path");
const { rename } = require("fs/promises");
const { tryCatchWrapper } = require("../../utils/index");
const { User } = require("../../models/userModel");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const addAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, filename } = req.file;
  const avatarName = `${_id}_${filename}`;
  const resultUpload = path.join(avatarsDir, avatarName);
  await rename(tempUpload, resultUpload);
  Jimp.read(resultUpload, (err, avatar) => {
    if (err) throw err;
    avatar.resize(250, 250).write(resultUpload);
  });
  const avatarURL = path.join("avatars", avatarName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = { addAvatar: tryCatchWrapper(addAvatar) };
