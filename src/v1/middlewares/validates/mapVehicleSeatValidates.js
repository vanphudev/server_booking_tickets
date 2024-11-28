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

const validateMapVehicleSeatWithIdInQuery = [
    query("seatId")
        .notEmpty().withMessage("Seat ID is required")
        .isInt().withMessage("Seat ID must be a number"),
    validateResult,
];

const validateCreateMapVehicleSeat = [
    body("code")
        .notEmpty().withMessage("Seat code is required")
        .isString().withMessage("Seat code must be a string")
        .isLength({ min: 1, max: 50 }).withMessage("Seat code must be between 1 and 50 characters"),
    body("row")
        .notEmpty().withMessage("Row number is required")
        .isInt({ min: 1 }).withMessage("Row number must be a positive number"),
    body("col")
        .notEmpty().withMessage("Column number is required")
        .isInt({ min: 1 }).withMessage("Column number must be a positive number"),
    body("floor")
        .notEmpty().withMessage("Floor number is required")
        .isInt({ min: 1 }).withMessage("Floor number must be a positive number"),
    body("lock_chair")
        .optional()
        .isBoolean().withMessage("Lock chair must be a boolean value"),
    body("mapvehiclelayoutid")
        .notEmpty().withMessage("Layout ID is required")
        .isInt().withMessage("Layout ID must be a number"),
    validateResult,
];

const validateUpdateMapVehicleSeat = [
    param("id")
        .notEmpty().withMessage("Seat ID is required")
        .isInt().withMessage("Seat ID must be a number"),
    body("code")
        .optional()
        .isString().withMessage("Seat code must be a string")
        .isLength({ min: 1, max: 50 }).withMessage("Seat code must be between 1 and 50 characters"),
    body("row")
        .optional()
        .isInt({ min: 1 }).withMessage("Row number must be a positive number"),
    body("col")
        .optional()
        .isInt({ min: 1 }).withMessage("Column number must be a positive number"),
    body("floor")
        .optional()
        .isInt({ min: 1 }).withMessage("Floor number must be a positive number"),
    body("lock_chair")
        .optional()
        .isBoolean().withMessage("Lock chair must be a boolean value"),
    body("mapvehiclelayoutid")
        .optional()
        .isInt().withMessage("Layout ID must be a number"),
    validateResult,
];

const validateDeleteMapVehicleSeat = [
    param("id")
        .notEmpty().withMessage("Seat ID is required")
        .isInt().withMessage("Seat ID must be a number"),
    validateResult,
];

module.exports = {
    validateMapVehicleSeatWithIdInQuery,
    validateCreateMapVehicleSeat,
    validateUpdateMapVehicleSeat,
    validateDeleteMapVehicleSeat,
};