const UserRepository = require("../repository/user.repository")

exports.getAllUsers = async (req, res) => {
  try {
    const data = await UserRepository.getAllUsers(req.query.page)
    res.status(200).send({ success: true, error: false, data: data })
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err })
  }
}

exports.getUserById = async (req, res) => {
  try {
    const data = await UserRepository.getUserByUserId(req.userId)
    res.status(200).send({ success: true, error: false, data: data})
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err })
  }
}

exports.getUserAllCurrentRead = async (req, res) => {
  try {
    const data = await UserRepository.getUserAllCurrentRead(req.userId)
    res.status(200).send({ success: true, error: false, data: data })
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err })
  }
}

exports.addUser = async (req, res) => {
  const user = {
    userId: req.userId,
    email: req.body.email,
    mobile: req.body.mobile,
    username: req.body.username,
    name: req.body.name,
    tagline: req.body.tagline,
    bio: req.body.bio,
    profileImageUrl: req.fileUrl,
  }

  try {
    await UserRepository.addUser(user)
    await UserRepository.createTrendingUser(req.userId)
    res
      .status(200)
      .send({ success: true, error: false, message: "operation successful" })
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err })
  }
}

exports.updateUser = async (req, res) => {
  const query = {}
  if (req.body.status) {
    query["status"] = req.body.status
  }
  if (req.body.email) {
    query["email"] = req.body.email
  }
  if (req.body.mobile) {
    query["mobile"] = req.body.mobile
  }
  if (req.body.username) {
    query["email"] = req.body.username
  }
  if (req.body.profileImageUrl) {
    query["profileImageUrl"] = req.fileUrl
  }
  if (req.body.name) {
    query["name"] = req.body.name
  }
  if (req.body.tagline) {
    query["tagline"] = req.body.tagline
  }
  if (req.body.bio) {
    query["bio"] = req.body.bio
  }
  if (req.body.delete) {
    query["isDeleted"] = true
  }

  try {
    await UserRepository.updateUser(req.userId, query)
    res
      .status(200)
      .send({ success: true, error: false, message: "operation successful" })
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err })
  }
}

exports.updateTrendingTale = async (req, res) => {
  try {
    const trendingTale = await UserRepository.getTrendingTaleByTaleId(
      req.body.taleId
    )
    const query = {}
    if (type === "save") {
      query["savedCount"] = ++trendingTale.savedCount
    } else if (type === "click") {
      query["clickCount"] = ++trendingTale.clickCount
    } else if (type === "like") {
      query["likedCount"] = ++trendingTale.likedCount
    }

    query["score"] =
      trendingTale.savedCount * 0.6 +
      trendingTale.clickCount * 0.1 +
      trendingTale.likedCount * 0.3

    await UserRepository.updateTrendingTale(req.body.taleId, query)
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err })
  }
}

exports.updateTrendingUser = async (req, res) => {
  try {
    const trendingUser = await UserRepository.getTrendingUserByUserId(
      req.body.userId
    )
    const query = {}
    if (type === "tale") {
      query["taleCount"] = ++trendingUser.taleCount
    } else if (type === "save") {
      query["savedCount"] = ++trendingUser.savedCount
    } else if (type === "follow") {
      query["followerCount"] = ++trendingUser.followerCount
    }

    query["score"] =
      trendingUser.savedCount * 0.6 +
      trendingUser.clickCount * 0.1 +
      trendingUser.likedCount * 0.3

    await UserRepository.updateTrendingUser(req.body.userId, query)
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err })
  }
}

exports.addUserCurrentRead = async (req, res) => {
  try {
    await UserRepository.addUserCurrentRead(
      req.userId,
      req.body.taleId,
      req.body.storyId
    )
    res
      .status(200)
      .send({ success: true, error: false, message: "operation successful" })
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err })
  }
}

exports.removeUserCurrentRead = async (req, res) => {
  try {
    await UserRepository.removeUserCurrentRead(
      req.userId,
      req.body.taleId,
      req.body.storyId
    )
    res
      .status(200)
      .send({ success: true, error: false, message: "operation successful" })
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err })
  }
}

exports.getTrendingUser = async (req, res) => {
  try {
    const data = await UserRepository.getTrendingUser(req.query.page, 50)
    res.status(200).send({ success: true, error: false, data: data })
    return
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err })
  }
}
