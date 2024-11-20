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
const validateDriverWithIdInQuery = [
   query("driverId")
      .notEmpty()
      .withMessage("Driver ID is required")
      .isInt()
      .withMessage("Driver ID must be a number"),
   validateResult,
];
const validateCreateDriver = [
   body("license_number")
      .notEmpty()
      .withMessage("Driver license number is required")
      .isString()
      .withMessage("Driver license number must be a string")
      .isLength({min: 1, max: 500})
      .withMessage("Driver license number must be between 1 and 500 characters"),
   body("experience_years")
      .notEmpty()
      .withMessage("Experience years is required")
      .isInt({min: 0})
      .withMessage("Experience years must be a non-negative number"),
   body("employee_id")
      .notEmpty()
      .withMessage("Employee ID is required")
      .isInt()
      .withMessage("Employee ID must be a number"),
   validateResult,
];
const validateUpdateDriver = [
   param("id")
      .notEmpty()
      .withMessage("Driver ID is required")
      .isInt()
      .withMessage("Driver ID must be a number"),
   body("license_number")
      .optional()
      .isString()
      .withMessage("Driver license number must be a string")
      .isLength({min: 1, max: 500})
      .withMessage("Driver license number must be between 1 and 500 characters"),
   body("experience_years")
      .optional()
      .isInt({min: 0})
      .withMessage("Experience years must be a non-negative number"),
   body("employee_id")
      .optional()
      .isInt()
      .withMessage("Employee ID must be a number"),
   validateResult,
];
const validateDeleteDriver = [
   param("id")
      .notEmpty()
      .withMessage("Driver ID is required")
      .isInt()
      .withMessage("Driver ID must be a number"),
   validateResult,
];
module.exports = {
   validateDriverWithIdInQuery,
   validateCreateDriver,
   validateUpdateDriver,
   validateDeleteDriver,
};