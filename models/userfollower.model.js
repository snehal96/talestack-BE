const mongoose = require("mongoose");
const base = require("./base.model");

const UserFollower = mongoose.model(
  "userFollower",
  new mongoose.Schema({
    ...base.baseInteraction,
    userId: String,
    followerId: String,
  })
);

module.exports = UserFollower;
