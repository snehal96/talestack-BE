const mongoose = require("mongoose");
const base = require("./base.model");

const UserFollowingCategory = mongoose.model(
  "userFollowingCategory",
  new mongoose.Schema({
    ...base.baseInteraction,
    userId: String,
    categoryId: String,
  })
);

module.exports = UserFollowingCategory;
