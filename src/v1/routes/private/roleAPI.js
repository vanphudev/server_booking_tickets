const express = require("express");
const rootRouter = express.Router();

const __ROLE_CONTROLLER = require("../../controllers/roleController");
const asyncHandler = require("../../middlewares/handleError");
const {
   validateCreateRole,
   validateUpdateRole,
   validateRoleWithIdInQuery,
   validateDeleteRole
} = require("../../middlewares/validates/roleValidates");

rootRouter.post("/create", validateCreateRole, asyncHandler(__ROLE_CONTROLLER.createRole));
rootRouter.put("/update/:id", validateUpdateRole, asyncHandler(__ROLE_CONTROLLER.updateRole));
rootRouter.delete("/delete/:id", validateDeleteRole, asyncHandler(__ROLE_CONTROLLER.deleteRole));
rootRouter.get("/all", asyncHandler(__ROLE_CONTROLLER.getAllRoles));
rootRouter.get("/getbyid", validateRoleWithIdInQuery, asyncHandler(__ROLE_CONTROLLER.getRoleById));

module.exports = rootRouter;
