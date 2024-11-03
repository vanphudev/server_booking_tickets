const {body, query} = require("express-validator");
const validateCreateOfficeImage = [
   body("officeId").notEmpty().withMessage("Office ID is required"),
   body("officeId").isInt().withMessage("Office ID must be an integer"),
];

const validateUpdateOfficeImage = [body("officeImageId").notEmpty().withMessage("Office Image ID is required")];

const validateOfficeImageWithByIDToQuery = [
   query("officeImageId").notEmpty().withMessage("Office Image ID is required"),
];

module.exports = {
   validateCreateOfficeImage,
   validateUpdateOfficeImage,
   validateOfficeImageWithByIDToQuery,
};
