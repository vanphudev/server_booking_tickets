const {body, query, param} = require("express-validator");

const validateCreateOfficeImage = [
   param("officeId").notEmpty().withMessage("Office ID is required"),
   param("officeId").isInt().withMessage("Office ID must be an integer"),
];

const validateUpdateOfficeImage = [param("officeImageId").notEmpty().withMessage("Office Image ID is required")];

const validateOfficeImageWithByIDToQuery = [
   query("officeImageId").notEmpty().withMessage("Office Image ID is required"),
];

module.exports = {
   validateCreateOfficeImage,
   validateUpdateOfficeImage,
   validateOfficeImageWithByIDToQuery,
};
