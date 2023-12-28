const mongoose = require("mongoose");
const base = require("./base.model");

const Story = mongoose.model(
  "story",
  new mongoose.Schema({
    ...base.base,
    taleId: String,
    title: String,
    content: String,
    storyOrder: Number,
    hasDraft: {
      type: Boolean,
      default: false,
    },
  })
);

module.exports = Story;
