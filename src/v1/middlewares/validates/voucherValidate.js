const {body} = require("express-validator");

const validateCreateVoucher = [
   body("code").notEmpty().withMessage("Voucher code is required"),
   body("percentage")
      .notEmpty()
      .withMessage("Discount percentage is required")
      .isFloat({min: 0})
      .withMessage("Discount percentage must be a positive number"),
   body("max_amount")
      .notEmpty()
      .withMessage("Max amount is required")
      .isFloat({min: 0})
      .withMessage("Max amount must be a positive number"),
   body("usage_limit")
      .notEmpty()
      .withMessage("Usage limit is required")
      .isInt({min: 1})
      .withMessage("Usage limit must be a positive integer"),
   body("valid_from")
      .notEmpty()
      .withMessage("Valid from date is required")
      .isISO8601()
      .withMessage("Valid from must be a valid date"),
   body("valid_to")
      .notEmpty()
      .withMessage("Valid to date is required")
      .isISO8601()
      .withMessage("Valid to must be a valid date"),
   body("create_by")
      .notEmpty()
      .withMessage("Creator ID is required")
      .isInt()
      .withMessage("Creator ID must be a number"),
];

const validateUpdateVoucher = [
   body("voucherId")
      .notEmpty()
      .withMessage("Voucher ID is required")
      .isInt()
      .withMessage("Voucher ID must be a number"),
   body("code").notEmpty().withMessage("Voucher code is required"),
   body("percentage")
      .notEmpty()
      .withMessage("Discount percentage is required")
      .isFloat({min: 0})
      .withMessage("Discount percentage must be a positive number"),
   body("max_amount")
      .notEmpty()
      .withMessage("Max amount is required")
      .isFloat({min: 0})
      .withMessage("Max amount must be a positive number"),
   body("usage_limit")
      .notEmpty()
      .withMessage("Usage limit is required")
      .isInt({min: 1})
      .withMessage("Usage limit must be a positive integer"),
   body("valid_from")
      .notEmpty()
      .withMessage("Valid from date is required")
      .isISO8601()
      .withMessage("Valid from must be a valid date"),
   body("valid_to")
      .notEmpty()
      .withMessage("Valid to date is required")
      .isISO8601()
      .withMessage("Valid to must be a valid date"),
   body("update_by")
      .notEmpty()
      .withMessage("Updater ID is required")
      .isInt()
      .withMessage("Updater ID must be a number"),
];

module.exports = {
   validateCreateVoucher,
   validateUpdateVoucher,
};
