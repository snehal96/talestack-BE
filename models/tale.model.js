const mongoose = require("mongoose");
const base = require("./base.model");

const Tale = mongoose.model(
  "tale",
  new mongoose.Schema({
    ...base.base,
    title: String,
    thumbnailUrl: String,
    description: String,
    categoryId: String,
    tags: [
      {
        type: String,
      },
    ],
    expectedStoryCount: Number,
    currentStoryCount: {
      type: Number,
      default: 0,
    },
  })
);

module.exports = Tale;
