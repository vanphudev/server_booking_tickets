const express = require("express");
const rootRouter = express.Router();

const __MAP_VEHICLE_SEAT_CONTROLLER = require("../../controllers/mapVehicleSeatController");
const asyncHandler = require("../../middlewares/handleError");
const {
    validateCreateMapVehicleSeat,
    validateUpdateMapVehicleSeat,
    validateMapVehicleSeatWithIdInQuery,
    validateDeleteMapVehicleSeat
} = require("../../middlewares/validates/mapVehicleSeatValidates");

rootRouter.post("/create", validateCreateMapVehicleSeat, asyncHandler(__MAP_VEHICLE_SEAT_CONTROLLER.createMapVehicleSeat));
rootRouter.put("/update/:id", validateUpdateMapVehicleSeat, asyncHandler(__MAP_VEHICLE_SEAT_CONTROLLER.updateMapVehicleSeat));
rootRouter.delete("/delete/:id", validateDeleteMapVehicleSeat, asyncHandler(__MAP_VEHICLE_SEAT_CONTROLLER.deleteMapVehicleSeat));
rootRouter.get("/all", asyncHandler(__MAP_VEHICLE_SEAT_CONTROLLER.getAllMapVehicleSeat));
rootRouter.get("/getbyid", validateMapVehicleSeatWithIdInQuery, asyncHandler(__MAP_VEHICLE_SEAT_CONTROLLER.getMapVehicleSeatById));

module.exports = rootRouter;