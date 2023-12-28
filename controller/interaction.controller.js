const InteractionRepository = require("../repository/interaction.repository");

const followUser = async (userId, entityId) => {
  return await InteractionRepository.addFollowerByUserId(userId, entityId);
};

const unfollowUser = async (userId, entityId) => {
  return await InteractionRepository.removeFollowerByUserId(userId, entityId);
};

const followCategory = async (userId, entityId) => {
  return await InteractionRepository.addFollowedCategoryByUserId(
    userId,
    entityId
  );
};

const unfollowCategory = async (userId, entityId) => {
  return await InteractionRepository.removeFollowedCategoryByUserId(
    userId,
    entityId
  );
};

const saveTale = async (userId, entityId) => {
  return await InteractionRepository.addSavedTaleByUserId(userId, entityId);
};

const unsaveTale = async (userId, entityId) => {
  return await InteractionRepository.removeSavedTaleByUserId(userId, entityId);
};

const likeStory = async (userId, entityId) => {
  return await InteractionRepository.addLikedStoryByUserId(userId, entityId);
};

const unlikeStory = async (userId, entityId) => {
  return await InteractionRepository.removeLikedStoryByUserId(userId, entityId);
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
