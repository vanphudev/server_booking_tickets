const express = require("express");
const rootRouter = express.Router();

const __PAYMENTMETHOD_CONTROLLER = require("../../controllers/paymentMethodController");
const asyncHandler = require("../../middlewares/handleError");

rootRouter.post("/create", asyncHandler(__PAYMENTMETHOD_CONTROLLER.createPaymentMethod));
rootRouter.put("/update/:id", asyncHandler(__PAYMENTMETHOD_CONTROLLER.updatePaymentMethod)); 
rootRouter.delete("/delete/:id", asyncHandler(__PAYMENTMETHOD_CONTROLLER.deletePaymentMethod));

rootRouter.get("/all", asyncHandler(__PAYMENTMETHOD_CONTROLLER.getAllPaymentMethod)); 
rootRouter.get("/:id", asyncHandler(__PAYMENTMETHOD_CONTROLLER.getPaymentMethodById));

module.exports = rootRouter;
