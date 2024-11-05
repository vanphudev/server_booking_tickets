"use strict";

const __RESPONSE = require("../../core");
const {   createArticleImage, getArticleByArticleId, getAllArticleImages, deleteArticleImage
} = require("../../services/articleImageService");
const __ARTICLE_IMAGE_CONTROLLER = {
   getArticleByArticleId: async (req, res, next) => {
      try {
         const article = await getArticleByArticleId(req);
         req.article = article; // Lưu article vào req
         next();
      } catch (error) {
         next(error);
      }
   },
   
   createArticleImage: async (req, res, next) => {
      try {
         const result = await createArticleImage(req);
         new __RESPONSE.CREATED({
            message: "Create article image successfully",
            metadata: result,
            request: req,
         }).send(res);
      } catch (error) {
         next(error);
      }
   },
   getAllArticleImages: async (req, res, next) => {
      new __RESPONSE.GET({
         message: "List of all article images",
         metadata: await getAllArticleImages(),
         request: req,
      }).send(res);
   },
   deleteArticleImage: async (req, res, next) => {
      new __RESPONSE.OK({
         message: "Xóa hình ảnh thành công",
         metadata: await deleteArticleImage(req),
         request: req,
      }).send(res);
   },
};
module.exports = __ARTICLE_IMAGE_CONTROLLER;
