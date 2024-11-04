const express = require("express");
const rootRouter = express.Router();
const __ARTICLE_IMAGE_CONTROLLER = require("../../controllers/articleImageController");
const asyncHandler = require("../../middlewares/handleError");
const {validateCreateArticleImage, validateArticleImageWithByIDToQuery} = require("../../middlewares/validates/articleImageValidates");
const {createUploadMiddleware} = require("../../utils/uploadImages");

const __FOLDER__ = "article_images";
const __MAX_FILES__ = 5;

const articleImageUpload = createUploadMiddleware({
   maxFiles: __MAX_FILES__,
   customFolder: __FOLDER__,
});

rootRouter
   .post(
      "/create/:articleId",
      asyncHandler(__ARTICLE_IMAGE_CONTROLLER.getArticleByArticleId),
      articleImageUpload,
      asyncHandler(__ARTICLE_IMAGE_CONTROLLER.createArticleImage)
   )
   .get(
      "/getall", 
      asyncHandler(__ARTICLE_IMAGE_CONTROLLER.getAllArticleImages)
   )
   .delete(
      "/delete",
      validateArticleImageWithByIDToQuery,
      asyncHandler(__ARTICLE_IMAGE_CONTROLLER.deleteArticleImage)
   );
module.exports = rootRouter;