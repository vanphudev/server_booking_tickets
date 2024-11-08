"use strict";

const __RESPONSE = require("../../core");
const {getAllVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle, findAllDeletedVehicle} = require("../../services/vehicleService");

const __VEHICLE_CONTROLLER = {
   getAllVehicles: async (req, res, next) => {
      new __RESPONSE.GET({
         message: "List of all vehicles",
         metadata: await getAllVehicles(),
         request: req,
      }).send(res);
   },
   getVehicleById: async (req, res, next) => {
      new __RESPONSE.GET({
         message: "Vehicle details",
         metadata: await getVehicleById(req),
         request: req,
      }).send(res);
   },
   createVehicle: async (req, res, next) => {
      new __RESPONSE.CREATED({
         message: "Vehicle created",
         metadata: await createVehicle(req),
         request: req,
      }).send(res);
   },
   updateVehicle: async (req, res, next) => {
      new __RESPONSE.UPDATE({
         message: "Vehicle updated",
         metadata: await updateVehicle(req),
         request: req,
      }).send(res);
   },
   deleteVehicle: async (req, res, next) => {
      new __RESPONSE.DELETE({
         message: "Vehicle deleted",
         metadata: await deleteVehicle(req),
         request: req,
      }).send(res);
   },
   findAllDeletedVehicle: async (req, res, next) => {
      new __RESPONSE.GET({
         message: "List of all deleted vehicles",
         metadata: await findAllDeletedVehicle(req),
         request: req,
      }).send(res);
   },
};

module.exports = __VEHICLE_CONTROLLER;
