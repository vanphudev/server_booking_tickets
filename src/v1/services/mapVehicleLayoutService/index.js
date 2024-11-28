"use strict";
const __RESPONSE = require("../../core");
const { validationResult } = require("express-validator");
const db = require("../../models");

const getAllMapVehicleLayouts = async () => {
   return await db.MapVehicleLayout.findAll({
      attributes: ['map_vehicle_layout_id', 'layout_name'],
   })
      .then((layouts) => {
         if (!layouts || layouts.length === 0) {
            throw new __RESPONSE.NotFoundError({
               message: "Resource not found - MapVehicleLayouts not found!",
               suggestion: "Please check your request",
            });
         }
         return { layouts, total: layouts.length };
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Error in finding all map vehicle layouts",
            suggestion: "Please check your request",
         });
      });
};

const getMapVehicleLayoutById = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed: " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const { layoutId } = req.query;
   return await db.MapVehicleLayout.findOne({
      where: { map_vehicle_layout_id: layoutId },
      attributes: ['map_vehicle_layout_id', 'layout_name'],
   })
      .then((layout) => {
         if (!layout) {
            throw new __RESPONSE.NotFoundError({
               message: "Resource not found - MapVehicleLayout not found!",
               suggestion: "Please check your request",
            });
         }
         return { layout };
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Error in finding map vehicle layout: " + error.message,
            suggestion: "Please check your request",
         });
      });
};

const createMapVehicleLayout = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed: " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const { name } = req.body;
   return await db.MapVehicleLayout.create({
      layout_name: name,
   })
      .then((layout) => {
         if (!layout) {
            throw new __RESPONSE.BadRequestError({
               message: "Error in creating map vehicle layout",
               suggestion: "Please check your request",
               request: req,
            });
         }
         return { layout };
      })
      .catch((error) => {
         if (error.original?.code === "ER_DUP_ENTRY") {
            throw new __RESPONSE.BadRequestError({
               message: "Layout name already exists: " + error.original.sqlMessage,
               suggestion: "Please use different layout name",
               request: req,
            });
         }
         throw new __RESPONSE.BadRequestError({
            message: "Error in creating map vehicle layout: " + error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};

const updateMapVehicleLayout = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed: " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const id = parseInt(req.params.id);
   const { name } = req.body;

   const layout = await db.MapVehicleLayout.findOne({
      where: { map_vehicle_layout_id: id },
   });

   if (!layout) {
      throw new __RESPONSE.NotFoundError({
         message: "Resource not found - MapVehicleLayout not found!",
         suggestion: "Please check your request",
         request: req,
      });
   }

   return await layout
      .update({
         layout_name: name || layout.layout_name,
      })
      .then((updatedLayout) => {
         return { layout: updatedLayout };
      })
      .catch((error) => {
         if (error.original?.code === "ER_DUP_ENTRY") {
            throw new __RESPONSE.BadRequestError({
               message: "Layout name already exists: " + error.original.sqlMessage,
               suggestion: "Please use different layout name",
               request: req,
            });
         }
         throw new __RESPONSE.BadRequestError({
            message: "Error in updating map vehicle layout: " + error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};

const deleteMapVehicleLayout = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed: " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const id = parseInt(req.params.id);

   const layout = await db.MapVehicleLayout.findOne({
      where: { map_vehicle_layout_id: id },
   });

   if (!layout) {
      throw new __RESPONSE.NotFoundError({
         message: "Resource not found - MapVehicleLayout not found!",
         suggestion: "Please check your request",
         request: req,
      });
   }

   return await layout
      .destroy()
      .then(() => {
         return { message: "MapVehicleLayout deleted successfully" };
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Error in deleting map vehicle layout: " + error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};

module.exports = {
   getAllMapVehicleLayouts,
   getMapVehicleLayoutById,
   createMapVehicleLayout,
   updateMapVehicleLayout,
   deleteMapVehicleLayout,
};