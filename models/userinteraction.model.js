const mongoose = require("mongoose");
const base = require("./base.model");

const UserInteraction = mongoose.model(
  "userinteraction",
  new mongoose.Schema({
    ...base.baseInteraction,
    userId: String,
    entityId: String,
    entityType: String,
    interactionType: String
  })
);

module.exports = UserInteraction;
