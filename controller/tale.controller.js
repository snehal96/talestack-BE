const TaleRepository = require("../repository/tale.repository");
const UserRepository = require("../repository/user.repository")

exports.getAllPublicTales = async (req, res) => {
  try {
    const data = await TaleRepository.getAllPublicTales(req.query.page);
    res.status(200).send({ success: true, error: false, data: data });
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err });
  }
};

exports.getTaleByQuery = async (req, res) => {
  try {
    const data = await TaleRepository.getTaleByQuery(
      req.query.term,
      req.query.page
    );
    res.status(200).send({ success: true, error: false, data: data });
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err });
  }
};

exports.getTaleByUserId = async (req, res) => {
  try {
    const data = await TaleRepository.getTaleByUserId(
      req.params.userId,
      req.userId,
      req.query.page
    );
    res.status(200).send({ success: true, error: false, data: data });
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err });
  }
};

exports.getTaleByCategoryId = async (req, res) => {
  try {
    const data = await TaleRepository.getTaleByCategoryId(
      req.params.categoryId,
      req.query.page
    );
    res.status(200).send({ success: true, error: false, data: data });
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err });
  }
};

exports.getTaleById = async (req, res) => {
  try {
    const data = await TaleRepository.getTaleById(req.params.id, req.query.userId, req.userId);
    res.status(200).send({ success: true, error: false, data: data });
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err });
  }
};

exports.addTale = async (req, res) => {
  const tale = {
    userId: req.userId,
    type: req.body.tale,
    title: req.body.title,
    description: req.body.description,
    thumbnailUrl: req.fileUrl,
    categoryId: req.body.categoryId,
    tags: JSON.parse(req.body.tags),
    expectedStoryCount: req.body.expectedStoryCount,
  };
  try {
    const taleId = await TaleRepository.addTale(tale);
    await TaleRepository.createTrendingTale(taleId);
    await UserRepository.updateFollowerCount(userId, 'taleCount')
    res
      .status(200)
      .send({ success: true, error: false, message: "operation successful" });
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err });
  }
};

exports.updateTale = async (req, res) => {
  if (req.body.userId !== req.userId) {
    res.status(403).send({ success: false, error: true, message: 'Unauthorized action' });
    return
  }
  const query = {};
  if (req.body.type) {
    query["type"] = req.body.type;
  }
  if (req.body.status) {
    query["status"] = req.body.status;
  }
  if (req.body.title) {
    query["title"] = req.body.title;
  }
  if (req.body.thumbnailUrl) {
    query["thumbnailUrl"] = req.fileUrl;
  }
  if (req.body.categoryId) {
    query["categoryId"] = req.body.categoryId;
  }
  if (req.body.tags) {
    query["tags"] = req.body.tags;
  }
  if (req.body.expectedStoryCount) {
    query["expectedStoryCount"] = req.body.expectedStoryCount;
  }

  try {
    await TaleRepository.updateTale(req.userId, req.body.taleId, query);
    res
      .status(200)
      .send({ success: true, error: false, message: "operation successful" });
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err });
  }
};
