const express = require("express");
const rootRouter = express.Router();

const __MAP_VEHICLE_LAYOUT_CONTROLLER = require("../../controllers/mapVehicleLayoutController");
const asyncHandler = require("../../middlewares/handleError");
const {
    validateCreateMapVehicleLayout,
    validateUpdateMapVehicleLayout,
    validateMapVehicleLayoutWithIdInQuery,
    validateDeleteMapVehicleLayout
} = require("../../middlewares/validates/mapVehicleLayoutValidates");

rootRouter.post("/create", validateCreateMapVehicleLayout, asyncHandler(__MAP_VEHICLE_LAYOUT_CONTROLLER.createMapVehicleLayout));
rootRouter.put("/update/:id", validateUpdateMapVehicleLayout, asyncHandler(__MAP_VEHICLE_LAYOUT_CONTROLLER.updateMapVehicleLayout));
rootRouter.delete("/delete/:id", validateDeleteMapVehicleLayout, asyncHandler(__MAP_VEHICLE_LAYOUT_CONTROLLER.deleteMapVehicleLayout));
rootRouter.get("/all", asyncHandler(__MAP_VEHICLE_LAYOUT_CONTROLLER.getAllMapVehicleLayouts));
rootRouter.get("/getbyid", validateMapVehicleLayoutWithIdInQuery, asyncHandler(__MAP_VEHICLE_LAYOUT_CONTROLLER.getMapVehicleLayoutById));

module.exports = rootRouter;