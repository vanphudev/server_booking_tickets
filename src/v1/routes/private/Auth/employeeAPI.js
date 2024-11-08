const express = require("express");
const employeeRouter = express.Router();
const asyncHandler = require("../../../middlewares/handleError");
const __EMPLOYEE_CONTROLLER__ = require("../../../controllers/employeeController");
const {validateEmployee} = require("../../../middlewares/validates/employeeValidates");

employeeRouter.get(
   "/get-employee-by-id/:employeeId",
   validateEmployee,
   asyncHandler(__EMPLOYEE_CONTROLLER__.getEmployeeById)
);
employeeRouter.post("/signout", asyncHandler(__EMPLOYEE_CONTROLLER__.logOut));

module.exports = employeeRouter;
