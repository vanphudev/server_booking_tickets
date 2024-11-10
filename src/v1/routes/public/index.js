"use strict";
const express = require("express");
const publicRouter = express.Router();

publicRouter.use("/provinces", require("./provinceAPI"));
publicRouter.use("/districts", require("./districtAPI"));
publicRouter.use("/office", require("./officeAPI"));
publicRouter.use("/wards", require("./wardAPI"));
publicRouter.use("/vouchers", require("./voucherAPI"));
publicRouter.use("/employee/auth", require("./Auth/employeeAPI"));
publicRouter.use("/employee-type", require("./employeeTypeAPI"));
module.exports = publicRouter;
