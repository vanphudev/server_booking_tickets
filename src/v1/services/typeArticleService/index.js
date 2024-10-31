"use strict";
const __RESPONSE = require("../../core");
const db = require("../../models");
const validator = require("validator");


const getAllArticleTypes = async () => {
    const articleTypes = await db.ArticleType.findAll();
    return articleTypes;
 };
 
const getArticleTypeById = async (id) => {
    const articleTypes = await db.ArticleType.findByPk(id);
    if (!articleTypes) {
        throw new Error("Vehicle Type not found");
    }
    return articleTypes;
 };
const createTypeArticle = async (req) => {
    const {title, field, highlight} = req.body;
 
    if (![0, 1].includes(highlight)) {
       throw new Error("Highlight field must be 0 or 1.");
    }
 
    try {
       const typeArticle = await db.ArticleType.create({
          article_title: title,
          article_field: field,
          is_highlight: highlight,
       });
       return {
          id: typeArticle.article_type_id,
          title: typeArticle.article_title,
          field: typeArticle.article_field,
          highlight: typeArticle.is_highlight,
       };
    } catch (error) {
       if (error.name === "SequelizeUniqueConstraintError") {
          throw new Error("The title or field already exists.");
       }
       throw error;
    }
 };
 
// Xóa 
const deleteTypeArticle = async (req) => {
   const { id } = req.params;

   if (!id) {
      return { status: 400, error: true, reason: "ID is required." };
   }

   const typeArticle = await db.ArticleType.findByPk(id);
   if (!typeArticle) {
      return { status: 404, error: true, reason: "Type article not found." };
   }

   await typeArticle.destroy();

   return {
      status: 200,
      error: false,
      message: "Type article deleted successfully.",
   };
};
module.exports = {
    createTypeArticle,
    getAllArticleTypes,
    getArticleTypeById,
    deleteTypeArticle
   
};
