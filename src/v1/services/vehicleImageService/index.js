"use strict";
const __RESPONSE = require("../../core");
const db = require("../../models");
const validator = require("validator");

const createVehicleImage = async (req) => {
   const {url, description, imagetype, vehicleid} = req.body;
   
   const vehicleImage = await db.VehicleImage.create({
        vehicle_image_url: url,
        vehicle_image_description: description,
        vehicle_image_type: imagetype,
        vehicle_id: vehicleid,
       
   });
   return {
    id: vehicleImage.vehicle_image_id,
       url: vehicleImage.vehicle_image_url,
       description: vehicleImage.vehicle_image_description,
       imagetype: vehicleImage.vehicle_image_type,
       vehicleid: vehicleImage.vehicle_id,
   };
};
// lấy tất cả vehicle image
const getAllVehicleImage = async () => {
    const vehicleImage = await db.VehicleImage.findAll();
    return vehicleImage;
 };
 
 // lấy theo ID
    const getVehicleImageById = async (id) => {
    const vehicleImage = await db.VehicleImage.findByPk(id);
    if (!vehicleImage) {
        throw new Error("Vehicle image not found");
    }
    return vehicleImage;
 };
 // update
 const updateImageVehicle = async (req) => {
    const {id} = req.params;
    const { url, description, imagetype, vehicleid} = req.body;
 
    if (!id) {
       return { status: 400, error: true, reason: "ID are required." };
    }
 
    const vehicleImage = await db.VehicleImage.findByPk(id);
    if (!vehicleImage) {
       return { status: 404, error: true, reason: "Type vehicle not found." };
    }
 
    vehicleImage.vehicle_image_url= url;
    vehicleImage.vehicle_image_description=description;
    vehicleImage.vehicle_image_type= imagetype,
    vehicleImage.vehicle_id=vehicleid,
    await vehicleImage.save();
    console.log(vehicleImage);
    return {
       status: 200,
       error: false,
       message: "Image vehicle updated successfully.",
       data: {
        id: vehicleImage.vehicle_image_id,
        url: vehicleImage.vehicle_image_url,
        description: vehicleImage.vehicle_image_description,
        imagetype: vehicleImage.vehicle_image_type,
        vehicleid: vehicleImage.vehicle_id,
       },
    };
 };
 
 // Xóa 
const deleteImageVehicle = async (req) => {
    const { id } = req.params;
 
    if (!id) {
       return { status: 400, error: true, reason: "ID is required." };
    }
 
    const imageVehicle = await db.VehicleImage.findByPk(id);
    if (!imageVehicle) {
       return { status: 404, error: true, reason: "Image vehicle not found." };
    }
 
    await imageVehicle.destroy();
 
    return {
       status: 200,
       error: false,
       message: "Type vehicle deleted successfully.",
    };
 };
module.exports={
    createVehicleImage,
    getAllVehicleImage,
    getVehicleImageById,
    updateImageVehicle,
    deleteImageVehicle,
}