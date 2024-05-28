const express = require("express");
const app = new express();
const { notFoundHandler, errorHandler } = require("./src/utility/error");
const baseRoute = require("./src/routes/base.route");
const routes = require("./src/routes/index.route");

// ? connected mongoDB
const connectDB = require("./config/db").apply();

// ? import middleware
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const path = require("path");

// ! used middleware
app.use([
  morgan("dev"),
  cors(),
  cookieParser(),
  helmet(),
  mongoSanitize(),
  hpp(),
  express.json({ limit: "50mb" }),
  express.urlencoded({ limit: "50mb" }),
]);
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);
app.set("etag", false);

// ? Routes
app.use("/", baseRoute);
app.use("/api/v1", routes);

// ? error handler
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
