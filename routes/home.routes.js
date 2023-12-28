const controller = require("../controller/home.controller");
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

  app.get("/api/v1/home", firebaseAuthMiddleware, controller.getHomeData);
  app.get(
    "/api/v1/home/followedtales",
    firebaseAuthMiddleware,
    controller.getUserFollowedTales
  );
  app.get(
    "/api/v1/home/trendinguser",
    firebaseAuthMiddleware,
    controller.getTrendingUser
  );
  app.get(
    "/api/v1/home/trendingtale",
    firebaseAuthMiddleware,
    controller.getTrendingTales
  );
  app.get(
    "/api/v1/home/currentread",
    firebaseAuthMiddleware,
    controller.getUserCurrentRead
  );
};
