const express = require("express");
const rootRouter = express.Router();

const __TYPE_ARTICLE_CONTROLLER = require("../../controllers/articleTypeController");
const asyncHandler = require("../../middlewares/handleError");

rootRouter.post("/create", asyncHandler(__TYPE_ARTICLE_CONTROLLER.createTypeArticle));
rootRouter.get("/all", asyncHandler(__TYPE_ARTICLE_CONTROLLER.getAllArticleTypes));
rootRouter.get("/:id", asyncHandler(__TYPE_ARTICLE_CONTROLLER.getArticleTypeById));
rootRouter.delete("/delete/:id", asyncHandler(__TYPE_ARTICLE_CONTROLLER.deleteTypeArticle));

module.exports = rootRouter;
