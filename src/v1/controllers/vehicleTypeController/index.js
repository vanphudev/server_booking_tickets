"use strict";

const __RESPONSE = require("../../core");
const {getAllVehicleTypes, getVehicleTypeById, createTypeVehicle, deleteTypeVehicle, updateTypeVehicle} = require("../../services/typeVehicleService");

const __TYPE_VEHICLE_CONTROLLER = {
   getAllVehicleTypes: async (req, res, next) => {
      try {
          const vehicleTypes = await getAllVehicleTypes(); 
          new __RESPONSE.OK({
              message: "Retrieved all Vehicle Types",
              metadata: vehicleTypes,
              request: req,
          }).send(res);
      } catch (error) {
          console.error("Error retrieving Vehicle Types:", error);
          res.status(500).json({
              error: true,
              message: "Internal Server Error",
              details: error.message,
          });
      }
  },

  getVehicleTypeById: async (req, res, next) => {
      try {
         const { id } = req.params;
         const vehicleType = await getVehicleTypeById(id); 

         new __RESPONSE.OK({
            message: "Retrieved Vehicle Type",
            metadata: vehicleType,
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error retrieving Vehicle Type:", error);
         res.status(500).json({
            error: true,
            message: "Internal Server Error",
            details: error.message,
         });
      }
   },
   createTypeVehicle: async (req, res, next) => {
      new __RESPONSE.CREATED({
         message: "Create new type vehicle",
         metadata: await createTypeVehicle(req),
         request: req,
      }).send(res);
   },

   updateTypeVehicle: async (req, res, next) => {
      try {
         const result = await updateTypeVehicle(req);
         res.status(200).json({
            message: "Update type vehicle",
            data: result,
         });
      } catch (error) {
         console.error("Error in updateTypeVehicle:", error);
         res.status(500).json({ error: "Internal Server Error" });
      }
   },
   
    
   deleteTypeVehicle: async (req, res, next) => {
      try {
         new __RESPONSE.DELETE({
            message: "Delete type vehicle",
            metadata: await deleteTypeVehicle(req),
            request: req,
         }).send(res);
      } catch (error) {
         next(error);
      }
   },
};

module.exports = __TYPE_VEHICLE_CONTROLLER;
