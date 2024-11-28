const express = require("express");
const employeeRouter = express.Router();
const asyncHandler = require("../../../middlewares/handleError");
const __EMPLOYEE_CONTROLLER__ = require("../../../controllers/employeeController");
const {validateEmployee, validateCreateEmployee, validateUpdateEmployee, validateDeleteEmployee} = require("../../../middlewares/validates/employeeValidates");

employeeRouter.get(
   "/get-employee-by-id/:employeeId",
   validateEmployee,
   asyncHandler(__EMPLOYEE_CONTROLLER__.getEmployeeById)
);
employeeRouter.post("/signout", asyncHandler(__EMPLOYEE_CONTROLLER__.logOut));

employeeRouter.get("/getall", asyncHandler(__EMPLOYEE_CONTROLLER__.getAllEmployee));

employeeRouter.put("/update/:employeeId", validateUpdateEmployee, asyncHandler(__EMPLOYEE_CONTROLLER__.updateEmployee))
employeeRouter.get("/getbyid", validateEmployee, asyncHandler(__EMPLOYEE_CONTROLLER__.getEmployeeByIdE))
employeeRouter.post("/create", validateCreateEmployee, asyncHandler(__EMPLOYEE_CONTROLLER__.createEmployee))
employeeRouter.delete("/delete/:employeeId", validateDeleteEmployee, asyncHandler(__EMPLOYEE_CONTROLLER__.deleteEmployee));
module.exports = employeeRouter;
