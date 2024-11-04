const db = require("../models")
const UserInfo = db.userinfo
const UserFollower = db.userfollower
const Tale = db.tale
const TrendingUser = db.trendinguser
const TrendingTale = db.trendingtale
const UserCurrentRead = db.usercurrentread

exports.getUserFollowedTales = async (userId, page = 0) => {
  const data = await UserFollower.find({ userId: userId }).exec()
  return await Tale.find({ userId: { $in: data } }, { _id: 0 })
    .skip(page * 20)
    .limit(20)
    .exec()
}

exports.getTrendingUser = async (page = 0, limit = 20) => {
  const trendingUser = await TrendingUser.find({}, "userId")
    .sort({ score: -1 })
    .skip(page * limit)
    .limit(limit)
    .exec()

  return await UserInfo.find({ entityId: { $in: trendingUser } }).exec()
}

exports.getTrendingTales = async (page = 0, limit = 20) => {
  const trendingTale = await TrendingTale.find({}, "taleId")
    .sort({ score: -1 })
    .skip(page * limit)
    .limit(limit)
    .exec()

  return await Tale.find({ entityId: { $in: trendingTale } }).exec()
}

exports.getUserCurrentRead = async (userId) => {
  return await UserCurrentRead.findOne(
    { userId: userId },
    { sort: { createdDate: -1 }, _id: 0 }
  ).exec()
}
