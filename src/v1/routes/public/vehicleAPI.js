const express = require("express");
const rootRouter = express.Router();
const __RESPONSE = require("../../core/errorResponse");
const __VEHICLE_CONTROLLER = require("../../controllers/vehicleController");
const asyncHandler = require("../../middlewares/handleError");
const {
   validateVehicleWithByIDToQuery,
   validateCreateVehicle,
   validateUpdateVehicle,
} = require("../../middlewares/validates/vehicleValidates");

rootRouter
   .get("/getall", asyncHandler(__VEHICLE_CONTROLLER.getAllVehicles));


module.exports = rootRouter;
