const StoryRepository = require("../repository/story.repository")
const TaleRepository = require("../repository/tale.repository")
const InteractionRepository = require("../repository/interaction.repository")

async function getFollowStatus (userId, requestorId) {
  return await InteractionRepository.getFollowStatus(userId, requestorId)
}

exports.getStoriesByTaleId = async (req, res) => {
  try {
    const data = await StoryRepository.getStoryByTaleId(req.params.taleId, req.userId)
    const isFollowing = data.createdBy === req.userId || getFollowStatus(data.createdBy, req.userId)
    if (isFollowing) {
      res.status(200).send({ success: true, error: false, data: data })
    } else {
      res.status(403).send({ success: false, error: true, message: 'Unauthorized action' })
    }
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err })
  }
}

exports.getDraftStoriesByTaleId = async (req, res) => {
  try {
    const data = await StoryRepository.getDraftStoryByTaleId(
      req.params.taleId,
      req.userId
    )
    res.status(200).send({ success: true, error: false, data: data })
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err })
  }
}

exports.getDraftStoriesByUserId = async (req, res) => {
  try {
    const data = await StoryRepository.getDraftStoryByUserId(req.userId)
    res.status(200).send({ success: true, error: false, data: data })
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err })
  }
}

exports.getStoryById = async (req, res) => {
  try {
    const data = await StoryRepository.getStoryById(req.params.id)
    const isFollowing = data.createdBy === req.userId || getFollowStatus(data.createdBy, req.userId)
    if (isFollowing) {
      res.status(200).send({ success: true, error: false, data: data })
    } else {
      res.status(403).send({ success: false, error: true, message: 'Unauthorized action' })
    }
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err })
  }
}

exports.getDraftStoryByStoryId = async (req, res) => {
  try {
    const data = await StoryRepository.getDraftStoryByStoryId(req.params.id, req.userId)
    res.status(200).send({ success: true, error: false, data: data })
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err })
  }
}

exports.getDraftStoryById = async (req, res) => {
  try {
    const data = await StoryRepository.getDraftStoryById(req.params.id, req.userId)
    res.status(200).send({ success: true, error: false, data: data })
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err })
  }
}

exports.addStory = async (req, res) => {
  const story = {
    userId: req.userId,
    taleId: req.body.taleId,
    type: req.body,type,
    title: req.body.title,
    content: req.body.content,
    storyOrder: req.body.storyOrder,
    status: req.body.status,
  }
  try {
    await StoryRepository.addStory(story)
    TaleRepository.updateStoryCount(req.body.taleId)
    res
      .status(200)
      .send({ success: true, error: false, message: "operation successful" })
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err })
  }
}

exports.addDraftStory = async (req, res) => {
  const story = {
    userId: req.userId,
    taleId: req.body.taleId,
    type: req.body.type,
    title: req.body.title,
    content: req.body.content,
    status: "DRAFT",
  }
  try {
    const storyId = req.body.storyId
    if (!storyId) {
      const { id } = await StoryRepository.addStory(story)
      storyId = id
    }

    const draftStory = {
      storyId: story,
      ...story,
    }

    await StoryRepository.addDraftStory(draftStory)
    res
      .status(200)
      .send({ success: true, error: false, message: "operation successful" })
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err })
  }
}

exports.updateStory = async (req, res) => {
  try {
    const query = {}
    if (req.body.type) {
      query["type"] = req.body.type
    }
    if (req.body.title) {
      query["title"] = req.body.title
    }
    if (req.body.content) {
      query["content"] = req.body.content
    }
    if (req.body.action) {
      query["status"] = req.body.action
    }
    if (req.body.delete) {
      query["status"] = "DELETED"
    }

    await StoryRepository.updateStory(req.userId, req.body.storyId, query)
    res
      .status(200)
      .send({ success: true, error: false, message: "operation successful" })
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err })
  }
}

exports.updateDraftStory = async (req, res) => {
  try {
    if (req.body.userId !== req.userId) {
      res.status(403).send({ success: false, error: true, message: 'Unauthorized action' })
      return
    }
    const query = {}
    if (req.body.type) {
      query["type"] = req.body.type
    }
    if (req.body.title) {
      query["title"] = req.body.title
    }
    if (req.body.content) {
      query["content"] = req.body.content
    }
    if (req.body.action) {
      query["status"] = req.body.action
    }
    if (req.body.delete) {
      query["status"] = "DELETED"
    }

    await StoryRepository.updateDraftStory(req.userId, req.body.storyId, query)
    res
      .status(200)
      .send({ success: true, error: false, message: "operation successful" })
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err })
  }
}

exports.uploadImage = (req, res) => {
  res
    .status(201)
    .send({ success: true, error: false, data: { url: req.fileUrl } })
}
