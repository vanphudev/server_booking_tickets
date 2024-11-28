const express = require("express");
const rootRouter = express.Router();

const __DRIVER_CONTROLLER = require("../../controllers/driverController");
const asyncHandler = require("../../middlewares/handleError");
const {
   validateCreateDriver,
   validateUpdateDriver,
   validateDriverWithIdInQuery,
   validateDeleteDriver,
} = require("../../middlewares/validates/driverValidates");

rootRouter.post("/create", 
   validateCreateDriver, 
   asyncHandler(__DRIVER_CONTROLLER.createDriver)
);

rootRouter.put("/update/:id", 
   validateUpdateDriver, 
   asyncHandler(__DRIVER_CONTROLLER.updateDriver)
);

rootRouter.delete("/delete/:id", 
   validateDeleteDriver, 
   asyncHandler(__DRIVER_CONTROLLER.deleteDriver)
);

rootRouter.get("/all", 
   asyncHandler(__DRIVER_CONTROLLER.getAllDrivers)
);

rootRouter.get("/getbyid", 
   validateDriverWithIdInQuery, 
   asyncHandler(__DRIVER_CONTROLLER.getDriverById)
);

module.exports = rootRouter;