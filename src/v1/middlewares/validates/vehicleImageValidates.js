const {body, query, param, header} = require("express-validator");
const validateCreateVehicleImage = [
   header("vehicleid").notEmpty().withMessage("Vehicle ID is required"),
   header("vehicleid").isInt().withMessage("Vehicle ID must be an integer"),
   header("vehiclecode").notEmpty().withMessage("Vehicle Name is required"),
];

const validateUpdateVehicleImage = [
   header("vehicleid").notEmpty().withMessage("Vehicle ID is required"),
   header("vehicleid").isInt().withMessage("Vehicle ID must be an integer"),
   header("vehiclecode").notEmpty().withMessage("Vehicle Name is required"),
];

const validateVehicleImageWithByIDToQuery = [
   query("vehicleImageId").notEmpty().withMessage("vehicle Image ID is required"),
];

module.exports = {
   validateCreateVehicleImage,
   validateUpdateVehicleImage,
   validateVehicleImageWithByIDToQuery,
};
