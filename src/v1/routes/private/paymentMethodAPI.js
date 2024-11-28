const express = require("express");
const rootRouter = express.Router();

const __PAYMENT_METHOD_CONTROLLER = require("../../controllers/paymentMethodController");
const asyncHandler = require("../../middlewares/handleError");
const {createUploadMiddleware} = require("../../utils/uploadImages");

const __FOLDER__ = "payment_methods";
const __MAX_FILES__ = 10;

const paymentMethodImageUpload = createUploadMiddleware({
   maxFiles: __MAX_FILES__,
   customFolder: __FOLDER__,
});


const __PAYMENT_METHOD_CONTROLLER = require("../../controllers/paymentMethodController");
const asyncHandler = require("../../middlewares/handleError");

const {
    validateCreatePaymentMethod,
    validateUpdatePaymentMethod,
    validatePaymentMethodWithIdInQuery,
    validateDeletePaymentMethod
} = require("../../middlewares/validates/paymentMethodValidates");

rootRouter.post("/create", 
    validateCreatePaymentMethod, 
    paymentMethodImageUpload,
    asyncHandler(__PAYMENT_METHOD_CONTROLLER.createPaymentMethod)
);
rootRouter.put("/update", 
    validateUpdatePaymentMethod, 
    asyncHandler(__PAYMENT_METHOD_CONTROLLER.updatePaymentMethodAvatar),
    paymentMethodImageUpload,
    asyncHandler(__PAYMENT_METHOD_CONTROLLER.updatePaymentMethod)
);

rootRouter.post("/create", 
    validateCreatePaymentMethod, 
    asyncHandler(__PAYMENT_METHOD_CONTROLLER.createPaymentMethod)
);

rootRouter.put("/update/:id", 
    validateUpdatePaymentMethod, 
    asyncHandler(__PAYMENT_METHOD_CONTROLLER.updatePaymentMethod)
);

rootRouter.delete("/delete/:id", 
    validateDeletePaymentMethod, 
    asyncHandler(__PAYMENT_METHOD_CONTROLLER.deletePaymentMethod)
);
rootRouter.get("/getall", 
    asyncHandler(__PAYMENT_METHOD_CONTROLLER.getAllPaymentMethod)
);

rootRouter.get("/all", 
    asyncHandler(__PAYMENT_METHOD_CONTROLLER.getAllPaymentMethod)
);

rootRouter.get("/getbyid", 
    validatePaymentMethodWithIdInQuery, 
    asyncHandler(__PAYMENT_METHOD_CONTROLLER.getPaymentMethodById)
);

module.exports = rootRouter;


module.exports = rootRouter;

