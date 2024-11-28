"use strict";

const __RESPONSE = require("../../core");
const {
   getAllMapVehicleSeat,
   getMapVehicleSeatById,
   createMapVehicleSeat,
   updateMapVehicleSeat,
   deleteMapVehicleSeat,
} = require("../../services/mapVehicleSeatService");

const __MAP_VEHICLE_SEAT_CONTROLLER = {
   getAllMapVehicleSeat: async (req, res, next) => {
      try {
         new __RESPONSE.GET({
            message: "List of all map vehicle seats",
            metadata: await getAllMapVehicleSeat(),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error finding map vehicle seats:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },

   getMapVehicleSeatById: async (req, res, next) => {
      try {
         new __RESPONSE.GET({
            message: "Map vehicle seat details",
            metadata: await getMapVehicleSeatById(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error finding map vehicle seat by ID:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },

   createMapVehicleSeat: async (req, res, next) => {
      try {
         new __RESPONSE.CREATED({
            message: "Map vehicle seat created successfully",
            metadata: await createMapVehicleSeat(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error creating map vehicle seat:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },

   updateMapVehicleSeat: async (req, res, next) => {
      try {
         new __RESPONSE.OK({
            message: "Map vehicle seat updated successfully",
            metadata: await updateMapVehicleSeat(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error updating map vehicle seat:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },

   deleteMapVehicleSeat: async (req, res, next) => {
      try {
         new __RESPONSE.DELETE({
            message: "Map vehicle seat deleted successfully",
            metadata: await deleteMapVehicleSeat(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error deleting map vehicle seat:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },
};

module.exports = __MAP_VEHICLE_SEAT_CONTROLLER;
