"use strict";

const __RESPONSE = require("../../core");
const {getAllGroup, getGroupById, createGroup, updateGroup, deleteGroup} = require("../../services/groupService");

const __GROUP_CONTROLLER = {
   getAllGroup: async (req, res, next) => {
      try {
         new __RESPONSE.GET({
            message: "List of all groups",
            metadata: await getAllGroup(),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error finding groups:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },

   getGroupById: async (req, res, next) => {
      try {
         new __RESPONSE.GET({
            message: "Group details",
            metadata: await getGroupById(req), // Truyền toàn bộ req object
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error finding group by ID:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },

   createGroup: async (req, res, next) => {
      try {
         new __RESPONSE.CREATED({
            message: "Group created successfully",
            metadata: await createGroup(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error creating group:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },

   updateGroup: async (req, res, next) => {
      try {
         new __RESPONSE.OK({
            message: "Group updated successfully",
            metadata: await updateGroup(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error updating group:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },

   deleteGroup: async (req, res, next) => {
      try {
         new __RESPONSE.DELETE({
            message: "Group deleted successfully",
            metadata: await deleteGroup(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error deleting group:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },
};

module.exports = __GROUP_CONTROLLER;
