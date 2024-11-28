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
   .get("/getall", asyncHandler(__VEHICLE_CONTROLLER.getAllVehicles))
   .get("/getbyid", validateVehicleWithByIDToQuery, asyncHandler(__VEHICLE_CONTROLLER.getVehicleById))
   .post("/create", validateCreateVehicle, asyncHandler(__VEHICLE_CONTROLLER.createVehicle))
   .put("/update", validateUpdateVehicle, asyncHandler(__VEHICLE_CONTROLLER.updateVehicle))
   .delete("/delete/:vehicleId", validateVehicleWithByIDToQuery, asyncHandler(__VEHICLE_CONTROLLER.deleteVehicle))
   .get("/getalldeleted", asyncHandler(__VEHICLE_CONTROLLER.findAllDeletedVehicle));
   .delete("/delete", validateVehicleWithByIDToQuery, asyncHandler(__VEHICLE_CONTROLLER.deleteVehicle))
   .get("/getalldeleted", asyncHandler(__VEHICLE_CONTROLLER.findAllDeletedVehicle));
   .get("/getall", asyncHandler(__VEHICLE_CONTROLLER.getAllVehicles));

module.exports = rootRouter;
