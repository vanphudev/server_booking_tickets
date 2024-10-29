const express = require("express");
const rootRouter = express.Router();

const __RESPONSE = require("../core");
rootRouter.use("/private", require("./private"));
rootRouter.use("/public", require("./public"));

module.exports = rootRouter;
