"use strict";
const __RESPONSE = require("../../core");

const db = require("../../models");
const validator = require("validator");

const createVehicle = async (req) => {
   const {code,
    license_plate,
    model,
    brand,
    capacity,
    manufacture_year,
    color,
    description,
    locked,
    lockat,
    layoutid,
    officeid,
    vehicle_typeid} = req.body;
   
   const vehicle = await db.Vehicle.create({
        vehicle_code: code,
        vehicle_license_plate: license_plate,
        vehicle_model: model,
        vehicle_brand: brand,
        vehicle_capacity: capacity,
        vehicle_manufacture_year: manufacture_year,
        vehicle_color: color,
        vehicle_description: description,
        is_locked: locked,
        last_lock_at: lockat,
        map_vehicle_layout_id: layoutid,
        office_id: officeid,
        vehicle_type_id: vehicle_typeid,
   });
   return {
        id: vehicle.vehicle_id,
        code: vehicle.vehicle_code,
        license_plate: vehicle.vehicle_license_plate,
        model: vehicle.vehicle_model,
        brand: vehicle.vehicle_brand,
        capacity: vehicle.vehicle_capacity,
        manufacture_year: vehicle.vehicle_manufacture_year,
        color: vehicle.vehicle_color,
        description: vehicle.vehicle_description,
        locked: vehicle.is_locked,
        lockat: vehicle.last_lock_at,
        layoutid: vehicle.map_vehicle_layout_id,
        officeid: vehicle.office_id,
        vehicle_typeid: vehicle.vehicle_type_id,
   };
};
// update
const updateVehicle = async (req) => {
     const {id} = req.params;
     const {code,
          license_plate,
          model,
          brand,
          capacity,
          manufacture_year,
          color,
          description,
          locked,
          lockat,
          layoutid,
          officeid,
          vehicle_typeid} = req.body;
  
     if (!id || !code) {
        return { status: 400, error: true, reason: "ID and name are required." };
     }
  
     const vehicle = await db.Vehicle.findByPk(id);
     if (!vehicle) {
        return { status: 404, error: true, reason: "Vehicle not found." };
     }
     
     vehicle.vehicle_code=code;
     vehicle.vehicle_license_plate=license_plate;
     vehicle.vehicle_model=model;
     vehicle.vehicle_brand=brand;
     vehicle.vehicle_capacity=capacity;
     vehicle.vehicle_manufacture_year=manufacture_year;
     vehicle.vehicle_color=color;
     vehicle.vehicle_description=description;
     vehicle.is_locked= locked;
     vehicle.last_lock_at=lockat;
     vehicle.map_vehicle_layout_id=layoutid;
     vehicle.office_id=officeid;
     vehicle.vehicle_type_id=vehicle_typeid;

     await vehicle.save();
     console.log(vehicle);
     return {
        status: 200,
        error: false,
        message: "Vehicle updated successfully.",
        data: {
          id: vehicle.vehicle_id,
          code: vehicle.vehicle_code,
          license_plate: vehicle.vehicle_license_plate,
          model: vehicle.vehicle_model,
          brand: vehicle.vehicle_brand,
          capacity: vehicle.vehicle_capacity,
          manufacture_year: vehicle.vehicle_manufacture_year,
          color: vehicle.vehicle_color,
          description: vehicle.vehicle_description,
          locked: vehicle.is_locked,
          lockat: vehicle.last_lock_at,
          layoutid: vehicle.map_vehicle_layout_id,
          officeid: vehicle.office_id,
          vehicle_typeid: vehicle.vehicle_type_id,
        },
     };
  };

// Xóa 
const deleteVehicle = async (req) => {
     const { id } = req.params;
  
     if (!id) {
        return { status: 400, error: true, reason: "ID is required." };
     }
  
     const vehicle = await db.Vehicle.findByPk(id);
     if (!vehicle) {
        return { status: 404, error: true, reason: "Vehicle not found." };
     }
  
     await vehicle.destroy();
  
     return {
        status: 200,
        error: false,
        message: "Vehicle deleted successfully.",
     };
  };
  

module.exports = {
    createVehicle,
    deleteVehicle,
    updateVehicle,
};

const {validationResult} = require("express-validator");

module.exports = {};

