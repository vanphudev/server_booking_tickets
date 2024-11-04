const {body, query, param} = require("express-validator");
const {validationResult} = require("express-validator");

// Hàm validateResult
const validateResult = (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({
         error: true,
         message: "Validation failed: " + errors.array()[0]?.msg + " !",
         details: {
            errors: errors.array(),
         },
      });
   }
   next();
};

const validatePaymentMethodWithIdInQuery = [
   query("methodId")
      .notEmpty()
      .withMessage("Payment Method ID is required")
      .isInt()
      .withMessage("Payment Method ID must be a number"),
   validateResult,
];

const validateCreatePaymentMethod = [
   body("code")
      .notEmpty()
      .withMessage("Payment method code is required")
      .isString()
      .withMessage("Payment method code must be a string")
      .isLength({min: 1, max: 255})
      .withMessage("Payment method code must be between 1 and 255 characters"),
   body("name")
      .notEmpty()
      .withMessage("Payment method name is required")
      .isString()
      .withMessage("Payment method name must be a string")
      .isLength({min: 1, max: 255})
      .withMessage("Payment method name must be between 1 and 255 characters"),
   body("islocked")
      .notEmpty()
      .withMessage("Is locked status is required")
      .isBoolean()
      .withMessage("Is locked must be a boolean value"),
   body("lock_at")
      .notEmpty()
      .withMessage("Lock at date is required")
      .isISO8601()
      .withMessage("Lock at must be a valid date"),
   body("description")
      .notEmpty()
      .withMessage("Description is required")
      .isString()
      .withMessage("Description must be a string")
      .isLength({min: 1, max: 1000})
      .withMessage("Description must be between 1 and 1000 characters"),
   body("paymenttypeid")
      .notEmpty()
      .withMessage("Payment type ID is required")
      .isInt()
      .withMessage("Payment type ID must be a number"),
   validateResult,
];

const validateUpdatePaymentMethod = [
   param("id")
      .notEmpty()
      .withMessage("Payment Method ID is required")
      .isInt()
      .withMessage("Payment Method ID must be a number"),
   body("code")
      .optional()
      .isString()
      .withMessage("Payment method code must be a string")
      .isLength({min: 1, max: 255})
      .withMessage("Payment method code must be between 1 and 255 characters"),
   body("name")
      .optional()
      .isString()
      .withMessage("Payment method name must be a string")
      .isLength({min: 1, max: 255})
      .withMessage("Payment method name must be between 1 and 255 characters"),
   body("islocked").optional().isBoolean().withMessage("Is locked must be a boolean value"),
   body("lock_at").optional().isISO8601().withMessage("Lock at must be a valid date"),
   body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string")
      .isLength({min: 1, max: 1000})
      .withMessage("Description must be between 1 and 1000 characters"),
   body("paymenttypeid").optional().isInt().withMessage("Payment type ID must be a number"),
   validateResult,
];

const validateDeletePaymentMethod = [
   param("id")
      .notEmpty()
      .withMessage("Payment Method ID is required")
      .isInt()
      .withMessage("Payment Method ID must be a number"),
   validateResult,
];

module.exports = {
   validatePaymentMethodWithIdInQuery,
   validateCreatePaymentMethod,
   validateUpdatePaymentMethod,
   validateDeletePaymentMethod,
};
