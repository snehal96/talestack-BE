const db = require("../models");
const Story = db.story;
const DraftStory = db.draftstory;
const { nanoid } = require("nanoid");

exports.getStoryByTaleId = async (taleId) => {
  return await Story.find({ taleId: taleId, isDeleted: false }, { _id: 0 }).exec();
};

exports.getDraftStoryByTaleId = async (taleId, userId) => {
  return await DraftStory.find({ taleId: taleId, createdBy: userId, isDeleted: false }, { _id: 0 }).exec();
};

exports.getDraftStoryByUserId = async (userId) => {
  return await DraftStory.find({ createdBy: userId, isDeleted: false }, { _id: 0 }).exec();
};

exports.getStoryById = async (id) => {
  return await Story.findOne({ entityId: id, isDeleted: false }, { _id: 0 }).exec();
};

exports.getDraftStoryByStoryId = async (id, userId) => {
  return await DraftStory.findOne({ storyId: id, createdBy: userId, isDeleted: false  }, { _id: 0 }).exec();
};

exports.getDraftStoryById = async (id, userId) => {
  return await DraftStory.findOne({ entityId: id, createdBy: userId, isDeleted: false }, { _id: 0 }).exec();
};

exports.addStory = async ({
  userId,
  taleId,
  title,
  content,
  storyOrder,
  status = "ACTIVE",
}) => {
  const creationDate = new Date();
  const storyId = nanoid(6);
  const storyObj = new Story({
    entityId: storyId,
    createdBy: userId,
    createdDate: creationDate,
    updatedBy: "",
    updatedDate: creationDate,
    status: status,
    taleId: taleId,
    title: title,
    content: content,
    storyOrder: storyOrder,
  });

  await storyObj.save();
  return await { id: storyId };
};

exports.updateStory = async (userId, storyId, query) => {
  const updateQuery = {
    updatedDate: new Date(),
    updatedBy: userId,
    ...query,
  };

  return await Story.updateOne(
    { entityId: storyId, createdBy: userId },
    { $set: updateQuery }
  ).exec();
};

exports.addDraftStory = async ({
  userId,
  taleId,
  storyId,
  title,
  content,
  status = "DRAFT",
}) => {
  const creationDate = new Date();
  const storyObj = new DraftStory({
    entityId: nanoid(6),
    createdBy: userId,
    createdDate: creationDate,
    updatedBy: "",
    updatedDate: creationDate,
    status: status,
    taleId: taleId,
    storyId: storyId,
    title: title,
    content: content,
  });

  return await storyObj.save();
};

exports.updateDraftStory = async (userId, storyId, query) => {
  const updateQuery = {
    updatedDate: new Date(),
    updatedBy: userId,
    ...query,
  };

  return await DraftStory.updateOne(
    { storyId: storyId, createdBy: userId },
    { $set: updateQuery }
  ).exec();
};

exports.updateInteractionCount = async (storyId, field, count = 1) => {
  return await Story.updateOne(
    { entityId: storyId },
    { $inc: { [field]: count } }
  ).exec();
};