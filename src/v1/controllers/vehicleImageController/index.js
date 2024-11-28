"use strict";

const __RESPONSE = require("../../core");
const {getAllVehicleImages, getVehicleImageById, getVehicleByVehicleId, createVehicleImage, deleteVehicleImage, findAllDeleteVehicleImages, updateVehicleImage
} = require("../../services/vehicleImageService");

const __VEHICLE_IMAGE_CONTROLLER = {
   createVehicleImage: async (req, res, next) => {
      new __RESPONSE.CREATED({
         message: "Create vehicle image successfully",
         metadata: await createVehicleImage(req, res, next),
         request: req,
      }).send(res);
   },
   getVehicleByVehicleId: async (req, res, next) => {
      req.office = await getVehicleByVehicleId(req, res, next);
      next();
   },
  
   getAllVehicleImages: async (req, res, next) => {
      new __RESPONSE.SUCCESS({
         message: "Get all vehicle images successfully",
         metadata: await getAllVehicleImages(req, res, next),
         request: req,
      }).send(res);
   },
   getVehicleImageById: async (req, res, next) => {
      new __RESPONSE.SUCCESS({
         message: "Get office image by id successfully",
         metadata: await getVehicleImageById(req, res, next),
         request: req,
      }).send(res);
   },
   updateVehicleImage: async (req, res, next) => {
      new __RESPONSE.SUCCESS({
         message: "Update vehicle image successfully",
         metadata: await updateVehicleImage(req, res, next),
         request: req,
      }).send(res);
   },
   deleteVehicleImage: async (req, res, next) => {
      new __RESPONSE.SUCCESS({
         message: "Delete vehicle image successfully",
         metadata: await deleteAllVehicleImages(req, res, next),
         request: req,
      }).send(res);
   },
   findAllDeleteVehicleImages: async (req, res, next) => {
      new __RESPONSE.GET({
         message: "List of all deleted vehicle",
         metadata: await findAllDeleteVehicleImages(req, res, next),
         request: req,
      }).send(res);
   },
};

module.exports = __VEHICLE_IMAGE_CONTROLLER;
