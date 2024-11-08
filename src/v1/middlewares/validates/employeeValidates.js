const {param} = require("express-validator");

const validateEmployee = [param("employeeId").notEmpty().withMessage("Employee ID is required")];

module.exports = {
   validateEmployee,
};
