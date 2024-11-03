const mongoose = require("mongoose");
const base = require("./base.model");

const Story = mongoose.model(
  "story",
  new mongoose.Schema({
    ...base.base,
    taleId: String,
    private: Boolean,
    type: String,
    title: String,
    content: String,
    storyOrder: Number,
    likeCount: {
      type: Number,
      default: 0
    },
    shareCount: {
      type: Number,
      default: 0
    },
    commentCount: {
      type: Number,
      default: 0
    },
    cloneCount: {
      type: Number,
      default: 0
    }
  })
);

module.exports = Story;
