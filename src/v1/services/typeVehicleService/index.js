"use strict";
const __RESPONSE = require("../../core");
const db = require("../../models");
const validator = require("validator");

const createTypeVehicle = async (req) => {
   const {name, description} = req.body;
  
   const typeVehicle = await db.VehicleType.create({
      vehicle_type_name: name,
      vehicle_type_description: description,
   });
   return {
      id: typeVehicle.vehicle_type_id,
      name: typeVehicle.vehicle_type_name,
      description: typeVehicle.vehicle_type_description,
   };
};

const updateTypeVehicle = async (req) => {
   const {id} = req.params;
   const { name, description } = req.body;

   if (!id || !name) {
      return { status: 400, error: true, reason: "ID and name are required." };
   }

   const typeVehicle = await db.VehicleType.findByPk(id);
   if (!typeVehicle) {
      return { status: 404, error: true, reason: "Type vehicle not found." };
   }

   typeVehicle.vehicle_type_name = name;
   typeVehicle.vehicle_type_description = description || typeVehicle.vehicle_type_description;
   await typeVehicle.save();
   console.log(typeVehicle);
   return {
      status: 200,
      error: false,
      message: "Type vehicle updated successfully.",
      data: {
         id: typeVehicle.vehicle_type_id,
         name: typeVehicle.vehicle_type_name,
         description: typeVehicle.vehicle_type_description,
      },
   };
};

// Xóa loại phương tiện
const deleteTypeVehicle = async (req) => {
   const { id } = req.params;

   if (!id) {
      return { status: 400, error: true, reason: "ID is required." };
   }

   const typeVehicle = await db.VehicleType.findByPk(id);
   if (!typeVehicle) {
      return { status: 404, error: true, reason: "Type vehicle not found." };
   }

   await typeVehicle.destroy();

   return {
      status: 200,
      error: false,
      message: "Type vehicle deleted successfully.",
   };
};
// Phương thức lấy tất cả Types vehicle
const getAllVehicleTypes = async () => {
   const vehicleTypes = await db.VehicleType.findAll();
   return vehicleTypes;
};

// Phương thức lấy Payment Type theo ID
   const getVehicleTypeById = async (id) => {
   const vehicleType = await db.VehicleType.findByPk(id);
   if (!vehicleType) {
       throw new Error("Vehicle Type not found");
   }
   return vehicleType;
};

module.exports = {
   getAllVehicleTypes,
   getVehicleTypeById,
    createTypeVehicle,
    updateTypeVehicle,
    deleteTypeVehicle
};
