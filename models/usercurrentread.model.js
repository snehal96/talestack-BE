const mongoose = require("mongoose")
const base = require("./base.model")

const UserCurrentRead = mongoose.model(
  "userCurrentRead",
  new mongoose.Schema({
    ...base.base,
    taleId: String,
    storyId: String,
    userId: String,
  })
)

module.exports = UserCurrentRead
