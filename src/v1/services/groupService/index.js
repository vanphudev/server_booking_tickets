"use strict";
const __RESPONSE = require("../../core");
const {validationResult} = require("express-validator");
const db = require("../../models");

const getAllGroup = async () => {
   return await db.Group.findAll({
      attributes: ["group_id", "group_name", "group_description", "is_locked"],
   })
      .then((groups) => {
         if (!groups || groups.length === 0) {
            throw new __RESPONSE.NotFoundError({
               message: "Resource not found - Groups not found!",
               suggestion: "Please check your request",
            });
         }
         return {groups, total: groups.length};
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Error in finding all groups",
            suggestion: "Please check your request",
         });
      });
};

const getGroupById = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed: " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const groupId = req.query.groupId; // Thêm dòng này để lấy groupId từ query

   return await db.Group.findOne({
      where: {group_id: groupId},
      attributes: ["group_id", "group_name", "group_description", "is_locked"],
   })
      .then((group) => {
         if (!group) {
            throw new __RESPONSE.NotFoundError({
               message: "Resource not found - Group not found!",
               suggestion: "Please check your request",
            });
         }
         return {group};
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Error in finding group: " + error.message,
            suggestion: "Please check your request",
         });
      });
};

const createGroup = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed: " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const {name, description, locked} = req.body;
   return await db.Group.create({
      group_name: name,
      group_description: description,
      is_locked: locked || 0,
   })
      .then((group) => {
         if (!group) {
            throw new __RESPONSE.BadRequestError({
               message: "Error in creating group",
               suggestion: "Please check your request",
               request: req,
            });
         }
         return {group};
      })
      .catch((error) => {
         if (error.original?.code === "ER_DUP_ENTRY") {
            throw new __RESPONSE.BadRequestError({
               message: "Group name already exists: " + error.original.sqlMessage,
               suggestion: "Please use different group name",
               request: req,
            });
         }
         throw new __RESPONSE.BadRequestError({
            message: "Error in creating group: " + error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};

const updateGroup = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed: " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const {id} = req.params;
   const {name, description, locked} = req.body;

   const group = await db.Group.findOne({
      where: {group_id: id},
   });

   if (!group) {
      throw new __RESPONSE.NotFoundError({
         message: "Resource not found - Group not found!",
         suggestion: "Please check your request",
         request: req,
      });
   }

   return await group
      .update({
         group_name: name || group.group_name,
         group_description: description || group.group_description,
         is_locked: locked !== undefined ? (locked ? 1 : 0) : group.is_locked, // Chuyển boolean sang 0/1
      })
      .then((updatedGroup) => {
         return {group: updatedGroup};
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Error in updating group: " + error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};
const deleteGroup = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed: " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const {id} = req.params;

   const group = await db.Group.findOne({
      where: {group_id: id},
   });

   if (!group) {
      throw new __RESPONSE.NotFoundError({
         message: "Resource not found - Group not found!",
         suggestion: "Please check your request",
         request: req,
      });
   }

   return await group
      .destroy()
      .then(() => {
         return {message: "Group deleted successfully"};
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Error in deleting group: " + error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};

module.exports = {
   getAllGroup,
   getGroupById,
   createGroup,
   updateGroup,
   deleteGroup,
};