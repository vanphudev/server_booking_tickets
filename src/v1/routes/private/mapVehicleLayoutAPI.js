const express = require("express");
const rootRouter = express.Router();

const __MAP_VEHICLElAYOUT = require("../../controllers/mapVehicleLayoutController");
const asyncHandler = require("../../middlewares/handleError");

rootRouter.post("/create", asyncHandler(__MAP_VEHICLElAYOUT.createMapVehicleLayout));
rootRouter.put("/update/:id", asyncHandler(__MAP_VEHICLElAYOUT.updateMapVehicleLayout));
rootRouter.delete("/delete/:id", asyncHandler(__MAP_VEHICLElAYOUT.deleteMapVehicleLayout));

rootRouter.get("/all", asyncHandler(__MAP_VEHICLElAYOUT.getAllMapVehicleLayout)); 
rootRouter.get("/:id", asyncHandler(__MAP_VEHICLElAYOUT.getMapVehicleLayoutById));
module.exports = rootRouter;
