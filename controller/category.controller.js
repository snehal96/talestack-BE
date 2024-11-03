const CategoryRepository = require("../repository/category.repository");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryRepository.getAllCategories();
    res.status(200).send({ success: true, error: false, data: categories });
    return;
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await CategoryRepository.getCategoryById(req.params.id);
    res.status(200).send({ success: true, error: false, data: category });
    return;
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err });
  }
};

exports.addCategory = async (req, res) => {
  try {
    await CategoryRepository.addCategory({
      userId: req.userId || 'SYSTEM',
      name: req.body.name,
      thumbnailUrl: req.fileUrl,
    });
    res.status(200).send({ success: true, error: false });
    return;
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const query = {};
    if (req.fileUrl) {
      query["thumbnailUrl"] = req.fileUrl;
    }
    if (req.body.name) {
      query["name"] = req.body.name;
    }
    if (req.body.delete) {
      query["isDeleted"] = true
    }
    await CategoryRepository.updateCategory(req.userId, req.body.id, query);
    res.status(200).send({ success: true, error: false });
    return;
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err });
  }
};
