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
    isOnboarded: Boolean,
    private: {
      type: Boolean,
      default: true
    },
    followerCount: {
      type: Number,
      default: 0
    },
    followingCount: {
      type: Number,
      default: 0
    },
    taleCount: {
      type: Number,
      default: 0
    }
  })
);

module.exports = UserInfo;
