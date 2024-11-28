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

const validateRoleWithIdInQuery = [
   query("roleId").notEmpty().withMessage("Role ID is required"),
   query("roleId").isInt().withMessage("Role ID must be a number"),
   validateResult,
];

const validateCreateRole = [
   body("role_name").notEmpty().withMessage("Role name is required"),
   body("role_description").notEmpty().withMessage("Role description is required"),
   body("role_value_url").notEmpty().withMessage("Role value URL is required"),
   validateResult,
];

const validateUpdateRole = [
   param("id").notEmpty().withMessage("Role ID is required"),
   param("id").isInt().withMessage("Role ID must be a number"),
   body("role_name").notEmpty().withMessage("Role name is required"),
   body("role_description").notEmpty().withMessage("Role description is required"),
   body("role_value_url").notEmpty().withMessage("Role value URL is required"),
   validateResult,
];

const validateDeleteRole = [
   param("id").notEmpty().withMessage("Role ID is required"),
   param("id").isInt().withMessage("Role ID must be a number"),
   validateResult,
];

module.exports = {
   validateCreateRole,
   validateUpdateRole,
   validateRoleWithIdInQuery,
   validateDeleteRole,
};
