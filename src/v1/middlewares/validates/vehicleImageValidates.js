const {body, query, param} = require("express-validator");
const validateCreateVehicleImage = [
   param("vehicleId").notEmpty().withMessage("Vehicle ID is required"),
   param("vehicleId").isInt().withMessage("Vehicle ID must be an integer"),
];

const validateUpdateVehicleImage = [param("vehicleImageId").notEmpty().withMessage("Vehicle Image ID is required")];

const validateVehicleImageWithByIDToQuery = [
   query("vehicleImageId").notEmpty().withMessage("vehicle Image ID is required"),
];

module.exports = {
   validateCreateVehicleImage,
   validateUpdateVehicleImage,
   validateVehicleImageWithByIDToQuery,
};
