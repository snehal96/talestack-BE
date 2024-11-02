const mongoose = require("mongoose");
const base = require("./base.model");

const UserInfo = mongoose.model(
  "userinfo",
  new mongoose.Schema({
    ...base.base,
    email: String,
    username: String,
    name: String,
    tagline: String,
    bio: String,
    profileImageUrl: String,
    isOnboarded: Boolean
  })
);

module.exports = UserInfo;
