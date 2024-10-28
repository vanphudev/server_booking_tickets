"use strict";
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const device = require("express-device");
const useragent = require("express-useragent");
const expressIp = require("express-ip");
const compression = require("compression");
require("dotenv").config();
var bodyParser = require("body-parser");
const {default: helmet} = require("helmet");
const cors = require("cors");
const __RESPONSE = require("./core");
const {ConnectDatabase: initDb, CloseDatabase: closedDb} = require("./db");
const rootRouter = require("./routes");
const logRequestTime = require("../v1/middlewares/logRequestTime");
const {stringify} = require("flatted");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(expressIp().getIpInfoMiddleware);
app.use(device.capture());
app.use(useragent.express());

initDb();

app.use(
   cors({
      origin: "http://localhost:8801",
      credentials: true,
   })
);

app.use(logRequestTime);

app.get("/", (req, res, next) => {
   try {
      return new __RESPONSE.GET({
         message: "Welcome to the API Booking Tickets.",
         metadata: null,
         request: req,
      }).send(res);
   } catch (error) {
      next(error);
   }
});

app.use("/api/v1", rootRouter);

app.use((req, res, next) => {
   const error = new __RESPONSE.NotFoundError({
      message: "Not Found",
      suggestion: "Please check your request",
      request: req,
   });
   next(error);
});

app.use((error, req, res, next) => {
   if (error.status) {
      return res.status(error.status).json(error);
   }
   return res.status(500).json(
      new __RESPONSE.InternalServerError({
         message: error.message || "Internal Server Error",
         suggestion: "Please try again later or contact the administrator",
         request: req,
      })
   );
});

module.exports = app;
