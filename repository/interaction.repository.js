const db = require("../models");
const Category = db.category;
const UserFollower = db.userfollower;
const UserFollowingCategory = db.userfollowingcategory;
const UserLikedStory = db.userlikedstory;
const UserSavedTale = db.usersavedtale;
const UserInfo = db.userinfo;
const Tale = db.tale;
const Story = db.story;

exports.getFollowerByUserId = async (userId, limit = 20, page = 0) => {
  const data = await UserFollower.find({ userId: userId }, "followerId").exec();
  return await UserInfo.find({ entityId: { $in: data } }, { _id: 0 }).exec();
};

exports.getFollowingByUserId = async (userId) => {
  const data = await UserFollower.find({ followerId: userId }, "userId").exec();
  return await UserInfo.find({ entityId: { $in: data } }, { _id: 0 }).exec();
};

exports.getFollowedCategoryByUserId = async (userId) => {
  const data = await UserFollowingCategory.find(
    { userId: userId },
    "categoryId"
  ).exec();
  return await Category.find({ entityId: { $in: data } }, { _id: 0 }).exec();
};

exports.getSavedTaleByUserId = async (userId) => {
  const data = await UserSavedTale.find({ userId: userId }, "taleId").exec();
  return await Tale.find({ entityId: { $in: data } }, { _id: 0 }).exec();
};

exports.getLikedStoryByUserId = async (userId) => {
  const data = await UserLikedStory.find({ userId: userId }, "storyId").exec();
  return await Story.find({ entityId: { $in: data } }, { _id: 0 }).exec();
};

exports.addFollowerByUserId = async (userId, followerId) => {
  const follower = new UserFollower({
    createdDate: new Date(),
    userId: userId,
    followerId: followerId,
  });

  return await follower.save();
};

exports.addFollowedCategoryByUserId = async (userId, categoryId) => {
  const followedCategory = new UserFollowingCategory({
    createdDate: new Date(),
    userId,
    categoryId,
  });

  return await followedCategory.save();
};

exports.addSavedTaleByUserId = async (userId, taleId) => {
  const userSavedTale = new UserSavedTale({
    createdDate: new Date(),
    userId,
    taleId,
  });

  return await userSavedTale.save();
};

exports.addLikedStoryByUserId = async (userId, storyId) => {
  const userLikedStory = new UserLikedStory({
    createdDate: new Date(),
    userId,
    storyId,
  });

  return await userLikedStory.save();
};

exports.removeFollowerByUserId = async (userId, followerId) => {
  return await UserFollower.deleteOne({
    userId,
    followerId,
  }).exec();
};

exports.removeFollowedCategoryByUserId = async (userId, categoryId) => {
  return await UserFollowingCategory.deleteOne({
    userId,
    categoryId,
  }).exec();
};

exports.removeSavedTaleByUserId = async (userId, taleId) => {
  return await UserSavedTale.deleteOne({
    userId,
    taleId,
  }).exec();
};

exports.removeLikedStoryByUserId = async (userId, storyId) => {
  return await UserLikedStory.deleteOne({
    userId,
    storyId,
  }).exec();
};
