const express = require("express");
const rootRouter = express.Router();
const __RESPONSE = require("../../core/errorResponse");
const __ARTICLE_CONTROLLER = require("../../controllers/articleController");
const asyncHandler = require("../../middlewares/handleError");
const {
   validateUpdateArticle,
   validateCreateArticle,
   validateArticleWithByIDToQuery,
} = require("../../middlewares/validates/articleValidates");
const __TYPE_ARTICLE_CONTROLLER = require("../../controllers/articleTypeController");

rootRouter
   .get("/getall", asyncHandler(__ARTICLE_CONTROLLER.getAllArticle))
   .get("/getbyid", validateArticleWithByIDToQuery, asyncHandler(__ARTICLE_CONTROLLER.getArticleById))
   .post("/create", validateCreateArticle, asyncHandler(__ARTICLE_CONTROLLER.createArticle))
   .put("/update", validateUpdateArticle, asyncHandler(__ARTICLE_CONTROLLER.updateArticle))
   .delete("/delete", validateArticleWithByIDToQuery, asyncHandler(__ARTICLE_CONTROLLER.deleteArticle))
   .get("/getalldeleted", asyncHandler(__ARTICLE_CONTROLLER.findAllDeletedArticle));


module.exports = rootRouter;
