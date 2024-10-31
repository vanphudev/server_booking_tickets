"use strict";

const __RESPONSE = require("../../core");
const {createVehicle, deleteVehicle, updateVehicle} = require("../../services/vehicleService");

const __TYPE_VEHICLE_CONTROLLER = {
   createVehicle: async (req, res, next) => {
      new __RESPONSE.CREATED({
         message: "Create new vehicle",
         metadata: await createVehicle(req),
         request: req,
      }).send(res);
   },
   updateVehicle: async (req, res, next) => {
      try {
         const result = await updateVehicle(req);
         res.status(200).json({
            message: "Update vehicle",
            data: result,
         }); 
      } catch (error) {
         console.error("Error in updateVehicle:", error);
         res.status(500).json({ error: "Internal Server Error" });
      }
   },
   deleteVehicle: async (req, res, next) => {
      try {
         new __RESPONSE.DELETE({
            message: "Delete vehicle",
            metadata: await deleteVehicle(req),
            request: req,
         }).send(res);
      } catch (error) {
         next(error);
      }
   },
};

module.exports = __TYPE_VEHICLE_CONTROLLER;
