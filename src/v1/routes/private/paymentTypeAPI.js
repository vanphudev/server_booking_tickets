const express = require("express");
const rootRouter = express.Router();

const __PAYMENT_TYPE_CONTROLLER = require("../../controllers/paymentTypeController");
const asyncHandler = require("../../middlewares/handleError");

rootRouter.post("/create", asyncHandler(__PAYMENT_TYPE_CONTROLLER.createPaymentType));
rootRouter.put("/update/:id", asyncHandler(__PAYMENT_TYPE_CONTROLLER.updatePaymentType));
rootRouter.delete("/delete/:id", asyncHandler(__PAYMENT_TYPE_CONTROLLER.deletePaymentType));

rootRouter.get("/all", asyncHandler(__PAYMENT_TYPE_CONTROLLER.getAllPaymentTypes)); 
rootRouter.get("/:id", asyncHandler(__PAYMENT_TYPE_CONTROLLER.getPaymentTypeById));
module.exports = rootRouter;
