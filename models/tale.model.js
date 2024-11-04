const mongoose = require("mongoose")
const base = require("./base.model")

const Tale = mongoose.model(
  "tale",
  new mongoose.Schema({
    ...base.base,
    parentTaleId: String,
    closeGroupId: String,
    type: String,
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
    hasDraft: {
      type: Boolean,
      default: false,
    },
    private: {
      type: Boolean,
      default: true,
    },
    premium: {
      type: Boolean,
      default: false,
    },
    likeCount: {
      type: Number,
      default: 0
    },
    saveCount: {
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
)

module.exports = Tale
