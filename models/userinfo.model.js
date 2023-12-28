const mongoose = require("mongoose");
const base = require("./base.model");

const UserInfo = mongoose.model(
  "userinfo",
  new mongoose.Schema({
    ...base.base,
    email: String,
    name: String,
    tagline: String,
    bio: String,
    profileImageUrl: String,
  })
);

module.exports = UserInfo;
