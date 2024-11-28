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
const validateGroupWithIdInQuery = [
   query("groupId")
      .notEmpty().withMessage("Group ID is required")
      .isInt().withMessage("Group ID must be a number")
      .toInt(), // Chuyển đổi sang số
   validateResult,
];

const validateCreateGroup = [
   body("name").notEmpty().withMessage("Group name is required"),
   body("description").notEmpty().withMessage("Group description is required"),
   body("locked").isBoolean().optional().withMessage("Locked status must be a boolean"),
   validateResult,
];
const validateUpdateGroup = [
   param("id").notEmpty().withMessage("Group ID is required")
      .isInt().withMessage("Group ID must be a number"),
   body("name").notEmpty().withMessage("Group name is required"),
   body("description").notEmpty().withMessage("Group description is required"),
   body("locked").optional().custom((value) => {
      if (typeof value === 'boolean' || value === 0 || value === 1) {
         return true;
      }
      throw new Error('Locked must be a boolean or 0/1');
   }),
   validateResult,
];

const validateDeleteGroup = [
   param("id").notEmpty().withMessage("Group ID is required"),
   param("id").isInt().withMessage("Group ID must be a number"),
   validateResult,
];

module.exports = {
   validateCreateGroup,
   validateUpdateGroup,
   validateGroupWithIdInQuery,
   validateDeleteGroup,

};



