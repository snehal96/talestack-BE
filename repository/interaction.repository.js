const db = require("../models")
const Category = db.category
const UserFollowRequest = db.userfollowrequest
const UserFollower = db.userfollower
const UserFollowingCategory = db.userfollowingcategory
const UserInteraction = db.userinteraction
const UserInfo = db.userinfo
const Tale = db.tale
const Story = db.story
const Report = db.report

exports.getFollowRequestByUserId = async (userId, limit = 20, page = 0) => {
  const data = await UserFollowRequest.find({ userId: userId }, "followingId").exec()
  return await UserInfo.find({ entityId: { $in: data } }, { _id: 0 })
    .skip(page * limit)
    .limit(limit)
    .exec()
}

exports.getFollowerByUserId = async (userId, limit = 20, page = 0) => {
  const data = await UserFollower.find({ userId: userId }, "followingId").exec()
  return await UserInfo.find({ entityId: { $in: data } }, { _id: 0 }).exec()
}

exports.getFollowingByUserId = async (userId) => {
  const data = await UserFollower.find({ followingId: userId }, "userId").exec()
  return await UserInfo.find({ entityId: { $in: data } }, { _id: 0 }).exec()
}

exports.getFollowStatus = async (userId, requestorId) => {
  return await UserFollower.countDocuments({ userId, followingId: requestorId }).exec()
}

exports.getFollowedCategoryByUserId = async (userId) => {
  const data = await UserFollowingCategory.find(
    { userId: userId },
    "categoryId"
  ).exec()
  return await Category.find({ entityId: { $in: data } }, { _id: 0 }).exec()
}

exports.getLikedTaleByUserId = async (userId) => {
  const data = await UserInteraction.find({ userId: userId, entityType: 'TALE', interactionType: 'LIKE' }, "entityId").exec()
  return await Tale.find({ entityId: { $in: data } }, { _id: 0 }).exec()
}

exports.getSavedTaleByUserId = async (userId) => {
  const data = await UserInteraction.find({ userId: userId, entityType: 'TALE', interactionType: 'SAVE' }, "entityId").exec()
  return await Tale.find({ entityId: { $in: data } }, { _id: 0 }).exec()
}

exports.getLikedStoryByUserId = async (userId) => {
  const data = await UserInteraction.find({ userId: userId, entityType: 'STORY', interactionType: 'LIKE' }, "entityId").exec()
  return await Story.find({ entityId: { $in: data } }, { _id: 0 }).exec()
}

exports.getReport = async (page = 0, limit = 20) => {
  return await Report.find({}, { _id: 0 }).skip(page * limit).limit(limit).exec()
}

exports.getReportByUserAndContent = async (userId, contentId) => {
  return await Report.countDocuments({ userId, contentId }).exec()
}

exports.addFollowRequestByUserId = async (userId, followingId) => {
  const follower = new UserFollower({
    createdDate: new Date(),
    userId,
    followingId
  })

  return await follower.save()
}

exports.addFollowerByUserId = async (userId, followingId) => {
  const followRequest = new UserFollowRequest({
    createdDate: new Date(),
    userId,
    followingId
  })

  return await followRequest.save()
}

exports.addFollowedCategoryByUserId = async (userId, categoryId) => {
  const followedCategory = new UserFollowingCategory({
    createdDate: new Date(),
    userId,
    categoryId,
  })

  return await followedCategory.save()
}

exports.addLikedTaleByUserId = async (userId, entityId) => {
  const userInteraction = new UserInteraction({
    createdDate: new Date(),
    userId,
    entityId,
    entityType: 'TALE',
    interactionType: 'LIKE'
  })

  return await userInteraction.save()
}

exports.addSavedTaleByUserId = async (userId, entityId) => {
  const userInteraction = new UserInteraction({
    createdDate: new Date(),
    userId,
    entityId,
    entityType: 'TALE',
    interactionType: 'SAVE'
  })

  return await userInteraction.save()
}

exports.addLikedStoryByUserId = async (userId, entityId) => {
  const userInteraction = new UserInteraction({
    createdDate: new Date(),
    userId,
    entityId,
    entityType: 'STORY',
    interactionType: 'LIKE'
  })

  return await userInteraction.save()
}

exports.addReport = async ({
  userId,
  contentId,
  contentType,
  reason
}) => {
  const creationDate = new Date()
  const reportId = nanoid(6)
  const reportObj = Report({
    entityId: reportId,
    createdBy: userId,
    createdDate: creationDate,
    updatedBy: "",
    updatedDate: creationDate,
    status: "ACTIVE",
    contentId,
    contentType,
    reason
  })
  await reportObj.save()
  return reportId
}

exports.removeFollowRequestByUserId = async (userId, followingId) => {
  return await UserFollowRequest.deleteOne({
    userId,
    followingId,
  }).exec()
}

exports.removeFollowerByUserId = async (userId, followingId) => {
  return await UserFollower.deleteOne({
    userId,
    followingId,
  }).exec()
}

exports.removeFollowedCategoryByUserId = async (userId, categoryId) => {
  return await UserFollowingCategory.deleteOne({
    userId,
    categoryId,
  }).exec()
}

exports.removeLikedTaleByUserId = async (userId, entityId) => {
  return await UserInteraction.deleteOne({
    userId,
    entityId,
    entityType: 'TALE',
    interactionType: 'LIKE'
  }).exec()
}

exports.removeSavedTaleByUserId = async (userId, entityId) => {
  return await UserInteraction.deleteOne({
    userId,
    entityId,
    entityType: 'TALE',
    interactionType: 'SAVE'
  }).exec()
}

exports.removeLikedStoryByUserId = async (userId, entityId) => {
  return await UserInteraction.deleteOne({
    userId,
    entityId,
    entityType: 'STORY',
    interactionType: 'LIKE'
  }).exec()
}

exports.removeReport = async (entityId) => {
  return await Report.updateOne({ entityId }, { $set: { status: "RESOLVED" }}).exec()
}