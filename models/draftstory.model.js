const mongoose = require("mongoose");
const base = require("./base.model");

const DraftStory = mongoose.model(
  "draftStory",
  new mongoose.Schema({
    ...base.base,
    type: String,
    taleId: String,
    storyId: String,
    title: String,
    content: String,
  })
);

module.exports = DraftStory;
