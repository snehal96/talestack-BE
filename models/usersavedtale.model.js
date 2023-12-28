const mongoose = require("mongoose");
const base = require("./base.model");

const UserSavedTale = mongoose.model(
  "userSavedTale",
  new mongoose.Schema({
    ...base.baseInteraction,
    userId: String,
    taleId: String,
  })
);

module.exports = UserSavedTale;
