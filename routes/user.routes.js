const controller = require("../controller/user.controller");
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

  app.get("/api/v1/user", firebaseAuthMiddleware, controller.getAllUsers);
  app.get("/api/v1/user/:id", firebaseAuthMiddleware, controller.getUserById);
  app.post(
    "/api/v1/user",
    [firebaseAuthMiddleware, fileUploadMiddleware],
    controller.addUser
  );
  app.put(
    "/api/v1/user/:id",
    [firebaseAuthMiddleware, fileUploadMiddleware],
    controller.updateUser
  );
  app.put(
    "/api/v1/user/trending/tale",
    firebaseAuthMiddleware,
    controller.updateTrendingTale
  );
  app.get(
    "/api/v1/user/trending/user",
    firebaseAuthMiddleware,
    controller.getTrendingUser
  );
  app.put(
    "/api/v1/user/trending/user",
    firebaseAuthMiddleware,
    controller.updateTrendingUser
  );
  app.get(
    "/api/v1/user/current/read",
    firebaseAuthMiddleware,
    controller.getUserAllCurrentRead
  );
  app.post(
    "/api/v1/user/current/read",
    firebaseAuthMiddleware,
    controller.addUserCurrentRead
  );
  app.delete(
    "/api/v1/user/current/read",
    firebaseAuthMiddleware,
    controller.removeUserCurrentRead
  );
};
