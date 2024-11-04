"use strict";
const { floor } = require("lodash");
const __RESPONSE = require("../../core");
const db = require("../../models");
const validator = require("validator");

const getAllMapVehicleSeat = async () => {
   const mapVehicleSeat = await db.MapVehicleSeat.findAll();
   return mapVehicleSeat;
};

// Phương thức lấy theo ID
const getMapVehicleSeatById = async (id) => {
   const mapVehicleSeat = await db.MapVehicleSeat.findByPk(id);
   if (!mapVehicleSeat) {
      throw new __RESPONSE.NotFoundError({
         message: "Map Vehicle Seat not found",
         request: req,
     })
   }
   return mapVehicleSeat;
};

const createMapVehicleSeat = async (req) => {
   const { code, col, row, floor, lock_chair, mapvehiclelayoutid } = req.body;

   // Kiểm tra xem có các trường cần thiết không
   if (!code || !col || !row || !floor || mapvehiclelayoutid === undefined) {
      throw new Error("Missing required fields");
   }

   // Thực hiện tạo mới ghế xe
   const mapVehicleSeat = await db.MapVehicleSeat.create({
      map_vehicle_seat_code: code,
      map_vehicle_seat_row_no: row,
      map_vehicle_seat_column_no: col,
      map_vehicle_seat_floor_no: floor,
      map_vehicle_seat_lock_chair: lock_chair,
      map_vehicle_layout_id: mapvehiclelayoutid,
   });

   return {
      id: mapVehicleSeat.map_vehicle_seat_id,
      code: mapVehicleSeat.map_vehicle_seat_code,
      row: mapVehicleSeat.map_vehicle_seat_row_no,
      col: mapVehicleSeat.map_vehicle_seat_column_no,
      floor: mapVehicleSeat.map_vehicle_seat_floor_no,
      lock_chair: mapVehicleSeat.map_vehicle_seat_lock_chair,
      mapvehiclelayoutid: mapVehicleSeat.map_vehicle_layout_id,
   };
};

const updateMapVehicleSeat = async (seatId, data) => {
   const { code, row, col, floor, lock_chair, mapvehiclelayoutid } = data;

   // Find the existing seat by ID
   const mapVehicleSeat = await db.MapVehicleSeat.findByPk(seatId);
   if (!mapVehicleSeat) {
      throw new __RESPONSE.NotFoundError({
         message: "Map Vehicle Seat not found",
      });
   }

   // Update the fields
   mapVehicleSeat.map_vehicle_seat_code = code;
   mapVehicleSeat.map_vehicle_seat_row_no = row;
   mapVehicleSeat.map_vehicle_seat_column_no = col;
   mapVehicleSeat.map_vehicle_seat_floor_no = floor;
   mapVehicleSeat.map_vehicle_seat_lock_chair = lock_chair;
   mapVehicleSeat.map_vehicle_layout_id = mapvehiclelayoutid;

   await mapVehicleSeat.save();

   return {
      id: mapVehicleSeat.map_vehicle_seat_id,
      code: mapVehicleSeat.map_vehicle_seat_code,
      row: mapVehicleSeat.map_vehicle_seat_row_no,
      col: mapVehicleSeat.map_vehicle_seat_column_no,
      floor: mapVehicleSeat.map_vehicle_seat_floor_no,
      lock_chair: mapVehicleSeat.map_vehicle_seat_lock_chair,
      mapvehiclelayoutid: mapVehicleSeat.map_vehicle_layout_id,
   };
};

const deleteMapVehicleSeat = async (req) => {
   const {id} = req.params;

   const mapVehicleSeat = await db.MapVehicleSeat.findByPk(id);
   if (!mapVehicleSeat) {
      throw new __RESPONSE.NotFoundError({
         message: "Map Vehicle Seat not found",
         request: req,
     })
   }

   await mapVehicleSeat.destroy();
   return { message: "Map Vehicle Seat deleted successfully" };
};

module.exports = {
   getAllMapVehicleSeat,
   getMapVehicleSeatById,
   createMapVehicleSeat,
   updateMapVehicleSeat,
   deleteMapVehicleSeat,
};
