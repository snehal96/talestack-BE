const controller = require("../controller/category.controller")
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
    "/api/v1/category",
    firebaseAuthMiddleware,
    controller.getAllCategories
  )
  app.get(
    "/api/v1/category/:id",
    firebaseAuthMiddleware,
    controller.getCategoryById
  )
  app.post(
    "/api/v1/category",
    [firebaseAuthMiddleware, multerMiddleware.single('thumbnail')],
    controller.addCategory
  )
  app.put(
    "/api/v1/category/:id",
    [firebaseAuthMiddleware, multerMiddleware.single('thumbnail')],
    controller.updateCategory
  )
}
