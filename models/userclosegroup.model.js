const mongoose = require("mongoose")
const base = require("./base.model")

const UserCloseGroup = mongoose.model(
    "userclosegroup",
    new mongoose.Schema({
      ...base.base,
      groupName: {
        type: String,
        default: 'CLOSED'
      },
      type: {
        type: String,
        default: 'USER'
      },
      taleList: [{ type: String }]
    })
  )
  
  module.exports = UserCloseGroup