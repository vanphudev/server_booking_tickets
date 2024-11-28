"use strict";

const __RESPONSE = require("../../core");
const {
   getAllRoles,
   getRoleById,
    createRole,
    updateRole,
    deleteRole,
    findAllRoles,
} = require("../../services/roleService");

const __ROLE_CONTROLLER = {
   getAllRoles: async (req, res, next) => {
      try {
          new __RESPONSE.GET({
              message: "List of all roles",
              metadata: await getAllRoles(),
              request: req,
          }).send(res);
      } catch (error) {
          console.error("Error finding roles:", error);
          res.status(error.statusCode || 500).json({
              error: true,
              message: error.message,
              details: error.details || {},
          });
      }
  },

  getRoleById: async (req, res, next) => {
      try {
          new __RESPONSE.GET({
              message: "Role details",
              metadata: await getRoleById(req),
              request: req,
          }).send(res);
      } catch (error) {
          console.error("Error finding role by ID:", error);
          res.status(error.statusCode || 500).json({
              error: true,
              message: error.message,
              details: error.details || {},
          });
      }
  },


    createRole: async (req, res, next) => {
        try {
            new __RESPONSE.CREATED({
                message: "Role created successfully",
                metadata: await createRole(req),
                request: req,
            }).send(res);
        } catch (error) {
            console.error("Error creating role:", error);
            res.status(error.statusCode || 500).json({
                error: true,
                message: error.message,
                details: error.details || {},
            });
        }
    },

    updateRole: async (req, res, next) => {
        try {
            new __RESPONSE.OK({
                message: "Role updated successfully",
                metadata: await updateRole(req),
                request: req,
            }).send(res);
        } catch (error) {
            console.error("Error updating role:", error);
            res.status(error.statusCode || 500).json({
                error: true,
                message: error.message,
                details: error.details || {},
            });
        }
    },

    deleteRole: async (req, res, next) => {
        try {
            new __RESPONSE.DELETE({
                message: "Role deleted successfully",
                metadata: await deleteRole(req),
                request: req,
            }).send(res);
        } catch (error) {
            console.error("Error deleting role:", error);
            res.status(error.statusCode || 500).json({
                error: true,
                message: error.message,
                details: error.details || {},
            });
        }
    },

    findAllRoles: async (req, res, next) => {
        try {
            new __RESPONSE.GET({
                message: "List of all roles",
                metadata: await findAllRoles(),
                request: req,
            }).send(res);
        } catch (error) {
            console.error("Error finding roles:", error);
            res.status(error.statusCode || 500).json({
                error: true,
                message: error.message,
                details: error.details || {},
            });
        }
    },
};

module.exports = __ROLE_CONTROLLER;
