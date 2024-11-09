"use strict";

const __RESPONSE = require("../../core");
const {
   getAllTags,
   getTagById,
   createTag,
   updateTag,
   deleteTag,
} = require("../../services/tagService");

const __TAG_CONTROLLER = {
   getAllTags: async (req, res, next) => {
      try {
         new __RESPONSE.GET({
            message: "List of all tags",
            metadata: await getAllTags(),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error finding tags:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },

   getTagById: async (req, res, next) => {
      try {
         new __RESPONSE.GET({
            message: "Tag details",
            metadata: await getTagById(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error finding tag by ID:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },

   createTag: async (req, res, next) => {
      try {
         new __RESPONSE.CREATED({
            message: "Tag created successfully",
            metadata: await createTag(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error creating tag:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },

   updateTag: async (req, res, next) => {
      try {
         new __RESPONSE.OK({
            message: "Tag updated successfully",
            metadata: await updateTag(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error updating tag:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },

   deleteTag: async (req, res, next) => {
      try {
         new __RESPONSE.DELETE({
            message: "Tag deleted successfully",
            metadata: await deleteTag(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error deleting tag:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },
};

module.exports = __TAG_CONTROLLER;