const controller = require("../controller/interaction.controller")
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
    "/api/v1/interaction/tale/saved",
    firebaseAuthMiddleware,
    controller.getUserSavedTales
  )

  app.get(
    "/api/v1/interaction/report",
    firebaseAuthMiddleware,
    controller.getReports
  )

  app.get(
    "/api/v1/interaction/report/:contentId",
    firebaseAuthMiddleware,
    controller.getReportByUserAndContent
  )

  app.post(
    "/api/v1/interaction",
    firebaseAuthMiddleware,
    controller.interactionHandler
  )

  app.post(
    "/api/v1/interaction/report",
    firebaseAuthMiddleware,
    controller.addReport
  )

  app.put(
    "/api/v1/interaction/report",
    firebaseAuthMiddleware,
    controller.resolveReport
  )
}
