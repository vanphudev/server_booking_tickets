"use strict";
const __RESPONSE = require("../../core");
const {validationResult} = require("express-validator");
const db = require("../../models");
const {handleUpload, deleteImage} = require("../../utils/uploadImages");
const {normalizeVietnameseString} = require("../../utils/normalizeVietnameseString");
const __ARTICLE_IMAGE_FOLDER = "article_images";  
const getArticleByArticleId = async (req) => {
   const {articleId} = req.params;
   
   if (!articleId) {
      throw new __RESPONSE.BadRequestError({
         message: "Article ID is required",
         suggestion: "Please provide article ID in URL params",
         request: req,
      });
   }

   const article = await db.Article.findOne({
      where: {article_id: articleId},
      attributes: ["article_id", "article_title"],
   });

   if (!article) {
      throw new __RESPONSE.NotFoundError({
         message: "Article not found with id " + articleId,
         suggestion: "Please check article ID",
         request: req,
      });
   }

   return article;
};

const createArticleImage = async (req) => {
   const article = req.article; 
   const uploadedImages = req.uploadedImages;

   if (!uploadedImages || uploadedImages.length === 0) {
      throw new __RESPONSE.BadRequestError({
         message: "No images uploaded",
         suggestion: "Please upload at least one image",
         request: req,
      });
   }

   try {
      const result = await db.sequelize.transaction(async (transaction) => {
         const createdImages = await Promise.all(
            uploadedImages.map(async (image) => {
               return await db.ImageArticle.create({
                  article_id: article.article_id,
                  image_article_url: image.url,
                  image_article_public_id: image.public_id,
                  image_article_name: image.original_name,
                  image_article_description: image.original_name,
               }, {transaction});
            })
         );
         return createdImages;
      });

      return {
         article,
         images: result
      };

   } catch (error) {
      if (uploadedImages) {
         await Promise.all(
            uploadedImages.map(image => deleteImage(image.public_id))
         );
      }
      throw new __RESPONSE.BadRequestError({
         message: "Failed to create article images: " + error.message,
         suggestion: "Please try again",
         request: req,
      });
   }
};
const getAllArticleImages = async (req, res) => {
   try {
      const articleImages = await db.ImageArticle.findAll({
         attributes: [
            "image_article_id",
            "image_article_url",
            "image_article_name",
            "image_article_public_id",
            "article_id",
         ],
         include: [
            {
               model: db.Article,
               as: "imageArticle_belongto_article",  // Sửa lại alias này theo model
               attributes: ["article_id", "article_title"],
            },
         ],
         nest: true,
         raw: true,
      });

      if (!articleImages?.length) {
         throw new __RESPONSE.NotFoundError({
            message: "Không tìm thấy hình ảnh bài viết nào",
            suggestion: "Vui lòng kiểm tra lại yêu cầu",
            request: req,
         });
      }

      return {
         articleImages,
         total: articleImages.length,
      };
   } catch (error) {
      if (error instanceof __RESPONSE.NotFoundError) {
         throw error;
      }

      throw new __RESPONSE.BadRequestError({
         message: `Lỗi khi lấy danh sách hình ảnh: ${error.message}`,
         suggestion: "Vui lòng kiểm tra lại yêu cầu",
         request: req,
      });
   }
};
const deleteArticleImage = async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const { articleImageId } = req.query;

   try {
      const articleImage = await db.ImageArticle.findOne({
         where: { image_article_id: articleImageId },
         include: [
            {
               model: db.Article,
               as: "imageArticle_belongto_article",
               attributes: ["article_id", "article_title"],
            },
         ],
      });

      if (!articleImage) {
         throw new __RESPONSE.NotFoundError({
            message: "Không tìm thấy hình ảnh với ID " + articleImageId,
            suggestion: "Vui lòng kiểm tra lại ID hình ảnh",
            request: req,
         });
      }

      if (articleImage.image_article_public_id) {
         try {
            await deleteImage(articleImage.image_article_public_id);
         } catch (cloudError) {
            console.error("Lỗi khi xóa ảnh trên cloud:", cloudError);
           
         }
      }

      // Xóa record trong database
      await articleImage.destroy();

      return {
         deletedImage: {
            image_article_id: articleImage.image_article_id,
            image_article_url: articleImage.image_article_url,
            image_article_name: articleImage.image_article_name,
            article: articleImage.imageArticle_belongto_article
         }
      };

   } catch (error) {
      if (error instanceof __RESPONSE.NotFoundError) {
         throw error;
      }

      throw new __RESPONSE.BadRequestError({
         message: "Lỗi khi xóa hình ảnh: " + error.message,
         suggestion: "Vui lòng thử lại",
         request: req,
      });
   }
};


module.exports = {
   createArticleImage,
   getArticleByArticleId,
   getAllArticleImages,
   deleteArticleImage
};