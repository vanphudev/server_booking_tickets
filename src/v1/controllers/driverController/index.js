"use strict";
const __RESPONSE = require("../../core");
const {
   getAllDrivers,
   getDriverById,
   createDriver,
   updateDriver,
   deleteDriver,
} = require("../../services/driverService");
const __DRIVER_CONTROLLER = {
   getAllDrivers: async (req, res, next) => {
      try {
         new __RESPONSE.GET({
            message: "List of all drivers",
            metadata: await getAllDrivers(),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error finding drivers:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },
   getDriverById: async (req, res, next) => {
      try {
         new __RESPONSE.GET({
            message: "Driver details",
            metadata: await getDriverById(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error finding driver by ID:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },
   createDriver: async (req, res, next) => {
      try {
         new __RESPONSE.CREATED({
            message: "Driver created successfully",
            metadata: await createDriver(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error creating driver:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },
   updateDriver: async (req, res, next) => {
      try {
         new __RESPONSE.OK({
            message: "Driver updated successfully",
            metadata: await updateDriver(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error updating driver:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },
   deleteDriver: async (req, res, next) => {
      try {
         new __RESPONSE.DELETE({
            message: "Driver deleted successfully",
            metadata: await deleteDriver(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error deleting driver:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },
};
module.exports = __DRIVER_CONTROLLER;