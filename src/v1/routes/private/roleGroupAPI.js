const express = require("express");
const rootRouter = express.Router();

const __ROLE_GROUP_CONTROLLER = require("../../controllers/roleGroupController");
const asyncHandler = require("../../middlewares/handleError");
const {
    validateCreateRoleGroup,
    validateUpdateRoleGroup,
    validateRoleGroupWithIdsInQuery,
    validateDeleteRoleGroup
} = require("../../middlewares/validates/roleGroupValidates");

rootRouter.post("/create", 
    validateCreateRoleGroup, 
    asyncHandler(__ROLE_GROUP_CONTROLLER.createRoleGroup)
);

rootRouter.put("/update/:oldRoleId/:oldGroupId", 
    validateUpdateRoleGroup, 
    asyncHandler(__ROLE_GROUP_CONTROLLER.updateRoleGroup)
);

rootRouter.delete("/delete/:roleId/:groupId", 
    validateDeleteRoleGroup, 
    asyncHandler(__ROLE_GROUP_CONTROLLER.deleteRoleGroup)
);

rootRouter.get("/all", 
    asyncHandler(__ROLE_GROUP_CONTROLLER.getAllRoleGroup)
);

rootRouter.get("/getbyid", 
    validateRoleGroupWithIdsInQuery, 
    asyncHandler(__ROLE_GROUP_CONTROLLER.getRoleGroupById)
);

module.exports = rootRouter;