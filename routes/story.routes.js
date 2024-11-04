const controller = require("../controller/story.controller")
const { fileUploadMiddleware } = require("../middleware/fileupload.middleware")
const { firebaseAuthMiddleware } = require("../middleware/firebaseauth.middleware")
const multerMiddleware = require('../middleware/multer.middleware')

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    )
    res.header("Access-Control-Allow-Origin", "*")

    next()
  })

  app.get(
    "/api/v1/story/active/tale/:taleId",
    firebaseAuthMiddleware,
    controller.getStoriesByTaleId
  )
  app.get(
    "/api/v1/story/active/:id",
    firebaseAuthMiddleware,
    controller.getStoryById
  )
  app.post(
    "/api/v1/story/active",
    [firebaseAuthMiddleware, multerMiddleware.array('images')],
    controller.addStory
  )
  app.put(
    "/api/v1/story/active/:id",
    [firebaseAuthMiddleware, multerMiddleware.array('images')],
    controller.updateStory
  )

  app.get(
    "/api/v1/story/draft/tale/:taleId",
    firebaseAuthMiddleware,
    controller.getDraftStoriesByTaleId
  )
  app.get(
    "/api/v1/story/draft/user/:taleId",
    firebaseAuthMiddleware,
    controller.getDraftStoriesByUserId
  )
  app.get(
    "/api/v1/story/draft/:id",
    firebaseAuthMiddleware,
    controller.getDraftStoryById
  )
  app.post(
    "/api/v1/story/draft",
    [firebaseAuthMiddleware, multerMiddleware.array('images')],
    controller.addDraftStory
  )
  app.put(
    "/api/v1/story/draft/:id",
    [firebaseAuthMiddleware, multerMiddleware.array('images')],
    controller.updateDraftStory
  )

  app.post(
    "/api/v1/story/upload/image",
    [firebaseAuthMiddleware, multerMiddleware.array('images')],
    controller.uploadImage
  )
}
