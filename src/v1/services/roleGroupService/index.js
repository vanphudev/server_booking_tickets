"use strict";
const __RESPONSE = require("../../core");
const { validationResult } = require("express-validator");
const db = require("../../models");

const getAllRoleGroup = async () => {
   try {
      const roleGroups = await db.RoleGroup.findAll({
         attributes: [
            'role_id',
            'group_id'
         ],
         include: [
            {
               model: db.Role,
               as: 'roleGroup_belongto_Role',
               attributes: ['role_name']
            },
            {
               model: db.Group,
               as: 'roleGroup_belongto_Group',
               attributes: ['group_name']
            }
         ],
         order: [['role_id', 'ASC'], ['group_id', 'ASC']],
         where: {
            deleted_at: null
         }
      });

      return { roleGroups, total: roleGroups.length };
   } catch (error) {
      console.error("getAllRoleGroup Error:", error);
      throw new __RESPONSE.BadRequestError({
         message: "Error in finding all role groups",
         suggestion: "Please check database connection",
         details: error.message
      });
   }
};

const getRoleGroupById = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed: " + errors.array()[0]?.msg,
            suggestion: "Please provide the correct data",
         });
      }

      const { roleId, groupId } = req.query;
      const roleGroup = await db.RoleGroup.findOne({
         where: { 
            role_id: roleId,
            group_id: groupId,
            deleted_at: null
         },
         attributes: [
            'role_id',
            'group_id'
         ],
         include: [
            {
               model: db.Role,
               as: 'roleGroup_belongto_Role',
               attributes: ['role_name']
            },
            {
               model: db.Group,
               as: 'roleGroup_belongto_Group',
               attributes: ['group_name']
            }
         ]
      });

      if (!roleGroup) {
         throw new __RESPONSE.NotFoundError({
            message: "RoleGroup not found",
            suggestion: "Please check the role ID and group ID",
         });
      }

      return { roleGroup };
   } catch (error) {
      console.error("getRoleGroupById Error:", error);
      if (error instanceof __RESPONSE.NotFoundError) throw error;
      throw new __RESPONSE.BadRequestError({
         message: "Error in finding role group",
         suggestion: "Please check your request",
         details: error.message
      });
   }
};

const createRoleGroup = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed: " + errors.array()[0]?.msg,
            suggestion: "Please provide the correct data",
         });
      }

      const { roleId, groupId } = req.body;

      // Kiểm tra role tồn tại
      const role = await db.Role.findByPk(roleId);
      if (!role) {
         throw new __RESPONSE.NotFoundError({
            message: "Role not found",
            suggestion: "Please check the role ID",
         });
      }

      // Kiểm tra group tồn tại
      const group = await db.Group.findByPk(groupId);
      if (!group) {
         throw new __RESPONSE.NotFoundError({
            message: "Group not found",
            suggestion: "Please check the group ID",
         });
      }

      const roleGroup = await db.RoleGroup.create({
         role_id: roleId,
         group_id: groupId
      });

      const newRoleGroup = await db.RoleGroup.findOne({
         where: { 
            role_id: roleGroup.role_id,
            group_id: roleGroup.group_id
         },
         attributes: [
            'role_id',
            'group_id'
         ],
         include: [
            {
               model: db.Role,
               as: 'roleGroup_belongto_Role',
               attributes: ['role_name']
            },
            {
               model: db.Group,
               as: 'roleGroup_belongto_Group',
               attributes: ['group_name']
            }
         ]
      });

      return { roleGroup: newRoleGroup };
   } catch (error) {
      console.error("createRoleGroup Error:", error);
      if (error.name === 'SequelizeUniqueConstraintError') {
         throw new __RESPONSE.BadRequestError({
            message: "Role group combination already exists",
            suggestion: "This role and group are already linked",
         });
      }
      throw new __RESPONSE.BadRequestError({
         message: "Error in creating role group",
         suggestion: "Please check your request",
         details: error.message
      });
   }
};

const updateRoleGroup = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed: " + errors.array()[0]?.msg,
            suggestion: "Please provide the correct data",
         });
      }

      const { oldRoleId, oldGroupId } = req.params;
      const { newRoleId, newGroupId } = req.body;

      const roleGroup = await db.RoleGroup.findOne({
         where: {
            role_id: oldRoleId,
            group_id: oldGroupId,
            deleted_at: null
         }
      });

      if (!roleGroup) {
         throw new __RESPONSE.NotFoundError({
            message: "RoleGroup not found",
            suggestion: "Please check the role ID and group ID",
         });
      }

      if (newRoleId) {
         const role = await db.Role.findByPk(newRoleId);
         if (!role) {
            throw new __RESPONSE.NotFoundError({
               message: "New Role not found",
               suggestion: "Please check the new role ID",
            });
         }
      }

      if (newGroupId) {
         const group = await db.Group.findByPk(newGroupId);
         if (!group) {
            throw new __RESPONSE.NotFoundError({
               message: "New Group not found",
               suggestion: "Please check the new group ID",
            });
         }
      }

      await roleGroup.update({
         role_id: newRoleId || roleGroup.role_id,
         group_id: newGroupId || roleGroup.group_id
      });

      const updatedRoleGroup = await db.RoleGroup.findOne({
         where: {
            role_id: newRoleId || oldRoleId,
            group_id: newGroupId || oldGroupId
         },
         attributes: [
            'role_id',
            'group_id'
         ],
         include: [
            {
               model: db.Role,
               as: 'roleGroup_belongto_Role',
               attributes: ['role_name']
            },
            {
               model: db.Group,
               as: 'roleGroup_belongto_Group',
               attributes: ['group_name']
            }
         ]
      });

      return { roleGroup: updatedRoleGroup };
   } catch (error) {
      console.error("updateRoleGroup Error:", error);
      if (error.name === 'SequelizeUniqueConstraintError') {
         throw new __RESPONSE.BadRequestError({
            message: "Role group combination already exists",
            suggestion: "This role and group are already linked",
         });
      }
      throw new __RESPONSE.BadRequestError({
         message: "Error in updating role group",
         suggestion: "Please check your request",
         details: error.message
      });
   }
};

const deleteRoleGroup = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed: " + errors.array()[0]?.msg,
            suggestion: "Please provide the correct data",
         });
      }

      const { roleId, groupId } = req.params;
      const roleGroup = await db.RoleGroup.findOne({
         where: {
            role_id: roleId,
            group_id: groupId,
            deleted_at: null
         }
      });

      if (!roleGroup) {
         throw new __RESPONSE.NotFoundError({
            message: "RoleGroup not found",
            suggestion: "Please check the role ID and group ID",
         });
      }

      await roleGroup.destroy();
      return { message: "RoleGroup deleted successfully" };
   } catch (error) {
      console.error("deleteRoleGroup Error:", error);
      throw new __RESPONSE.BadRequestError({
         message: "Error in deleting role group",
         suggestion: "Please check your request",
         details: error.message
      });
   }
};

module.exports = {
   getAllRoleGroup,
   getRoleGroupById,
   createRoleGroup,
   updateRoleGroup,
   deleteRoleGroup,
};