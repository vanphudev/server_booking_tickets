const express = require("express");
const rootRouter = express.Router();

const __TYPE_VEHICLE_IMAGE_CONTROLLER = require("../../controllers/vehicleImageController");
const asyncHandler = require("../../middlewares/handleError");

rootRouter.post("/create", asyncHandler(__TYPE_VEHICLE_IMAGE_CONTROLLER.createVehicleImage));
rootRouter.get("/all", asyncHandler(__TYPE_VEHICLE_IMAGE_CONTROLLER.getAllVehicleImage));
rootRouter.get("/:id", asyncHandler(__TYPE_VEHICLE_IMAGE_CONTROLLER.getVehicleImageById));
rootRouter.delete("/delete/:id", asyncHandler(__TYPE_VEHICLE_IMAGE_CONTROLLER.deleteImageVehicle));
rootRouter.put("/update/:id", asyncHandler(__TYPE_VEHICLE_IMAGE_CONTROLLER.updateImageVehicle));

module.exports = rootRouter;
