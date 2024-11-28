const {body, query} = require("express-validator");

const validateVehicleWithByIDToQuery = [
   query("vehicleId").notEmpty().withMessage("Name is required"),
   query("vehicleId").isInt().withMessage("Vehicle ID must be a number"),
];

const validateCreateVehicle = [
   body("code").notEmpty().withMessage("Code is required"),
   body("license_plate").notEmpty().withMessage("license plate is required"),
   body("model").notEmpty().withMessage("Model is required"),
   body("brand").notEmpty().withMessage("brand is required"),
   body("capacity").notEmpty().withMessage("Capacity is required"),
   body("manufacture_year").notEmpty().withMessage("manufacture year is required"),
   body("color").notEmpty().withMessage("Color is required"),
   body("description").notEmpty().withMessage("description is required"),
];

const validateUpdateVehicle = [
   body("vehicleId").notEmpty().withMessage("Vehicle ID is required"),
   body("code").notEmpty().withMessage("Code is required"),
   body("license_plate").notEmpty().withMessage("license plate is required"),
   body("model").notEmpty().withMessage("Model is required"),
   body("brand").notEmpty().withMessage("brand is required"),
   body("capacity").notEmpty().withMessage("Capacity is required"),
   body("manufacture_year").notEmpty().withMessage("manufacture year is required"),
   body("color").notEmpty().withMessage("Color is required"),
   body("description").notEmpty().withMessage("description is required"),
];

module.exports = {
   validateVehicleWithByIDToQuery,
   validateCreateVehicle,
   validateUpdateVehicle,
};
