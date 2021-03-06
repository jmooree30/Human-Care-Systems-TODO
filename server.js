const express = require("express");
const path = require("path");
const logger = require("morgan");
const users = require("./routes/users");
const todos = require("./routes/todos");
const bodyParser = require("body-parser");
const mongoose = require("./config/database"); //database configuration
const jwt = require("jsonwebtoken");
const app = express();

// allow cross-origin requests
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.set("secretKey", "nodeRestApi"); // jwt secret token

// connection to mongodb
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

// Serve vue app
app.use(express.static(path.join(__dirname, '/app/vue/dist')))
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + '/app/vue/dist/index.html'));
});

// public route
app.use("/users", users);
// private route
app.use("/todos", validateUser, todos);

// validate users trying to view protected routes
function validateUser(req, res, next) {
  jwt.verify(req.headers["x-access-token"], req.app.get("secretKey"), function (
    err,
    decoded
  ) {
    if (err) {
      res.json({ status: "error", message: err.message, data: null });
    } else {
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
}

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});
// handle errors
app.use(function (err, req, res, next) {
  console.log(err);
  if (err.status === 404)
    res.status(404).json({ message: "Page requested not found" });
  else res.status(500).json({ message: "Internal server error." });
});
app.listen(process.env.PORT || 5000, function () {
  console.log("Listening on port 5000");
});
