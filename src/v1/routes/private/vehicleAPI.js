const express = require("express");
const rootRouter = express.Router();

const __TYPE_VEHICLE_CONTROLLER = require("../../controllers/vehicleController");
const asyncHandler = require("../../middlewares/handleError");

rootRouter.post("/create", asyncHandler(__TYPE_VEHICLE_CONTROLLER.createVehicle));
rootRouter.delete("/delete/:id", asyncHandler(__TYPE_VEHICLE_CONTROLLER.deleteVehicle));
rootRouter.put("/update/:id", asyncHandler(__TYPE_VEHICLE_CONTROLLER.updateVehicle));
module.exports = rootRouter;
