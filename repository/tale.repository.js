const Tale = require("../models").tale;
const TrendingTale = require("../models").trendingtale;
const { nanoid } = require("nanoid");

exports.getAllTales = async (page = 0, limit = 20) => {
  return await Tale.aggregate([
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
};

exports.getTaleByUserId = async (userId, page = 0, limit = 20) => {
  return await Tale.aggregate([
    {
      $match: { createdBy: userId }, // Filter tales by userid
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
};

exports.getTaleByCategoryId = async (categoryId, page = 0, limit = 20) => {
  return await Tale.find({ categoryId: categoryId }, { _id: 0 })
    .skip(page * limit)
    .limit(limit)
    .exec();
};

exports.getTaleById = async (id) => {
  return await Tale.findOne({ entityId: id }, { _id: 0 }).exec();
};

exports.addTale = async ({
  title,
  thumbnailUrl,
  description,
  categoryId,
  userId,
  tags,
  expectedStoryCount,
  status = "ACTIVE",
}) => {
  const creationDate = new Date();
  const taleId = nanoid(6);
  const taleObj = new Tale({
    entityId: taleId,
    createdBy: userId,
    createdDate: creationDate,
    updatedBy: "",
    updatedDate: creationDate,
    status: status,
    title,
    thumbnailUrl,
    description,
    categoryId,
    tags,
    expectedStoryCount,
  });
  await taleObj.save();
  return taleId;
};

exports.updateTale = async (userId, taleId, query) => {
  const updateQuery = {
    updatedDate: new Date(),
    updatedBy: userId,
    ...query,
  };

  return await Tale.updateOne(
    { entityId: taleId },
    { $set: updateQuery }
  ).exec();
};

exports.updateStoryCount = async (taleId) => {
  return await Tale.updateOne(
    { entityId: taleId },
    { $inc: { currentStoryCount: 1 } }
  ).exec();
};

exports.createTrendingTale = async (taleId) => {
  const creationDate = new Date();
  const trendingTaleObj = new TrendingTale({
    entityId: nanoid(6),
    createdBy: "SYSTEM",
    createdDate: creationDate,
    updatedBy: "",
    updatedDate: creationDate,
    status: "ACTIVE",
    taleId,
  });

  return await trendingTaleObj.save();
};

exports.getTaleByQuery = async (query, page = 0) => {
  return await Tale.find({ title: { $regex: query, $options: "i" } })
    .skip(page * 10)
    .limit(10);
};
