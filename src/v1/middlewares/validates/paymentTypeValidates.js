const { body, query, param } = require("express-validator");
const { validationResult } = require("express-validator");
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
const validatePaymentTypeWithIdInQuery = [
    query("typeId")
        .notEmpty().withMessage("Payment Type ID is required")
        .isInt().withMessage("Payment Type ID must be a number"),
    validateResult,
];

const validateCreatePaymentType = [
    body("name")
        .notEmpty().withMessage("Payment Type name is required")
        .isString().withMessage("Payment Type name must be a string")
        .isLength({ min: 3, max: 255 }).withMessage("Payment Type name must be between 3 and 255 characters")
        .trim()
        .escape(),
    validateResult,
];

const validateUpdatePaymentType = [
    param("id")
        .notEmpty().withMessage("Payment Type ID is required")
        .isInt().withMessage("Payment Type ID must be a number"),
    body("name")
        .notEmpty().withMessage("Payment Type name is required")
        .isString().withMessage("Payment Type name must be a string")
        .isLength({ min: 3, max: 255 }).withMessage("Payment Type name must be between 3 and 255 characters")
        .trim()
        .escape(),
    validateResult,
];

const validateDeletePaymentType = [
    param("id")
        .notEmpty().withMessage("Payment Type ID is required")
        .isInt().withMessage("Payment Type ID must be a number"),
    validateResult,
];

module.exports = {
    validatePaymentTypeWithIdInQuery,
    validateCreatePaymentType,
    validateUpdatePaymentType,
    validateDeletePaymentType,
};