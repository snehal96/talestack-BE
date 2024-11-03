const InteractionRepository = require("../repository/interaction.repository");
const UserRepository = require("../repository/user.repository")

const followUser = async (requestorId, entityId) => {
  const isPrivate = await UserRepository.getUserVisibilityStatus(entityId)
  if (isPrivate) {
    return await InteractionRepository.addFollowRequestByUserId(requestorId, userId)
  }
  return await InteractionRepository.addFollowerByUserId(requestorId, entityId);
};

const acceptFollowUser = async (userId, requestorId) => {
  await InteractionRepository.addFollowerByUserId(requestorId, entityId);
  return await InteractionRepository.removeFollowRequestByUserId(requestorId, userId)
}

const unfollowUser = async (requestorId, entityId) => {
  return await InteractionRepository.removeFollowerByUserId(requestorId, entityId);
};

const followCategory = async (requestorId, entityId) => {
  return await InteractionRepository.addFollowedCategoryByUserId(
    requestorId,
    entityId
  );
};

const unfollowCategory = async (requestorId, entityId) => {
  return await InteractionRepository.removeFollowedCategoryByUserId(
    requestorId,
    entityId
  );
};

const saveTale = async (requestorId, entityId) => {
  return await InteractionRepository.addSavedTaleByUserId(requestorId, entityId);
};

const unsaveTale = async (requestorId, entityId) => {
  return await InteractionRepository.removeSavedTaleByUserId(requestorId, entityId);
};

const likeStory = async (requestorId, entityId) => {
  return await InteractionRepository.addLikedStoryByUserId(requestorId, entityId);
};

const unlikeStory = async (requestorId, entityId) => {
  return await InteractionRepository.removeLikedStoryByUserId(requestorId, entityId);
};

exports.interactionHandler = async (req, res) => {
  const type = req.body.type;
  const entity = req.body.entity;

  try {
    if (entity === "user") {
      if (type === "follow") {
        await followUser(req.userId, req.body.id);
      } else if (type === "unfollow") {
        await unfollowUser(req.userId, req.body.id);
      } else if (type === 'accept') {
        await acceptFollowUser(req.userId, req.body.id)
      }
    } else if (entity === "category") {
      if (type === "follow") {
        await followCategory(req.userId, req.body.id);
      } else if (type === "unfollow") {
        await unfollowCategory(req.userId, req.body.id);
      }
    } else if (entity === "tale") {
      if (type === "save") {
        await saveTale(req.userId, req.body.id);
      } else if (type === "unsave") {
        await unsaveTale(req.userId, req.body.id);
      }
    } else if (entity === "story") {
      if (type === "like") {
        await likeStory(req.userId, req.body.id);
      } else if (type === "unlike") {
        await unlikeStory(req.userId, req.body.id);
      }
    } else {
      res.status(404).send({
        error: true,
        message: "The path that you are trying to reach does not exist.",
      });
    }

    res
      .status(200)
      .send({ success: true, error: false, message: "operation successful." });
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err });
  }
};

exports.getUserSavedTales = async (req, res) => {
  try {
    const data = await InteractionRepository.getSavedTaleByUserId(req.userId);
    res.status(200).send({ success: true, error: false, data: data });
  } catch (e) {
    res.status(400).send({
      error: true,
      message: e,
    });
  }
};
