"use strict";
const express = require("express");
const privateRouter = express.Router();

// Middleware authentication
const employeeAuth = require("../../middlewares/Auth/authUtils").authentication;
const customerAuth = require("../../middlewares/Auth/authCusUtils").authentication;

// Router dành cho nhân viên
const employeeRouter = express.Router();
employeeRouter.use(employeeAuth);
privateRouter.use("/employee", employeeRouter);
employeeRouter.use("/type-customer", require("./typeCustomerAPI"));
employeeRouter.use("/type-vehicle", require("./typeVehicleAPI"));
employeeRouter.use("/vehicle", require("./vehicleAPI"));
employeeRouter.use("/vehicleImage", require("./vehicleImageAPI"));
employeeRouter.use("/type-article", require("./typeArticleAPI"));
employeeRouter.use("/article", require("./articleAPI"));
employeeRouter.use("/articleimage", require("./articleImageAPI"));
employeeRouter.use("/type-customer", require("./typeCustomerAPI"));
employeeRouter.use("/office", require("./officeAPI"));
employeeRouter.use("/way", require("./wayAPI"));
employeeRouter.use("/officeimage", require("./officeImageAPI"));
employeeRouter.use("/map-vehicle-layout", require("./mapVehicleLayoutAPI"));
employeeRouter.use("/map-vehicle-seat", require("./mapVehicleSeatAPI"));
employeeRouter.use("/role", require("./roleAPI"));
employeeRouter.use("/payment-type", require("./paymentTypeAPI"));
employeeRouter.use("/group", require("./groupAPI"));
employeeRouter.use("/role-group", require("./roleGroupAPI"));
employeeRouter.use("/employee/auth", require("./Auth/employeeAPI"));
employeeRouter.use("/employee-type", require("./employeeTypeAPI"));

// Router dành cho khách hàng
const customerRouter = express.Router();
customerRouter.use(customerAuth);
privateRouter.use("/customer", customerRouter);
customerRouter.use("/auth", require("./Auth/customerAPI"));
// customerRouter.use("/profile", require("./customerProfileAPI"));

module.exports = privateRouter;
