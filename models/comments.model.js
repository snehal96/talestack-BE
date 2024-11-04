const mongoose = require("mongoose")
const base = require("./base.model")

const Comment = mongoose.model(
    "comment",
    new mongoose.Schema({
      ...base.base,
      contentId: String,
      contentType: String,
      text: String,
      likes: { type: Number, default: 0 },
      dislikes: { type: Number, default: 0 },
      replies: [{type: String, ref: 'comment'}],
      parentCommentId: {type: String, ref: 'comment'},
      depth: { type: Number, default: 0 }
    })
  )
  
  module.exports = Comment