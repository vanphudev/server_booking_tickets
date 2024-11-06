"use strict";
const __RESPONSE = require("../../core");
const {validationResult} = require("express-validator");
const db = require("../../models");

const getAllArticle = async (req) => {
   try {
      const articles = await db.Article.findAll({
         attributes: [
            "article_id",
            "article_title",
            "article_description",
            "article_content",
            "article_slug",
            "published_at",
            "is_priority",
            "article_type_id",
            "employee_id",
            "thumbnail_img",
            "thumbnail_img_public_id",
         ],
         include: [
            {
               model: db.ImageArticle,
               as: "article_to_imageArticle",
               attributes: ["image_article_id", "image_article_name", "image_article_url"],
            },
         ],
         nest: true,
         raw: true,
      });

      if (!articles || articles.length === 0) {
         throw new __RESPONSE.NotFoundError({
            message: "No articles found",
            suggestion: "Please check if there are any articles in the database",
            request: req,
         });
      }

      return {
         articles,
         total: articles.length,
      };
   } catch (error) {
      throw new __RESPONSE.BadRequestError({
         message: `Error in getting all articles: ${error.message}`,
         suggestion: "Please check database connection and Article model",
         request: req,
      });
   }
};
const getArticleById = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed " + errors.array()[0]?.msg + " !",
            suggestion: "Please provide the correct data",
            request: req,
         });
      }

      const {article_id} = req.query;

      const article = await db.Article.findOne({
         where: {
            article_id: article_id,
         },
         attributes: [
            "article_id",
            "article_title",
            "article_description",
            "article_content",
            "article_slug",
            "published_at",
            "is_priority",
            "article_type_id",
            "employee_id",
            "thumbnail_img",
            "thumbnail_img_public_id",
         ],
         include: [
            {
               model: db.ImageArticle,
               as: "article_to_imageArticle", // Sửa alias này cho khớp với model
               attributes: ["image_article_id", "image_article_name", "image_article_url"],
            },
         ],
         nest: true,
         raw: true,
      });

      if (!article) {
         throw new __RESPONSE.NotFoundError({
            message: "Resource not found - article not found !",
            suggestion: "Please check your request",
            request: req,
         });
      }

      return {article};
   } catch (error) {
      if (error instanceof __RESPONSE.NotFoundError) {
         throw error;
      }
      throw new __RESPONSE.BadRequestError({
         message: "Error in getting article by id: " + error.message,
         suggestion: "Please check your request",
         request: req,
      });
   }
};
const createArticle = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed " + errors.array()[0]?.msg + " !",
            suggestion: "Please provide the correct data",
            request: req,
         });
      }

      const {
         article_title,
         article_description,
         article_content,
         article_slug,
         published_at,
         is_priority,
         article_type_id,
         employee_id,
         thumbnail_img,
         thumbnail_img_public_id,
      } = req.body;

      const article = await db.Article.create({
         article_title,
         article_description,
         article_content,
         article_slug,
         published_at: published_at || new Date(),
         is_priority: is_priority || 0,
         article_type_id,
         employee_id,
         thumbnail_img,
         thumbnail_img_public_id,
      });

      if (!article) {
         throw new __RESPONSE.BadRequestError({
            message: "Error in creating article",
            suggestion: "Please check your request",
            request: req,
         });
      }

      return {article};
   } catch (error) {
      if (error.original?.code === "ER_DUP_ENTRY") {
         throw new __RESPONSE.BadRequestError({
            message: "Article already exists: " + error.original.sqlMessage,
            suggestion: "Article title or slug might be duplicate. Please check and try again",
            request: req,
         });
      }
      throw new __RESPONSE.BadRequestError({
         message: "Error in creating article: " + error.message,
         suggestion: "Please check your request data",
         request: req,
      });
   }
};

const updateArticle = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed " + errors.array()[0]?.msg + " !",
            suggestion: "Please provide the correct data",
            request: req,
         });
      }

      const {article_id} = req.query;
      const {
         article_title,
         article_description,
         article_content,
         article_slug,
         published_at,
         is_priority,
         article_type_id,
         employee_id,
         thumbnail_img,
         thumbnail_img_public_id,
      } = req.body;

      // Kiểm tra article có tồn tại không
      const existingArticle = await db.Article.findByPk(article_id);
      if (!existingArticle) {
         throw new __RESPONSE.NotFoundError({
            message: "Article not found",
            suggestion: "Please check article ID",
            request: req,
         });
      }

      const [updatedRows] = await db.Article.update(
         {
            article_title,
            article_description,
            article_content,
            article_slug,
            published_at,
            is_priority,
            article_type_id,
            employee_id,
            thumbnail_img,
            thumbnail_img_public_id,
         },
         {
            where: {article_id},
            returning: true,
         }
      );

      if (updatedRows === 0) {
         throw new __RESPONSE.BadRequestError({
            message: "Error updating article",
            suggestion: "Please check your request data",
            request: req,
         });
      }

      const updatedArticle = await db.Article.findByPk(article_id, {
         include: [
            {
               model: db.ImageArticle,
               as: "article_to_imageArticle",
               attributes: ["image_article_id", "image_article_name", "image_article_url"],
            },
         ],
      });

      return {article: updatedArticle};
   } catch (error) {
      if (error.original?.code === "ER_DUP_ENTRY") {
         throw new __RESPONSE.BadRequestError({
            message: "Article already exists: " + error.original.sqlMessage,
            suggestion: "Article title or slug might be duplicate. Please check and try again",
            request: req,
         });
      }
      throw new __RESPONSE.BadRequestError({
         message: "Error in updating article: " + error.message,
         suggestion: "Please check your request data",
         request: req,
      });
   }
};
const deleteArticle = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const {article_id} = req.query;
   const article = await db.Article.findOne({
      where: {
         article_id: article_id,
      },
   });

   if (!article) {
      throw new __RESPONSE.NotFoundError({
         message: "Resource not found - Article not found !",
         suggestion: "Please check your request",
         request: req,
      });
   }

   return await article
      .destroy()
      .then((article) => {
         if (!article) {
            throw new __RESPONSE.NotFoundError({
               message: "Resource not found - Article not found !",
               suggestion: "Please check your request",
               request: req,
            });
         }
         return {article};
      })
      .catch((error) => {
         if (error.original && error.original.code === "ER_ROW_IS_REFERENCED_2") {
            throw new __RESPONSE.BadRequestError({
               message: "Article is referenced by other tables (ImageArticle, ArticleTag)",
               suggestion: "Please remove related records first",
               request: req,
            });
         }
         throw new __RESPONSE.BadRequestError({
            message: "Error in deleting article",
            suggestion: "Please check your request",
            request: req,
         });
      });
};

const findAllDeletedArticle = async (req) => {
   return await db.Article.findAll({
      attributes: [
         "article_id",
         "article_title",
         "article_description",
         "article_content",
         "article_slug",
         "published_at",
         "is_priority",
         "article_type_id",
         "employee_id",
         "thumbnail_img",
         "thumbnail_img_public_id",
         "deleted_at",
      ],
      where: {
         deleted_at: {[db.Sequelize.Op.ne]: null},
      },
      order: [["deleted_at", "DESC"]],
      include: [
         {
            model: db.ImageArticle,
            as: "article_to_imageArticle",
            attributes: ["image_article_id", "image_article_name", "image_article_url"],
         },
      ],
      paranoid: false,
      nest: true,
      raw: true,
   })
      .then((articles) => {
         if (!articles || articles.length === 0) {
            throw new __RESPONSE.NotFoundError({
               message: "No deleted articles found",
               suggestion: "The deleted articles list is empty",
               request: req,
            });
         }
         return {
            articles,
            total: articles.length,
         };
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Error in finding deleted articles: " + error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};
module.exports = {
   getAllArticle,
   getArticleById,
   createArticle,
   updateArticle,
   findAllDeletedArticle,
   deleteArticle,
};
