const mongoose = require("mongoose");
const base = require("./base.model");

const TrendingTale = mongoose.model(
  "trendingTale",
  new mongoose.Schema({
    ...base.base,
    taleId: String,
    savedCount: {
      type: Number,
      default: 0,
    },
    clickCount: {
      type: Number,
      default: 0,
    },
    likedCount: {
      type: Number,
      default: 0,
    },
    score: {
      type: Number,
      default: 0,
    },
  })
);

module.exports = TrendingTale;
