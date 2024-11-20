"use strict";
const express = require("express");
const publicRouter = express.Router();

publicRouter.use("/provinces", require("./provinceAPI"));
publicRouter.use("/districts", require("./districtAPI"));
publicRouter.use("/office", require("./officeAPI"));
publicRouter.use("/wards", require("./wardAPI"));
publicRouter.use("/vouchers", require("./voucherAPI"));
publicRouter.use("/way", require("./wayAPI"));
publicRouter.use("/employee/auth", require("./Auth/employeeAPI"));
publicRouter.use("/employee-type", require("./employeeTypeAPI"));
publicRouter.use("/article", require("./articleAPI"));
publicRouter.use("/articleimage", require("./articleImageAPI"));
publicRouter.use("/review", require("./reviewAPI"));
publicRouter.use("/employee", require("./employeeAPI"));
module.exports = publicRouter;
