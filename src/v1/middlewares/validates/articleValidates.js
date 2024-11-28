const { body, query, check } = require("express-validator");

const validateArticleWithByIDToQuery = [
   check("article_id")
      .exists()
      .notEmpty().withMessage("Article ID is required")
      .isInt().withMessage("Article ID must be a number"),
];

const validateCreateArticle = [
   check("article_title")
      .exists()
      .notEmpty().withMessage("Article title is required"),
   check("article_description")
      .exists()
      .notEmpty().withMessage("Article description is required"),
   check("article_content")
      .exists()
      .notEmpty().withMessage("Article content is required"),
   check("article_slug")
      .exists()
      .notEmpty().withMessage("Article slug is required"),
   check("published_at")
      .optional()
      .isISO8601().withMessage("Invalid published date format"),
   check("is_priority")
      .exists()
      .isIn([0, 1]).withMessage("Priority must be 0 or 1"),
   check("article_type_id")
      .exists()
      .notEmpty().withMessage("Article type ID is required")
      .isInt().withMessage("Article type ID must be a number"),
   check("employee_id")
      .exists()
      .notEmpty().withMessage("Employee ID is required")
      .isInt().withMessage("Employee ID must be a number"),
   check("thumbnail_img")
      .optional(),
   check("thumbnail_img_public_id")
      .optional()
];

const validateUpdateArticle = [
   check("article_title")
      .optional()
      .notEmpty().withMessage("Article title cannot be empty"),
   check("article_description")
      .optional(),
   check("article_content")
      .optional()
      .notEmpty().withMessage("Article content cannot be empty"),
   check("article_slug")
      .optional()
      .notEmpty().withMessage("Article slug cannot be empty"),
   check("published_at")
      .optional()
      .isISO8601().withMessage("Invalid published date format"),
   check("is_priority")
      .optional()
      .isIn([0, 1]).withMessage("Priority must be 0 or 1"),
   check("article_type_id")
      .optional()
      .isInt().withMessage("Article type ID must be a number"),
   check("employee_id")
      .optional()
      .isInt().withMessage("Employee ID must be a number"),
   check("thumbnail_img")
      .optional(),
   check("thumbnail_img_public_id")
      .optional()
];

module.exports = {
   validateUpdateArticle,
   validateCreateArticle,
   validateArticleWithByIDToQuery,
};