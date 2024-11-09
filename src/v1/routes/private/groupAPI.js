const express = require("express");
const rootRouter = express.Router();

const __GROUP_CONTROLLER = require("../../controllers/groupController");
const asyncHandler = require("../../middlewares/handleError");
const {
   validateCreateGroup,
   validateUpdateGroup,
   validateGroupWithIdInQuery,
   validateDeleteGroup
} = require("../../middlewares/validates/groupValidates");

rootRouter.post("/create", validateCreateGroup, asyncHandler(__GROUP_CONTROLLER.createGroup));
rootRouter.put("/update/:id", validateUpdateGroup, asyncHandler(__GROUP_CONTROLLER.updateGroup));
rootRouter.delete("/delete/:id", validateDeleteGroup, asyncHandler(__GROUP_CONTROLLER.deleteGroup));
rootRouter.get("/all", asyncHandler(__GROUP_CONTROLLER.getAllGroup));
rootRouter.get("/getbyid", validateGroupWithIdInQuery, asyncHandler(__GROUP_CONTROLLER.getGroupById));

module.exports = rootRouter;