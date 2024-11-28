const express = require("express");
const rootRouter = express.Router();
const __PAYMENT_CONFIG_CONTROLLER = require("../../controllers/paymentConfigController");
const asyncHandler = require("../../middlewares/handleError");
const {
    validateCreatePaymentConfig,
    validateUpdatePaymentConfig,
    validatePaymentConfigWithIdInQuery,
    validateDeletePaymentConfig
} = require("../../middlewares/validates/paymentConfigValidates");

rootRouter.post("/create", 
    validateCreatePaymentConfig, 
    asyncHandler(__PAYMENT_CONFIG_CONTROLLER.createPaymentConfig)
);

rootRouter.put("/update/:configId", 
    validateUpdatePaymentConfig, 
    asyncHandler(__PAYMENT_CONFIG_CONTROLLER.updatePaymentConfig)
);

rootRouter.delete("/delete/:configId", 
    validateDeletePaymentConfig, 
    asyncHandler(__PAYMENT_CONFIG_CONTROLLER.deletePaymentConfig)
);

rootRouter.get("/getall", 
    asyncHandler(__PAYMENT_CONFIG_CONTROLLER.getAllPaymentConfigs)
);

rootRouter.get("/getbyid", 
    validatePaymentConfigWithIdInQuery, 
    asyncHandler(__PAYMENT_CONFIG_CONTROLLER.getPaymentConfigById)
);

module.exports = rootRouter;