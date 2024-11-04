const HomeRepository = require("../repository/home.repository")

exports.getHomeData = (req, res) => {}

exports.getUserFollowedTales = async (req, res) => {
  try {
    const data = await HomeRepository.getUserFollowedTales(
      req.userId,
      req.query.page
    )
    res.status(200).send({ success: true, error: false, data: data })
    return
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err })
  }
}

exports.getTrendingUser = async (req, res) => {
  try {
    const data = await HomeRepository.getTrendingUser(req.query.page, 5)
    res.status(200).send({ success: true, error: false, data: data })
    return
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err })
  }
}

exports.getTrendingTales = async (req, res) => {
  try {
    const data = await HomeRepository.getTrendingTales(req.query.page)
    res.status(200).send({ success: true, error: false, data: data })
    return
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err })
  }
}

exports.getUserCurrentRead = async (req, res) => {
  try {
    const data = await HomeRepository.getUserCurrentRead(req.userId)
    res.status(200).send({ success: true, error: false, data: data })
    return
  } catch (err) {
    res.status(400).send({ success: false, error: true, message: err })
  }
}
