const db = require("../models")
const Tale = db.tale
const TrendingTale = db.trendingtale
const InteractionRepository = require("../repository/interaction.repository")
const { nanoid } = require("nanoid")

async function getFollowStatus (query, userId, requestorId) {
  const isFollowing = await InteractionRepository.getFollowStatus(userId, requestorId)
  if (userId !== requestorId && !isFollowing) {
    query[private] = false
  }
}

exports.getAllPublicTales = async (page = 0, limit = 20) => {
  return await Tale.aggregate([
    {
      $match: { private: false, premium: false, isDeleted: false }
    },
    {
      $lookup: {
        from: 'userinfos', // The name of the user collection
        localField: 'createdBy', // Field from the post collection
        foreignField: 'entityId', // Field from the user collection
        as: 'userInfo', // Output array field
      },
    },
    {
      $unwind: {
        path: '$userInfo',
        preserveNullAndEmptyArrays: true, // Keeps posts without user info
      },
    },
    {
      $project: {
        _id: 0, // Exclude the _id field from the output
        'userInfo._id': 0, // Exclude _id from the embedded userInfo object
      },
    },
    { $skip: page * limit },
    { $limit: limit }
  ])
}

exports.getTaleByUserId = async (userId, requestorId, page = 0, limit = 20) => {
  const query = { createdBy: userId, isDeleted: false }
  await getFollowStatus(query, userId, requestorId)
  return await Tale.aggregate([
    {
      $match: query, // Filter tales by userid
    },
    {
      $lookup: {
        from: 'userinfos', // The name of the user collection
        localField: 'createdBy', // Field from the tale collection
        foreignField: 'entityId', // Field from the user collection
        as: 'userInfo', // Output array field
      },
    },
    {
      $unwind: {
        path: '$userInfo',
        preserveNullAndEmptyArrays: true, // Keeps tales without user info
      },
    },
    {
      $project: {
        _id: 0, // Exclude the _id field from the output
        'userInfo._id': 0, // Exclude _id from the embedded userInfo object
      },
    },
    { $skip: page * limit },
    { $limit: limit }
  ])
}

exports.getTaleByCategoryId = async (categoryId, page = 0, limit = 20) => {
  const query = { categoryId: categoryId, private: false, isDeleted: false }
  return await Tale.find(query, { _id: 0 })
    .skip(page * limit)
    .limit(limit)
    .exec()
}

exports.getTaleById = async (id, userId, requestorId) => {
  const query = { entityId: id, isDeleted: false }
  await getFollowStatus(query, userId, requestorId)
  return await Tale.findOne(query, { _id: 0 }).exec()
}

exports.addTale = async ({
  type,
  title,
  thumbnailUrl,
  description,
  categoryId,
  userId,
  tags,
  expectedStoryCount,
  status = "ACTIVE",
}) => {
  const creationDate = new Date()
  const taleId = nanoid(6)
  const taleObj = new Tale({
    entityId: taleId,
    createdBy: userId,
    createdDate: creationDate,
    updatedBy: "",
    updatedDate: creationDate,
    status: status,
    type,
    title,
    thumbnailUrl,
    description,
    categoryId,
    tags,
    expectedStoryCount,
  })
  await taleObj.save()
  return taleId
}

exports.updateTale = async (userId, taleId, query) => {
  const updateQuery = {
    updatedDate: new Date(),
    updatedBy: userId,
    ...query,
  }

  return await Tale.updateOne(
    { entityId: taleId, createdBy: userId },
    { $set: updateQuery }
  ).exec()
}

exports.updateStoryOrInteractionCount = async (taleId, field = 'currentStoryCount', count = 1) => {
  return await Tale.updateOne(
    { entityId: taleId, createdBy: userId },
    { $inc: { [field]: count } }
  ).exec()
}

exports.createTrendingTale = async (taleId) => {
  const creationDate = new Date()
  const trendingTaleObj = new TrendingTale({
    entityId: nanoid(6),
    createdBy: "SYSTEM",
    createdDate: creationDate,
    updatedBy: "",
    updatedDate: creationDate,
    status: "ACTIVE",
    taleId,
  })

  return await trendingTaleObj.save()
}

exports.getTaleByQuery = async (term, page = 0) => {
  const query = { title: { $regex: term, $options: "i" }, private: false, isDeleted: false }
  return await Tale.find(query)
    .skip(page * 10)
    .limit(10)
}
