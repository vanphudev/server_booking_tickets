"use strict";

const __RESPONSE = require("../../core");
const {createTypeArticle, getArticleTypeById, getAllArticleTypes, deleteTypeArticle} = require("../../services/typeArticleService");

const __TYPE_ARTICLE_CONTROLLER = {
    createTypeArticle: async (req, res, next) => {
      new __RESPONSE.CREATED({
         message: "Create new type article",
         metadata: await createTypeArticle(req),
         request: req,
      }).send(res);
   },
   getAllArticleTypes: async (req, res, next) => {
      try {
          const articleTypes = await getAllArticleTypes(); 
          new __RESPONSE.OK({
              message: "Retrieved all Article Types",
              metadata: articleTypes,
              request: req,
          }).send(res);
      } catch (error) {
          console.error("Error retrieving Article Types:", error);
          res.status(500).json({
              error: true,
              message: "Internal Server Error",
              details: error.message,
          });
      }
  },

  getArticleTypeById: async (req, res, next) => {
      try {
         const { id } = req.params;
         const articleType = await getArticleTypeById(id); 

         new __RESPONSE.OK({
            message: "Retrieved Article Type",
            metadata: articleType,
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error retrieving Article Type:", error);
         res.status(500).json({
            error: true,
            message: "Internal Server Error",
            details: error.message,
         });
      }
   },
   deleteTypeArticle: async (req, res, next) => {
      try {
         new __RESPONSE.DELETE({
            message: "Delete type artiacle",
            metadata: await deleteTypeArticle(req),
            request: req,
         }).send(res);
      } catch (error) {
         next(error);
      }
   },
};

module.exports = __TYPE_ARTICLE_CONTROLLER;
