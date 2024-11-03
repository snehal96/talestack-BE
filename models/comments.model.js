const mongoose = require("mongoose");
const base = require("./base.model");

const Comment = mongoose.model(
    "comment",
    new mongoose.Schema({
      ...base,
      contentId: String,
      type: String,
      text: String,
      likes: { type: Number, default: 0 },
      dislikes: { type: Number, default: 0 },
      replies: [this],
      parentCommentId: String,
      isPromotedToPost: { type: Boolean, default: false }
    })
  );
  
  module.exports = Comment;