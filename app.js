require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const db = require("./models/index");

var app = express();
app.use(cors());

const mongoUrl = `mongodb://${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DB}`;

db.mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("Connections error", err);
    process.exit();
  });

// Initialize Firebase Admin SDK
const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("./config/firebase.config.json");
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

//api routes
require("./routes/category.routes")(app);
require("./routes/home.routes")(app);
require("./routes/interaction.routes")(app);
require("./routes/story.routes")(app);
require("./routes/tale.routes")(app);
require("./routes/user.routes")(app);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).json({ error: true, errorMsg: err });
});

module.exports = app;
