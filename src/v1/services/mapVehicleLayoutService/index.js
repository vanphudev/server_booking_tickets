"use strict";
const __RESPONSE = require("../../core");
const db = require("../../models");
const validator = require("validator");

const getAllMapVehicleLayout = async () => {
   const mapVehicleLayout = await db.MapVehicleLayout.findAll();
   return mapVehicleLayout;
};

// Phương thức lấy theo ID
const getMapVehicleLayoutById = async (id) => {
   const mapVehicleLayout = await db.MapVehicleLayout.findByPk(id);
   if (!mapVehicleLayout) {
       throw new __RESPONSE.NotFoundError({
         message: "Map Vehicle Layout not found",
         request: req,
     })
   }
   return mapVehicleLayout;
};
const createMapVehicleLayout = async (req) => {
   const {name, description} = req.body;
   // có tôn tại hong.
   // khác rỗng.
   // khác nulll và undefined và "" và 0 và false => empty
   const mapVehicleLayout = await db.MapVehicleLayout.create({
        layout_name: name,
   });
   return {
      id: mapVehicleLayout.map_vehicle_layout_id,
      name: mapVehicleLayout.layout_name,
   };
};

const updateMapVehicleLayout = async (req) => {
    const {id} = req.params; // Lấy id từ params
    const {name} = req.body;
 
    // Tìm bản ghi cần cập nhật
    const mapVehicleLayout = await db.MapVehicleLayout.findByPk(id);
    if (!mapVehicleLayout) {
      throw new __RESPONSE.NotFoundError({
         message: "Map Vehicle Layout not found",
         request: req,
     })
    }
 
    // Cập nhật layout_name
    mapVehicleLayout.layout_name = name;
    await mapVehicleLayout.save();
 
    return {
       id: mapVehicleLayout.map_vehicle_layout_id,
       name: mapVehicleLayout.layout_name,
    };
 };
 
 const deleteMapVehicleLayout = async (req) => {
    const {id} = req.params;
 
    // Tìm bản ghi cần xóa
    const mapVehicleLayout = await db.MapVehicleLayout.findByPk(id);
    if (!mapVehicleLayout) {
      throw new __RESPONSE.NotFoundError({
         message: "Map Vehicle Layout not found",
         request: req,
     })
    }
 
    // Xóa bản ghi
    await mapVehicleLayout.destroy();
 
    return { message: "MapVehicleLayout deleted successfully" };
 };
 
 module.exports = {
   getAllMapVehicleLayout,
   getMapVehicleLayoutById,
    createMapVehicleLayout,
    updateMapVehicleLayout,
    deleteMapVehicleLayout,
 };