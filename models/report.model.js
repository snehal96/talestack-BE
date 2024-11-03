const mongoose = require("mongoose");
const base = require("./base.model");

const Report = mongoose.model(
  "report",
  new mongoose.Schema({
    ...base.base,
    contentId: String,
    contentType: String,
    reason: String
  })
);

module.exports = Report;
