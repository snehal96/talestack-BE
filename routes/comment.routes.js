const controller = require("../controller/comment.controller")
const {
  firebaseAuthMiddleware,
} = require("../middleware/firebaseauth.middleware")

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
    '/api/v1/comment/content',
    firebaseAuthMiddleware,
    controller.getCommentByContentId
  )

  app.get(
    '/api/v1/comment/:commentId',
    firebaseAuthMiddleware,
    controller.getCommentById
  )

  app.post(
    '/api/v1/comment',
    firebaseAuthMiddleware,
    controller.addComment
  )

  app.put(
    '/api/v1/comment/content',
    firebaseAuthMiddleware,
    controller.removeCommentByContentId
  )

  app.put(
    '/api/v1/comment/:commentId',
    firebaseAuthMiddleware,
    controller.removeCommentById
  )

  app.put(
    '/api/v1/comment/interaction',
    firebaseAuthMiddleware,
    controller.updateInteraction
  )
}