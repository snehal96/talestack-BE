const Category = require("../models").category;
const { nanoid } = require("nanoid");

exports.getAllCategories = async () => {
  return await Category.find({ isDeleted: false }, { _id: 0 }).exec();
};

exports.getCategoryById = async (id) => {
  return await Category.findOne({ entityId: id, isDeleted: false }, { _id: 0 }).exec();
};

exports.addCategory = async ({ userId, name, thumbnailUrl }) => {
  const creationDate = new Date();
  const categoryObj = new Category({
    entityId: nanoid(6),
    createdBy: userId,
    createdDate: creationDate,
    updatedBy: userId,
    updatedDate: creationDate,
    status: "ACTIVE",
    name: name,
    thumbnailUrl: thumbnailUrl
  });
  return await categoryObj.save();
};

exports.updateCategory = async (userId, categoryId, query) => {
  const updateQuery = {
    updatedBy: userId,
    updatedDate: new Date(),
    ...query,
  };
  return await Category.updateOne(
    { entityId: categoryId, createdBy: userId },
    { $set: updateQuery }
  ).exec();
};
