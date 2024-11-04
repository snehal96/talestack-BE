const mongoose = require("mongoose")
const base = require("./base.model")

const UserFollowRequest = mongoose.model(
    "userfollowrequest",
    new mongoose.Schema({
      ...base.baseInteraction,
      userId: String,
      followingId: String
    })
  )
  
  module.exports = UserFollowRequest