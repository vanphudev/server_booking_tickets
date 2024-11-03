const express = require("express");
const rootRouter = express.Router();
rootRouter.use("/type-customer", require("./typeCustomerAPI"));
rootRouter.use("/office", require("./officeAPI"));
rootRouter.use("/way", require("./wayAPI"));
rootRouter.use("/officeimage", require("./officeImageAPI"));
const typeCustomerRouter = require("./typeCustomerAPI");
const typeVehicleRouter= require("./typeVehicleAPI");
const vehicleRouter= require("./vehicleAPI");
const vehicleImageRouter= require("./vehicleImageAPI");
const articleRouter= require("./typeArticleAPI");
rootRouter.use("/type-customer", typeCustomerRouter);
rootRouter.use("/type-vehicle", typeVehicleRouter);
rootRouter.use("/vehicle",vehicleRouter);
rootRouter.use("/vehicleImage", vehicleImageRouter);
rootRouter.use("/article", articleRouter);


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
