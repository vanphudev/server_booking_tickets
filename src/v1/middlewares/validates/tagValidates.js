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

const validateTagWithIdInQuery = [
   query("tagId").notEmpty().withMessage("Tag ID is required"),
   query("tagId").isInt().withMessage("Tag ID must be a number"),
   validateResult,
];

const validateCreateTag = [
   body("tag_name")
      .notEmpty().withMessage("Tag name is required")
      .isLength({ min: 2, max: 255 }).withMessage("Tag name must be between 2 and 255 characters"),
   body("tag_description")
      .notEmpty().withMessage("Tag description is required")
      .isLength({ max: 500 }).withMessage("Tag description cannot exceed 500 characters"),
   validateResult,
];

const validateUpdateTag = [
   param("id").notEmpty().withMessage("Tag ID is required"),
   param("id").isInt().withMessage("Tag ID must be a number"),
   body("tag_name")
      .notEmpty().withMessage("Tag name is required")
      .isLength({ min: 2, max: 255 }).withMessage("Tag name must be between 2 and 255 characters"),
   body("tag_description")
      .notEmpty().withMessage("Tag description is required")
      .isLength({ max: 500 }).withMessage("Tag description cannot exceed 500 characters"),
   validateResult,
];

const validateDeleteTag = [
   param("id").notEmpty().withMessage("Tag ID is required"),
   param("id").isInt().withMessage("Tag ID must be a number"),
   validateResult,
];

module.exports = {
   validateCreateTag,
   validateUpdateTag,
   validateTagWithIdInQuery,
   validateDeleteTag,
};