const mongoose = require("mongoose");
const base = require("./base.model");

const UserLikedStory = mongoose.model(
  "userLikedStory",
  new mongoose.Schema({
    ...base.baseInteraction,
    userId: String,
    storyId: String,
  })
);

module.exports = UserLikedStory;
