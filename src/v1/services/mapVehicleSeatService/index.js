"use strict";
const __RESPONSE = require("../../core");
const { validationResult } = require("express-validator");
const db = require("../../models");

const getAllMapVehicleSeat = async () => {
   try {
      const seats = await db.MapVehicleSeat.findAll({
         attributes: [
            'map_vehicle_seat_id',
            'map_vehicle_seat_code',
            'map_vehicle_seat_row_no',
            'map_vehicle_seat_column_no',
            'map_vehicle_seat_floor_no',
            'map_vehicle_seat_lock_chair',
            'map_vehicle_layout_id'
         ],
         include: [{
            model: db.MapVehicleLayout,
            as: 'mapVehicleSeat_belongto_mapVehicleLayout',
            attributes: ['layout_name'],
         }],
         order: [['map_vehicle_seat_id', 'ASC']],
         where: {
            deleted_at: null
         }
      });

      return { seats, total: seats.length };
   } catch (error) {
      console.error("getAllMapVehicleSeat Error:", error);
      throw new __RESPONSE.BadRequestError({
         message: "Error in finding all map vehicle seats",
         suggestion: "Please check database connection",
         details: error.message
      });
   }
};

const getMapVehicleSeatById = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed: " + errors.array()[0]?.msg,
            suggestion: "Please provide the correct data",
         });
      }

      const { seatId } = req.query;
      const seat = await db.MapVehicleSeat.findOne({
         where: { 
            map_vehicle_seat_id: seatId,
            deleted_at: null
         },
         attributes: [
            'map_vehicle_seat_id',
            'map_vehicle_seat_code',
            'map_vehicle_seat_row_no',
            'map_vehicle_seat_column_no',
            'map_vehicle_seat_floor_no',
            'map_vehicle_seat_lock_chair',
            'map_vehicle_layout_id'
         ],
         include: [{
            model: db.MapVehicleLayout,
            as: 'mapVehicleSeat_belongto_mapVehicleLayout',
            attributes: ['layout_name'],
         }]
      });

      if (!seat) {
         throw new __RESPONSE.NotFoundError({
            message: "MapVehicleSeat not found",
            suggestion: "Please check the seat ID",
         });
      }

      return { seat };
   } catch (error) {
      console.error("getMapVehicleSeatById Error:", error);
      if (error instanceof __RESPONSE.NotFoundError) throw error;
      throw new __RESPONSE.BadRequestError({
         message: "Error in finding map vehicle seat",
         suggestion: "Please check your request",
         details: error.message
      });
   }
};

const createMapVehicleSeat = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed: " + errors.array()[0]?.msg,
            suggestion: "Please provide the correct data",
         });
      }

      const { code, col, row, floor, lock_chair, mapvehiclelayoutid } = req.body;

      // Kiểm tra layout tồn tại
      const layout = await db.MapVehicleLayout.findByPk(mapvehiclelayoutid);
      if (!layout) {
         throw new __RESPONSE.NotFoundError({
            message: "MapVehicleLayout not found",
            suggestion: "Please check the layout ID",
         });
      }

      const seat = await db.MapVehicleSeat.create({
         map_vehicle_seat_code: code,
         map_vehicle_seat_row_no: row,
         map_vehicle_seat_column_no: col,
         map_vehicle_seat_floor_no: floor,
         map_vehicle_seat_lock_chair: lock_chair ? 1 : 0,
         map_vehicle_layout_id: mapvehiclelayoutid,
      });

      const newSeat = await db.MapVehicleSeat.findOne({
         where: { map_vehicle_seat_id: seat.map_vehicle_seat_id },
         attributes: [
            'map_vehicle_seat_id',
            'map_vehicle_seat_code',
            'map_vehicle_seat_row_no',
            'map_vehicle_seat_column_no',
            'map_vehicle_seat_floor_no',
            'map_vehicle_seat_lock_chair',
            'map_vehicle_layout_id'
         ],
         include: [{
            model: db.MapVehicleLayout,
            as: 'mapVehicleSeat_belongto_mapVehicleLayout',
            attributes: ['layout_name'],
         }]
      });

      return { seat: newSeat };
   } catch (error) {
      console.error("createMapVehicleSeat Error:", error);
      if (error.name === 'SequelizeUniqueConstraintError') {
         throw new __RESPONSE.BadRequestError({
            message: "Seat code already exists",
            suggestion: "Please use a different seat code",
         });
      }
      throw new __RESPONSE.BadRequestError({
         message: "Error in creating map vehicle seat",
         suggestion: "Please check your request",
         details: error.message
      });
   }
};

const updateMapVehicleSeat = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed: " + errors.array()[0]?.msg,
            suggestion: "Please provide the correct data",
         });
      }

      const id = parseInt(req.params.id);
      const { code, row, col, floor, lock_chair, mapvehiclelayoutid } = req.body;

      const seat = await db.MapVehicleSeat.findOne({
         where: { 
            map_vehicle_seat_id: id,
            deleted_at: null
         }
      });

      if (!seat) {
         throw new __RESPONSE.NotFoundError({
            message: "MapVehicleSeat not found",
            suggestion: "Please check the seat ID",
         });
      }

      if (mapvehiclelayoutid) {
         const layout = await db.MapVehicleLayout.findByPk(mapvehiclelayoutid);
         if (!layout) {
            throw new __RESPONSE.NotFoundError({
               message: "MapVehicleLayout not found",
               suggestion: "Please check the layout ID",
            });
         }
      }

      await seat.update({
         map_vehicle_seat_code: code || seat.map_vehicle_seat_code,
         map_vehicle_seat_row_no: row || seat.map_vehicle_seat_row_no,
         map_vehicle_seat_column_no: col || seat.map_vehicle_seat_column_no,
         map_vehicle_seat_floor_no: floor || seat.map_vehicle_seat_floor_no,
         map_vehicle_seat_lock_chair: lock_chair !== undefined ? (lock_chair ? 1 : 0) : seat.map_vehicle_seat_lock_chair,
         map_vehicle_layout_id: mapvehiclelayoutid || seat.map_vehicle_layout_id,
      });

      const updatedSeat = await db.MapVehicleSeat.findOne({
         where: { map_vehicle_seat_id: id },
         attributes: [
            'map_vehicle_seat_id',
            'map_vehicle_seat_code',
            'map_vehicle_seat_row_no',
            'map_vehicle_seat_column_no',
            'map_vehicle_seat_floor_no',
            'map_vehicle_seat_lock_chair',
            'map_vehicle_layout_id'
         ],
         include: [{
            model: db.MapVehicleLayout,
            as: 'mapVehicleSeat_belongto_mapVehicleLayout',
            attributes: ['layout_name'],
         }]
      });

      return { seat: updatedSeat };
   } catch (error) {
      console.error("updateMapVehicleSeat Error:", error);
      if (error.name === 'SequelizeUniqueConstraintError') {
         throw new __RESPONSE.BadRequestError({
            message: "Seat code already exists",
            suggestion: "Please use a different seat code",
         });
      }
      throw new __RESPONSE.BadRequestError({
         message: "Error in updating map vehicle seat",
         suggestion: "Please check your request",
         details: error.message
      });
   }
};

const deleteMapVehicleSeat = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed: " + errors.array()[0]?.msg,
            suggestion: "Please provide the correct data",
         });
      }

      const id = parseInt(req.params.id);
      const seat = await db.MapVehicleSeat.findOne({
         where: { 
            map_vehicle_seat_id: id,
            deleted_at: null
         }
      });

      if (!seat) {
         throw new __RESPONSE.NotFoundError({
            message: "MapVehicleSeat not found",
            suggestion: "Please check the seat ID",
         });
      }

      await seat.destroy();
      return { message: "MapVehicleSeat deleted successfully" };
   } catch (error) {
      console.error("deleteMapVehicleSeat Error:", error);
      throw new __RESPONSE.BadRequestError({
         message: "Error in deleting map vehicle seat",
         suggestion: "Please check your request",
         details: error.message
      });
   }
};

module.exports = {
   getAllMapVehicleSeat,
   getMapVehicleSeatById,
   createMapVehicleSeat,
   updateMapVehicleSeat,
   deleteMapVehicleSeat,
};