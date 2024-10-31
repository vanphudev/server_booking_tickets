const express = require("express");
const rootRouter = express.Router();
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

rootRouter.get("/", (req, res) => {
   res.json({
      message: "Welcome to the API v1",
   });
});
module.exports = rootRouter;
