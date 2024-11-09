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
const validateRoleGroupWithIdsInQuery = [
   query("roleId").notEmpty().withMessage("Role ID is required").isInt().withMessage("Role ID must be a number"),
   query("groupId").notEmpty().withMessage("Group ID is required").isInt().withMessage("Group ID must be a number"),
   validateResult,
];
const validateCreateRoleGroup = [
   body("roleId").notEmpty().withMessage("Role ID is required").isInt().withMessage("Role ID must be a number"),
   body("groupId").notEmpty().withMessage("Group ID is required").isInt().withMessage("Group ID must be a number"),
   validateResult,
];
const validateUpdateRoleGroup = [
   param("oldRoleId")
      .notEmpty()
      .withMessage("Old Role ID is required")
      .isInt()
      .withMessage("Old Role ID must be a number"),
   param("oldGroupId")
      .notEmpty()
      .withMessage("Old Group ID is required")
      .isInt()
      .withMessage("Old Group ID must be a number"),
   body("newRoleId").optional().isInt().withMessage("New Role ID must be a number"),
   body("newGroupId").optional().isInt().withMessage("New Group ID must be a number"),
   validateResult,
];
const validateDeleteRoleGroup = [
   param("roleId").notEmpty().withMessage("Role ID is required").isInt().withMessage("Role ID must be a number"),
   param("groupId").notEmpty().withMessage("Group ID is required").isInt().withMessage("Group ID must be a number"),
   validateResult,
];
module.exports = {
   validateRoleGroupWithIdsInQuery,
   validateCreateRoleGroup,
   validateUpdateRoleGroup,
   validateDeleteRoleGroup,
};
