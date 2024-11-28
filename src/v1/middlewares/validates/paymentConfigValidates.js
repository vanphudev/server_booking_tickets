const {body, query, param} = require("express-validator");
const {validationResult} = require("express-validator");

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

const validatePaymentConfigWithIdInQuery = [
   query("configId")
      .notEmpty()
      .withMessage("Payment Config ID is required")
      .isInt()
      .withMessage("Payment Config ID must be a number"),
   validateResult,
];

const validateCreatePaymentConfig = [
   body("api_key")
      .notEmpty()
      .withMessage("API key is required")
      .isString()
      .withMessage("API key must be a string"),
   
   body("secret_key")
      .notEmpty()
      .withMessage("Secret key is required")
      .isString()
      .withMessage("Secret key must be a string"),
   
   body("public_key")
      .notEmpty()
      .withMessage("Public key is required")
      .isString()
      .withMessage("Public key must be a string"),
   
   body("payment_endpoint_url")
      .notEmpty()
      .withMessage("Payment endpoint URL is required")
      .isURL()
      .withMessage("Payment endpoint URL must be a valid URL"),
   
   body("transaction_timeout")
      .notEmpty()
      .withMessage("Transaction timeout is required")
      .isInt({min: 0})
      .withMessage("Transaction timeout must be a positive number"),
   
   body("environment")
      .notEmpty()
      .withMessage("Environment is required")
      .isIn(['production', 'develop'])
      .withMessage("Environment must be either 'production' or 'develop'"),
   
   body("refund_url")
      .optional()
      .isURL()
      .withMessage("Refund URL must be a valid URL"),
   
   body("payment_method_id")
      .notEmpty()
      .withMessage("Payment method ID is required")
      .isInt()
      .withMessage("Payment method ID must be a number"),
   
   validateResult,
];

const validateUpdatePaymentConfig = [
   param("configId")
      .notEmpty()
      .withMessage("Payment Config ID is required")
      .isInt()
      .withMessage("Payment Config ID must be a number"),
   
   body("api_key")
      .optional()
      .isString()
      .withMessage("API key must be a string"),
   
   body("secret_key")
      .optional()
      .isString()
      .withMessage("Secret key must be a string"),
   
   body("public_key")
      .optional()
      .isString()
      .withMessage("Public key must be a string"),
   
   body("payment_endpoint_url")
      .optional()
      .isURL()
      .withMessage("Payment endpoint URL must be a valid URL"),
   
   body("transaction_timeout")
      .optional()
      .isInt({min: 0})
      .withMessage("Transaction timeout must be a positive number"),
   
   body("environment")
      .optional()
      .isIn(['production', 'develop'])
      .withMessage("Environment must be either 'production' or 'develop'"),
   
   body("refund_url")
      .optional()
      .isURL()
      .withMessage("Refund URL must be a valid URL"),
   
   body("payment_method_id")
      .optional()
      .isInt()
      .withMessage("Payment method ID must be a number"),
   
   validateResult,
];

const validateDeletePaymentConfig = [
   param("configId")
      .notEmpty()
      .withMessage("Payment Config ID is required")
      .isInt()
      .withMessage("Payment Config ID must be a number"),
   validateResult,
];

module.exports = {
   validatePaymentConfigWithIdInQuery,
   validateCreatePaymentConfig,
   validateUpdatePaymentConfig,
   validateDeletePaymentConfig,
};