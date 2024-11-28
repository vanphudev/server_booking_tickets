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

// Đảm bảo tất cả các route đều được bọc trong try-catch
rootRouter.post("/create", 
   validateCreateDriver, 
   asyncHandler(async (req, res) => {
      await __DRIVER_CONTROLLER.createDriver(req, res);
   })
);

rootRouter.put("/update/:id", 
   validateUpdateDriver, 
   asyncHandler(async (req, res) => {
      await __DRIVER_CONTROLLER.updateDriver(req, res);
   })
);

rootRouter.delete("/delete/:id", 
   validateDeleteDriver, 
   asyncHandler(async (req, res) => {
      await __DRIVER_CONTROLLER.deleteDriver(req, res);
   })
);

rootRouter.get("/all", 
   asyncHandler(async (req, res) => {
      await __DRIVER_CONTROLLER.getAllDrivers(req, res);
   })
);

rootRouter.get("/getbyid", 
   validateDriverWithIdInQuery, 
   asyncHandler(async (req, res) => {
      await __DRIVER_CONTROLLER.getDriverById(req, res);
   })
);

module.exports = rootRouter;