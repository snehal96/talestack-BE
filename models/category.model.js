const mongoose = require("mongoose");
const base = require("./base.model");

const Category = mongoose.model(
  "category",
  new mongoose.Schema({
    ...base.base,
    name: String,
    thumbnailUrl: String,
    parentId: String,
  })
);

module.exports = Category;
