const mongoose = require("mongoose");
const base = require("./base.model");

const TrendingUser = mongoose.model(
  "trendingUser",
  new mongoose.Schema({
    ...base.base,
    userId: String,
    taleCount: {
      type: Number,
      default: 0,
    },
    savedCount: {
      type: Number,
      default: 0,
    },
    followerCount: {
      type: Number,
      default: 0,
    },
    score: {
      type: Number,
      default: 0,
    },
  })
);

module.exports = TrendingUser;
