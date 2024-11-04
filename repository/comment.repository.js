const Comment = require("../models").comment
const { nanoid } = require("nanoid")

exports.addComment = async ({
  userId,
  contentId,
  contentType,
  text,
  parentId
}) => {
  let depth = 0
  if (parentId) {
    const parentComment = await Comment.findOne({ entityId: parentId }).exec()
    depth = parentComment.depth + 1
  }

  const creationDate = new Date()
  const id = nanoid(6)
  const newComment = new Comment({
    entityId: id,
    createdBy: userId,
    createdDate: creationDate,
    updatedBy: userId,
    updatedDate: creationDate,
    status: "ACTIVE",
    contentId,
    contentType,
    text,
    depth
  })
  await newComment.save()

  if (parentId) {
    await Comment.findOneAndUpdate({ entityId: parentId }, { $push: { replies: id } })
  }
}

exports.getCommentById = async ({ commentId }) => {
  const topLevelComment = await Comment.find({ entityId: commentId })
  const replies = await Comment.find({ parentId: commentId })
  return { topLevelComment, replies }
}

exports.getCommentByContentId = async ({ contentId, contentType, parentId, depth = 0, page = 0, limit = 20}) => {
  return await Comment
    .find({ contentId, contentType, parentId, depth, status: { $ne: "DELETED"} })
    .skip(page * limit)
    .limit(limit)
}

async function deleteChildComments (commentId) {
  const commentToDelete = await Comment.findOne({ entityId: commentId })
  if (commentToDelete) {
    await Comment.findOneAndUpdate({ entityId: commentId }, { $set: { status: 'DELETED' } })
    for (const replyId of commentToDelete.replies) {
      await deleteCommentAndReplies(replyId)
    }
  }
}

exports.removeCommentById = async ({ commentId }) => {
  await Comment.findOneAndUpdate({ entityId: commentId }, { $set: { status: "DELETED" }})
  deleteChildComments(commentId)
}

exports.removeCommentByContentId = async ({ contentId, contentType }) => {
  return await Comment.updateMany({ contentId, contentType }, { $set: { status: "DELETED" }})
}

exports.updateCommentInteraction = async ({ commentId, type, count = 1 }) => {
  return await Comment.updateOne({ entityId: commentId }, { $inc: { [type]: count } })
}