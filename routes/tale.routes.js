const controller = require("../controller/tale.controller");
const { fileUploadMiddleware } = require("../middleware/fileupload.middleware");
const {
  firebaseAuthMiddleware,
} = require("../middleware/firebaseauth.middleware");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Origin", "*");

    next();
  });

  app.get("/api/v1/tale", firebaseAuthMiddleware, controller.getAllTales);
  app.get(
    "/api/v1/tale/user/:userId",
    firebaseAuthMiddleware,
    controller.getTaleByUserId
  );
  app.get(
    "/api/v1/tale/category/:categoryId",
    firebaseAuthMiddleware,
    controller.getTaleByCategoryId
  );
  app.get("/api/v1/tale/:id", firebaseAuthMiddleware, controller.getTaleById);
  app.post(
    "/api/v1/tale",
    [firebaseAuthMiddleware, fileUploadMiddleware],
    controller.addTale
  );
  app.put(
    "/api/v1/tale/:id",
    [firebaseAuthMiddleware, fileUploadMiddleware],
    controller.updateTale
  );

  app.get("/api/v1/search", firebaseAuthMiddleware, controller.getTaleByQuery);
};
