const express = require("express");
const rootRouter = express.Router();

const __PAYMENT_TYPE_CONTROLLER = require("../../controllers/paymentTypeController");
const asyncHandler = require("../../middlewares/handleError");
const {
    validateCreatePaymentType,
    validateUpdatePaymentType,
    validatePaymentTypeWithIdInQuery,
    validateDeletePaymentType
} = require("../../middlewares/validates/paymentTypeValidates");

rootRouter.post("/create", validateCreatePaymentType, asyncHandler(__PAYMENT_TYPE_CONTROLLER.createPaymentType));
rootRouter.put("/update/:id", validateUpdatePaymentType, asyncHandler(__PAYMENT_TYPE_CONTROLLER.updatePaymentType));
rootRouter.delete("/delete/:id", validateDeletePaymentType, asyncHandler(__PAYMENT_TYPE_CONTROLLER.deletePaymentType));
rootRouter.get("/all", asyncHandler(__PAYMENT_TYPE_CONTROLLER.getAllPaymentTypes));
rootRouter.get("/getbyid", validatePaymentTypeWithIdInQuery, asyncHandler(__PAYMENT_TYPE_CONTROLLER.getPaymentTypeById));

module.exports = rootRouter;