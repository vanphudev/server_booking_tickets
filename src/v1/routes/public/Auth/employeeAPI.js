const express = require("express");
const employeeRouter = express.Router();
const asyncHandler = require("../../../middlewares/handleError");
const __EMPLOYEE_CONTROLLER__ = require("../../../controllers/employeeController");
const {validateSignIn} = require("../../../middlewares/validates/validateSignIn");
const {validateRefreshToken} = require("../../../middlewares/validates/validateRefreshToken");

employeeRouter.post("/signin", validateSignIn, asyncHandler(__EMPLOYEE_CONTROLLER__.signIn));
employeeRouter.post("/refresh-token", validateRefreshToken, asyncHandler(__EMPLOYEE_CONTROLLER__.handlerRefreshToken));

module.exports = employeeRouter;
