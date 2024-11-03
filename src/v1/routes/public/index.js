"use strict";
const express = require("express");
const publicRouter = express.Router();

publicRouter.use("/provinces", require("./provinceAPI"));
publicRouter.use("/districts", require("./districtAPI"));
publicRouter.use("/wards", require("./wardAPI"));
publicRouter.use("/vouchers", require("./voucherAPI"));

module.exports = publicRouter;
