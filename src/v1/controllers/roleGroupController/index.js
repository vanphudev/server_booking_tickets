"use strict";

const __RESPONSE = require("../../core");
const {
   getAllRoleGroup,
   getRoleGroupById,
   createRoleGroup,
   updateRoleGroup,
   deleteRoleGroup,
} = require("../../services/roleGroupService");

const __ROLE_GROUP_CONTROLLER = {
   getAllRoleGroup: async (req, res, next) => {
      try {
         new __RESPONSE.GET({
            message: "List of all role groups",
            metadata: await getAllRoleGroup(),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error finding role groups:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },

   getRoleGroupById: async (req, res, next) => {
      try {
         new __RESPONSE.GET({
            message: "Role group details",
            metadata: await getRoleGroupById(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error finding role group by ID:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },

   createRoleGroup: async (req, res, next) => {
      try {
         new __RESPONSE.CREATED({
            message: "Role group created successfully",
            metadata: await createRoleGroup(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error creating role group:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },

   updateRoleGroup: async (req, res, next) => {
      try {
         new __RESPONSE.OK({
            message: "Role group updated successfully",
            metadata: await updateRoleGroup(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error updating role group:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },

   deleteRoleGroup: async (req, res, next) => {
      try {
         new __RESPONSE.DELETE({
            message: "Role group deleted successfully",
            metadata: await deleteRoleGroup(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error deleting role group:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },
};

module.exports = __ROLE_GROUP_CONTROLLER;