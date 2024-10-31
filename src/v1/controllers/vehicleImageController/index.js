"use strict";

const __RESPONSE = require("../../core");
const {createVehicleImage, getAllVehicleImage, getVehicleImageById, updateImageVehicle, deleteImageVehicle} = require("../../services/vehicleImageService");

const __TYPE_VEHICLE_IMAGE_CONTROLLER = {
    getAllVehicleImage: async (req, res, next) => {
        try {
            const vehicleImage = await getAllVehicleImage(); 
            new __RESPONSE.OK({
                message: "Retrieved all Vehicle image",
                metadata: vehicleImage,
                request: req,
            }).send(res);
        } catch (error) {
            console.error("Error retrieving Vehicle image:", error);
            res.status(500).json({
                error: true,
                message: "Internal Server Error",
                details: error.message,
            });
        }
    },
  
    getVehicleImageById: async (req, res, next) => {
        try {
           const { id } = req.params;
           const vehicleImage = await getVehicleImageById(id); 
  
           new __RESPONSE.OK({
              message: "Retrieved Vehicle image",
              metadata: vehicleImage,
              request: req,
           }).send(res);
        } catch (error) {
           console.error("Error retrieving Vehicle image:", error);
           res.status(500).json({
              error: true,
              message: "Internal Server Error",
              details: error.message,
           });
        }
     },
    createVehicleImage: async (req, res, next) => {
      new __RESPONSE.CREATED({
         message: "Create new vehicle image",
         metadata: await createVehicleImage(req),
         request: req,
      }).send(res);
   },
   updateImageVehicle: async (req, res, next) => {
        try {
        const result = await updateImageVehicle(req);
        res.status(200).json({
            message: "Update image vehicle",
            data: result,
        });
        } catch (error) {
        console.error("Error in update ImageVehicle:", error);
        res.status(500).json({ error: "Internal Server Error" });
        }
    },
   deleteImageVehicle: async (req, res, next) => {
    try {
       new __RESPONSE.DELETE({
          message: "Delete  vehicle",
          metadata: await deleteImageVehicle(req),
          request: req,
       }).send(res);
     } catch (error) {
       next(error);
     }
    },

};

module.exports = __TYPE_VEHICLE_IMAGE_CONTROLLER;
