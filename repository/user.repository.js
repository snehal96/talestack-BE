const db = require("../models");
const UserInfo = db.userinfo;
const TrendingUser = db.trendinguser;
const TrendingTale = db.trendingtale;
const UserCurrentRead = db.usercurrentread;
const { nanoid } = require("nanoid");

exports.getAllUsers = async (page = 0, limit = 20) => {
  return await UserInfo.find({}, { _id: 0 })
    .skip(page * limit)
    .limit(limit)
    .exec();
};

exports.getUserByUserId = async (userId) => {
  return await UserInfo.findOne({ entityId: userId, isDeleted: false }, { _id: 0 }).exec();
};

exports.addUser = async ({
  userId,
  email,
  mobile,
  username,
  name,
  tagline,
  bio,
  profileImageUrl,
  status = "ACTIVE",
}) => {
  const creationDate = new Date();
  const userObj = new UserInfo({
    entityId: userId,
    createdBy: userId,
    createdDate: creationDate,
    updatedBy: "",
    updatedDate: creationDate,
    status: status,
    email,
    mobile,
    username,
    name,
    tagline,
    bio,
    profileImageUrl,
    isOnboarded: true
  });

  return await userObj.save();
};

exports.updateUser = async (userId, query) => {
  const updateQuery = {
    updatedBy: userId,
    updatedDate: new Date(),
    ...query,
  };

  return await UserInfo.updateOne(
    { entityId: userId, createdBy: userId },
    { $set: updateQuery }
  ).exec();
};

exports.createTrendingUser = async (userId) => {
  const creationDate = new Date();
  const trendingUserObj = new TrendingUser({
    entityId: nanoid(6),
    createdBy: "SYSTEM",
    createdDate: creationDate,
    updatedBy: "",
    updatedDate: creationDate,
    status: "ACTIVE",
    userId: userId,
  });

  return await trendingUserObj.save();
};

exports.getTrendingTaleByTaleId = async (taleId) => {
  return await TrendingTale.findOne({ taleId: taleId, isDeleted: false }, { _id: 0 }).exec();
};

exports.getTrendingUserByUserId = async (userId) => {
  return await TrendingUser.findOne({ userId: userId, isDeleted: false }, { _id: 0 }).exec();
};

exports.updateTrendingTale = async (taleId, query) => {
  const updateQuery = {
    updatedBy: "SYSTEM",
    updatedDate: new Date(),
    ...query,
  };

  return await TrendingTale.updateOne(
    { taleId: taleId },
    { $set: updateQuery }
  ).exec();
};

exports.updateTrendingUser = async (userId, query) => {
  const updateQuery = {
    updatedBy: userId,
    updatedDate: new Date(),
    ...query,
  };

  return await TrendingUser.updateOne(
    { userId: userId },
    { $set: updateQuery }
  ).exec();
};

exports.getUserAllCurrentRead = async (userId) => {
  return await UserCurrentRead.find(
    { userId: userId },
    { sort: { createdDate: -1 }, _id: 0 }
  ).exec();
};

exports.addUserCurrentRead = async (userId, taleId, storyId) => {
  const creationDate = new Date();
  const obj = new UserCurrentRead({
    entityId: nanoid(6),
    createdBy: "SYSTEM",
    createdDate: creationDate,
    updatedBy: "",
    updatedDate: creationDate,
    status: "ACTIVE",
    userId,
    taleId,
    storyId,
  });

  return await obj.save();
};

exports.removeUserCurrentRead = async (userId, taleId, storyId) => {
  return await UserCurrentRead.deleteOne({
    userId: userId,
    taleId: taleId,
    storyId: storyId,
  }).exec();
};

exports.getTrendingUser = async (page = 0, limit = 20) => {
  const trendingUser = await TrendingUser.find({}, "userId")
    .sort({ score: -1 })
    .skip(page * limit)
    .limit(limit)
    .exec();

  return await UserInfo.find({ entityId: { $in: trendingUser } }).exec();
};

exports.getUserVisibilityStatus = async (userId) => {
  return await UserInfo.findOne({entityId: userId}, { private: 1 }).exec()
}

exports.updateFollowerCount = async (userId, field, count = 1) => {
  return await UserInfo.updateOne(
    { entityId: userId },
    { $inc: { [field]: count } }
  ).exec();
}