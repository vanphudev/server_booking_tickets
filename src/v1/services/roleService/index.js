"use strict";
const __RESPONSE = require("../../core");
const {validationResult} = require("express-validator");
const db = require("../../models");

const getAllRoles = async () => {
   return await db.Role.findAll({
      attributes: ["role_id", "role_name", "role_description", "role_value_url", "is_locked"],
      where: {is_locked: 0}, // Chỉ lấy role chưa bị khóa
   })
      .then((roles) => {
         if (!roles || roles.length === 0) {
            throw new __RESPONSE.NotFoundError({
               message: "Resource not found - Roles not found!",
               suggestion: "Please check your request",
            });
         }
         return {roles, total: roles.length};
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Error in finding all roles",
            suggestion: "Please check your request",
         });
      });
};

const getRoleById = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed: " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const {roleId} = req.query;
   return await db.Role.findOne({
      where: {role_id: roleId},
      attributes: ["role_id", "role_name", "role_description", "role_value_url", "is_locked"],
   })
      .then((role) => {
         if (!role) {
            throw new __RESPONSE.NotFoundError({
               message: "Resource not found - Role not found!",
               suggestion: "Please check your request",
            });
         }
         return {role};
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Error in finding role: " + error.message,
            suggestion: "Please check your request",
         });
      });
};

const createRole = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed: " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const {role_name, role_description, role_value_url} = req.body;
   return await db.Role.create({
      role_name,
      role_description,
      role_value_url,
      is_locked: 0,
   })
      .then((role) => {
         if (!role) {
            throw new __RESPONSE.BadRequestError({
               message: "Error in creating role",
               suggestion: "Please check your request",
               request: req,
            });
         }
         return {role};
      })
      .catch((error) => {
         if (error.original?.code === "ER_DUP_ENTRY") {
            throw new __RESPONSE.BadRequestError({
               message: "Role or URL path already exists: " + error.original.sqlMessage,
               suggestion: "Please use different role name or URL path",
               request: req,
            });
         }
         throw new __RESPONSE.BadRequestError({
            message: "Error in creating role: " + error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};
const updateRole = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed: " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   // Lấy id từ params và convert sang number
   const role_id = parseInt(req.params.id);
   const {role_name, role_description, role_value_url} = req.body;

   // Kiểm tra role tồn tại
   const role = await db.Role.findOne({
      where: {role_id: role_id}, // Đảm bảo role_id là number
   });

   if (!role) {
      throw new __RESPONSE.NotFoundError({
         message: "Resource not found - Role not found!",
         suggestion: "Please check your request",
         request: req,
      });
   }

   if (role.is_locked) {
      throw new __RESPONSE.BadRequestError({
         message: "Role is locked and cannot be updated",
         suggestion: "Please unlock the role first",
         request: req,
      });
   }

   return await role
      .update({
         role_name: role_name || role.role_name,
         role_description: role_description || role.role_description,
         role_value_url: role_value_url || role.role_value_url,
      })
      .then((updatedRole) => {
         return {role: updatedRole};
      })
      .catch((error) => {
         if (error.original?.code === "ER_DUP_ENTRY") {
            throw new __RESPONSE.BadRequestError({
               message: "Role or URL path already exists: " + error.original.sqlMessage,
               suggestion: "Please use different role name or URL path",
               request: req,
            });
         }
         throw new __RESPONSE.BadRequestError({
            message: "Error in updating role: " + error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};
const deleteRole = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed: " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const role_id = parseInt(req.params.id);

   const role = await db.Role.findOne({
      where: {role_id},
   });

   if (!role) {
      throw new __RESPONSE.NotFoundError({
         message: "Resource not found - Role not found!",
         suggestion: "Please check your request",
         request: req,
      });
   }

   if (role.is_locked) {
      throw new __RESPONSE.BadRequestError({
         message: "Role is locked and cannot be deleted",
         suggestion: "Please unlock the role first",
         request: req,
      });
   }

   return await role
      .destroy()
      .then(() => {
         return {message: "Role deleted successfully"};
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Error in deleting role: " + error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};
const findAllRoles = async () => {
   return await db.Role.findAll({
      attributes: ["role_id", "role_name", "role_description", "role_value_url", "is_locked"],
   })
      .then((roles) => {
         if (!roles || roles.length === 0) {
            throw new __RESPONSE.NotFoundError({
               message: "Resource not found - Roles not found!",
               suggestion: "Please check your request",
            });
         }
         return {roles, total: roles.length};
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Error in finding all roles",
            suggestion: "Please check your request",
         });
      });
};

module.exports = {
   getAllRoles,
   getRoleById,
   createRole,
   updateRole,
   deleteRole,
   findAllRoles,
};
