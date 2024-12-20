"use strict";
const express = require("express");
const privateRouter = express.Router();

// Xác thực token.
privateRouter.use(require("../../middlewares/Auth/authUtils").authentication);
privateRouter.use("/type-customer", require("./typeCustomerAPI"));
privateRouter.use("/type-vehicle", require("./typeVehicleAPI"));
privateRouter.use("/vehicle", require("./vehicleAPI"));
privateRouter.use("/vehicleImage", require("./vehicleImageAPI"));
privateRouter.use("/type-article", require("./typeArticleAPI"));
privateRouter.use("/article", require("./articleAPI"));
privateRouter.use("/articleimage", require("./articleImageAPI"));
privateRouter.use("/type-customer", require("./typeCustomerAPI"));
privateRouter.use("/office", require("./officeAPI"));
privateRouter.use("/way", require("./wayAPI"));
privateRouter.use("/officeimage", require("./officeImageAPI"));
privateRouter.use("/map-vehicle-layout", require("./mapVehicleLayoutAPI"));
privateRouter.use("/map-vehicle-seat", require("./mapVehicleSeatAPI"));
privateRouter.use("/role", require("./roleAPI"));
privateRouter.use("/payment-type", require("./paymentTypeAPI"));
privateRouter.use("/group", require("./groupAPI"));
privateRouter.use("/role-group", require("./roleGroupAPI"));
privateRouter.use("/employee/auth", require("./Auth/employeeAPI"));
privateRouter.use("/employee-type", require("./employeeTypeAPI"));
privateRouter.use("/vouchers", require("./voucherAPI"));
privateRouter.use("/review", require("./reviewAPI"));
privateRouter.use("/employee", require("./employeeAPI"));
module.exports = privateRouter;
