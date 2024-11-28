"use strict";
const __RESPONSE = require("../../core");
const {validationResult} = require("express-validator");
const db = require("../../models");

const getAllTags = async () => {
   return await db.Tag.findAll({
      attributes: ["tag_id", "tag_name", "tag_description"],
   })
      .then((tags) => {
         if (!tags || tags.length === 0) {
            throw new __RESPONSE.NotFoundError({
               message: "Resource not found - Tags not found!",
               suggestion: "Please check your request",
            });
         }
         return {tags, total: tags.length};
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Error in finding all tags",
            suggestion: "Please check your request",
         });
      });
};

const getTagById = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed: " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const {tagId} = req.query;
   return await db.Tag.findOne({
      where: {tag_id: tagId},
      attributes: ["tag_id", "tag_name", "tag_description"],
   })
      .then((tag) => {
         if (!tag) {
            throw new __RESPONSE.NotFoundError({
               message: "Resource not found - Tag not found!",
               suggestion: "Please check your request",
            });
         }
         return {tag};
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Error in finding tag: " + error.message,
            suggestion: "Please check your request",
         });
      });
};

const createTag = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed: " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const {tag_name, tag_description} = req.body;
   return await db.Tag.create({
      tag_name,
      tag_description,
   })
      .then((tag) => {
         if (!tag) {
            throw new __RESPONSE.BadRequestError({
               message: "Error in creating tag",
               suggestion: "Please check your request",
               request: req,
            });
         }
         return {tag};
      })
      .catch((error) => {
         if (error.original?.code === "ER_DUP_ENTRY") {
            throw new __RESPONSE.BadRequestError({
               message: "Tag name already exists: " + error.original.sqlMessage,
               suggestion: "Please use different tag name",
               request: req,
            });
         }
         throw new __RESPONSE.BadRequestError({
            message: "Error in creating tag: " + error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};

const updateTag = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed: " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const tag_id = parseInt(req.params.id);
   const {tag_name, tag_description} = req.body;

   const tag = await db.Tag.findOne({
      where: {tag_id},
   });

   if (!tag) {
      throw new __RESPONSE.NotFoundError({
         message: "Resource not found - Tag not found!",
         suggestion: "Please check your request",
         request: req,
      });
   }

   return await tag
      .update({
         tag_name: tag_name || tag.tag_name,
         tag_description: tag_description || tag.tag_description,
      })
      .then((updatedTag) => {
         return {tag: updatedTag};
      })
      .catch((error) => {
         if (error.original?.code === "ER_DUP_ENTRY") {
            throw new __RESPONSE.BadRequestError({
               message: "Tag name already exists: " + error.original.sqlMessage,
               suggestion: "Please use different tag name",
               request: req,
            });
         }
         throw new __RESPONSE.BadRequestError({
            message: "Error in updating tag: " + error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};

const deleteTag = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed: " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const tag_id = parseInt(req.params.id);

   const tag = await db.Tag.findOne({
      where: {tag_id},
   });

   if (!tag) {
      throw new __RESPONSE.NotFoundError({
         message: "Resource not found - Tag not found!",
         suggestion: "Please check your request",
         request: req,
      });
   }

   return await tag
      .destroy()
      .then(() => {
         return {message: "Tag deleted successfully"};
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Error in deleting tag: " + error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};

module.exports = {
   getAllTags,
   getTagById,
   createTag,
   updateTag,
   deleteTag,
};