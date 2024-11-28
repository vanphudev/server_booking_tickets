const { body, query, param } = require("express-validator");
const { validationResult } = require("express-validator");

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

const validateMapVehicleLayoutWithIdInQuery = [
    query("layoutId")
        .notEmpty().withMessage("Layout ID is required")
        .isInt().withMessage("Layout ID must be a number"),
    validateResult,
];

const validateCreateMapVehicleLayout = [
    body("name")
        .notEmpty().withMessage("Layout name is required")
        .isString().withMessage("Layout name must be a string")
        .isLength({ min: 3, max: 255 }).withMessage("Layout name must be between 3 and 255 characters"),
    validateResult,
];

const validateUpdateMapVehicleLayout = [
    param("id")
        .notEmpty().withMessage("Layout ID is required")
        .isInt().withMessage("Layout ID must be a number"),
    body("name")
        .notEmpty().withMessage("Layout name is required")
        .isString().withMessage("Layout name must be a string")
        .isLength({ min: 3, max: 255 }).withMessage("Layout name must be between 3 and 255 characters"),
    validateResult,
];

const validateDeleteMapVehicleLayout = [
    param("id")
        .notEmpty().withMessage("Layout ID is required")
        .isInt().withMessage("Layout ID must be a number"),
    validateResult,
];

module.exports = {
    validateMapVehicleLayoutWithIdInQuery,
    validateCreateMapVehicleLayout,
    validateUpdateMapVehicleLayout,
    validateDeleteMapVehicleLayout,
};