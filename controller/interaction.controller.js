const InteractionRepository = require("../repository/interaction.repository")
const UserRepository = require("../repository/user.repository")
const TaleRepository = require("../repository/tale.repository")
const StoryRepository = require("../repository/story.repository")

const followUser = async (requestorId, entityId) => {
  const isPrivate = await UserRepository.getUserVisibilityStatus(entityId)
  if (isPrivate) {
    return await InteractionRepository.addFollowRequestByUserId(requestorId, userId)
  } else {
    await InteractionRepository.addFollowerByUserId(requestorId, entityId)
    await UserRepository.updateFollowerCount(entityId, 'followerCount')
    await UserRepository.updateFollowerCount(requestorId, 'followingCount')
  }
}

const acceptFollowUser = async (userId, requestorId) => {
  await InteractionRepository.addFollowerByUserId(requestorId, entityId)
  await InteractionRepository.removeFollowRequestByUserId(requestorId, userId)
  await UserRepository.updateFollowerCount(entityId, 'followerCount')
  await UserRepository.updateFollowerCount(requestorId, 'followingCount')
}

const unfollowUser = async (requestorId, entityId) => {
  await InteractionRepository.removeFollowerByUserId(requestorId, entityId)
  await UserRepository.updateFollowerCount(entityId,'followerCount', -1)
  await UserRepository.updateFollowerCount(requestorId, 'followingCount', -1)
}

const followCategory = async (requestorId, entityId) => {
  return await InteractionRepository.addFollowedCategoryByUserId(
    requestorId,
    entityId
  )
}

const unfollowCategory = async (requestorId, entityId) => {
  return await InteractionRepository.removeFollowedCategoryByUserId(
    requestorId,
    entityId
  )
}

const likeTale = async (requestorId, entityId) => {
  await InteractionRepository.addLikedTaleByUserId(requestorId, entityId)
  await TaleRepository.updateStoryOrInteractionCount(entityId, 'likeCount')
}

const unlikeTale = async (requestorId, entityId) => {
  await InteractionRepository.removeLikedTaleByUserId(requestorId, entityId)
  await TaleRepository.updateStoryOrInteractionCount(entityId, 'likeCount', -1)
}

const saveTale = async (requestorId, entityId) => {
  await InteractionRepository.addSavedTaleByUserId(requestorId, entityId)
  await TaleRepository.updateStoryOrInteractionCount(entityId, 'saveCount')
}

const unsaveTale = async (requestorId, entityId) => {
  await InteractionRepository.removeSavedTaleByUserId(requestorId, entityId)
  await TaleRepository.updateStoryOrInteractionCount(entityId, 'saveCount')
}

const shareTale = async (entityId) => {
  await TaleRepository.updateStoryOrInteractionCount(entityId, 'shareCount')
}

const likeStory = async (requestorId, entityId) => {
  await InteractionRepository.addLikedStoryByUserId(requestorId, entityId)
  await StoryRepository.updateInteractionCount(entityId, 'likeCount')
}

const unlikeStory = async (requestorId, entityId) => {
  await InteractionRepository.removeLikedStoryByUserId(requestorId, entityId)
  await StoryRepository.updateInteractionCount(entityId, 'likeCount', -1)
}

const shareStory = async (entityId) => {
  await StoryRepository.updateInteractionCount(entityId, 'shareCount')
}

exports.interactionHandler = async (req, res) => {
  const type = req.body.type
  const entity = req.body.entity

  try {
    if (entity === "user") {
      if (type === "follow") {
        await followUser(req.userId, req.body.id)
      } else if (type === "unfollow") {
        await unfollowUser(req.userId, req.body.id)
      } else if (type === 'accept') {
        await acceptFollowUser(req.userId, req.body.id)
      }
    } else if (entity === "category") {
      if (type === "follow") {
        await followCategory(req.userId, req.body.id)
      } else if (type === "unfollow") {
        await unfollowCategory(req.userId, req.body.id)
      }
    } else if (entity === "tale") {
      if (type === "save") {
        await saveTale(req.userId, req.body.id)
      } else if (type === "unsave") {
        await unsaveTale(req.userId, req.body.id)
      } else if (type === "like") {
        await likeTale(req.userId, req.body.id)
      } else if (type === "unlike") {
        await unlikeTale(req.userId, req.body.id)
      } else if (type === "share") {
        await shareTale(req.body.id)
      }
    } else if (entity === "story") {
      if (type === "like") {
        await likeStory(req.userId, req.body.id)
      } else if (type === "unlike") {
        await unlikeStory(req.userId, req.body.id)
      } else if (type === "share") {
        await shareStory(req.body.id)
      }
    } else {
      res.status(404).send({
        error: true,
        message: "The path that you are trying to reach does not exist.",
      })
    }

    res
      .status(200)
      .send({ success: true, error: false, message: "operation successful." })
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err })
  }
}

exports.getUserSavedTales = async (req, res) => {
  try {
    const data = await InteractionRepository.getSavedTaleByUserId(req.userId)
    res.status(200).send({ success: true, error: false, data: data })
  } catch (e) {
    res.status(400).send({
      error: true,
      message: e,
    })
  }
}

exports.getReports = async (req, res) => {
  try {
    const data = await InteractionRepository.getReport(req.query.page)
    res.status(200).send({ success: true, error: false, data: data })
  } catch (e) {
    res.status(400).send({
      error: true,
      message: e,
    })
  }
}

exports.getReportByUserAndContent = async (req, res) => {
  try {
    const data = await InteractionRepository.getReportByUserAndContent(req.userId, req.params.contentId)
    res.status(200).send({ success: true, error: false, data: data })
  } catch (e) {
    res.status(400).send({
      error: true,
      message: e,
    })
  }
}

exports.addReport = async (req, res) => {
  try {
    const body = {
      userId: req.body.userId,
      contentId: req.body.contentId,
      contentType: req.body.contentType,
      reason: req.body.reason
    }
    const data = await InteractionRepository.addReport(body)
    res.status(201).send({ success: true, error: false, data: data })
  } catch (e) {
    res.status(400).send({
      error: true,
      message: e,
    })
  }
}

exports.resolveReport = async (req, res) => {
  try {
    if (!req.isAdmin) {
      res.status(403).send({
        error: true,
        message: 'Unauthorized action',
      })
    }
    await InteractionRepository.removeReport(req.body.entityId)
    res.status(200).send({ success: true, error: false, data: "Action Successful" })
  } catch (e) {
    res.status(400).send({
      error: true,
      message: e,
    })
  }
}