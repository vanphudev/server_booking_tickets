const express = require("express");
const rootRouter = express.Router();
const typeCustomerRouter = require("./typeCustomerAPI");
const mapVehicleLayoutRouter = require("./mapVehicleLayoutAPI");
const mapVehicleSeatRouter = require("./mapVehicleSeatAPI");
const roleRouter=require("./roleAPI");
const paymentTypeRouter =require("./paymentTypeAPI");
const groupRouter =require("./groupAPI");
const roleGroupRouter =require("./roleGroupAPI");

rootRouter.use("/type-customer", typeCustomerRouter);
rootRouter.use("/map-vehicle-layout", mapVehicleLayoutRouter);
rootRouter.use("/map-vehicle-seat", mapVehicleSeatRouter);
rootRouter.use("/role", roleRouter);
rootRouter.use("/payment-type", paymentTypeRouter);
rootRouter.use("/group", groupRouter);
rootRouter.use("/role-group", roleGroupRouter);
rootRouter.get("/", (req, res) => {
   res.json({
      message: "Welcome to the API v1",
   });
});
module.exports = rootRouter;
