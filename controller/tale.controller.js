const TaleRepository = require("../repository/tale.repository");

exports.getAllTales = async (req, res) => {
  try {
    const data = await TaleRepository.getAllTales(req.query.page);
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
    const data = await TaleRepository.getTaleById(req.params.id);
    res.status(200).send({ success: true, error: false, data: data });
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err });
  }
};

exports.addTale = async (req, res) => {
  const tale = {
    userId: req.userId,
    title: req.body.title,
    description: req.body.description,
    thumbnailUrl: req.fileUrl && req.fileUrl[0],
    categoryId: req.body.categoryId,
    tags: req.body.tags,
    expectedStoryCount: req.body.expectedStoryCount,
  };
  try {
    const taleId = await TaleRepository.addTale(tale);
    await TaleRepository.createTrendingTale(taleId);
    res
      .status(200)
      .send({ success: true, error: false, message: "operation successful" });
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err });
  }
};

exports.updateTale = async (req, res) => {
  const query = {};
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
