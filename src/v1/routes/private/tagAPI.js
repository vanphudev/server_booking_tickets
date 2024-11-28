const express = require("express");
const rootRouter = express.Router();

const __TAG_CONTROLLER = require("../../controllers/tagController");
const asyncHandler = require("../../middlewares/handleError");
const {
   validateCreateTag,
   validateUpdateTag,
   validateTagWithIdInQuery,
   validateDeleteTag
} = require("../../middlewares/validates/tagValidates");

rootRouter.post("/create", validateCreateTag, asyncHandler(__TAG_CONTROLLER.createTag));
rootRouter.put("/update/:id", validateUpdateTag, asyncHandler(__TAG_CONTROLLER.updateTag));
rootRouter.delete("/delete/:id", validateDeleteTag, asyncHandler(__TAG_CONTROLLER.deleteTag));
rootRouter.get("/all", asyncHandler(__TAG_CONTROLLER.getAllTags));
rootRouter.get("/getbyid", validateTagWithIdInQuery, asyncHandler(__TAG_CONTROLLER.getTagById));

module.exports = rootRouter;