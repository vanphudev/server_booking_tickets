"use strict";

const __RESPONSE = require("../../core");
const {getAllVehicleImages, getVehicleImageById, getVehicleByVehicleId, createVehicleImage,updateVehicleImage
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
      new __RESPONSE.GET({
         message: "List of all vehicle images",
         metadata: await getAllVehicleImages(),
         request: req,
      }).send(res);
   },
   /*deleteVehicleImage: async (req, res, next) => {
      new __RESPONSE.DELETE({
         message: "vehicle deleted",
         metadata: await deleteVehicleImage(req),
         request: req,
      }).send(res);
   },
   findAllDeleteVehicleImages: async (req, res, next) => {
      new __RESPONSE.GET({
         message: "List of all deleted vehicle",
         metadata: await findAllDeleteVehicleImages(req),
         request: req,
      }).send(res);
   },*/
};

module.exports = __VEHICLE_IMAGE_CONTROLLER;
