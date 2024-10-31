const express = require("express");
const rootRouter = express.Router();

const __TYPE_VEHICLE_CONTROLLER = require("../../controllers/vehicleTypeController");
const asyncHandler = require("../../middlewares/handleError");

rootRouter.post("/create", asyncHandler( __TYPE_VEHICLE_CONTROLLER.createTypeVehicle));
rootRouter.delete("/delete/:id", asyncHandler( __TYPE_VEHICLE_CONTROLLER.deleteTypeVehicle));
rootRouter.put("/update/:id", asyncHandler(__TYPE_VEHICLE_CONTROLLER.updateTypeVehicle));
rootRouter.get("/all", asyncHandler(__TYPE_VEHICLE_CONTROLLER.getAllVehicleTypes));
rootRouter.get("/:id", asyncHandler(__TYPE_VEHICLE_CONTROLLER.getVehicleTypeById));

module.exports = rootRouter;
