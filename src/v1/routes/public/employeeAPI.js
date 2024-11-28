const express = require("express");
const rootRouter = express.Router();
const __RESPONSE = require("../../core/errorResponse");
const __EMPLOYEE_CONTROLLER__ = require("../../controllers/employeeController");
const asyncHandler = require("../../middlewares/handleError");
const {validateEmployee, validateCreateEmployee, validateUpdateEmployee, validateDeleteEmployee} = require("../../middlewares/validates/employeeValidates");

rootRouter

.get("/getall", asyncHandler(__EMPLOYEE_CONTROLLER__.getAllEmployee))

.put("/update/:employeeId", validateUpdateEmployee, asyncHandler(__EMPLOYEE_CONTROLLER__.updateEmployee))
.get("/getbyid", validateEmployee, asyncHandler(__EMPLOYEE_CONTROLLER__.getEmployeeByIdE))
.post("/create", validateCreateEmployee, asyncHandler(__EMPLOYEE_CONTROLLER__.createEmployee))
.delete("/delete/:employeeId", validateDeleteEmployee, asyncHandler(__EMPLOYEE_CONTROLLER__.deleteEmployee));

module.exports = rootRouter;
