"use strict";

const __RESPONSE = require("../../core");
const db = require("../../models"); // Đảm bảo rằng db được nhập khẩu
const { getAllVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle, findAllDeletedVehicle } = require("../../services/vehicleService");

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
      // Lấy vehicleId từ params
      const { vehicleId } = req.params;

      // Kiểm tra xem vehicleId có tồn tại không
      if (!vehicleId) {
         return res.status(400).json({ message: "Vehicle ID is required" });
      }

      try {
         // Tìm phương tiện theo ID
         const vehicle = await db.Vehicle.findOne({
            where: {
               vehicle_id: vehicleId,
            },
         });

         // Kiểm tra xem phương tiện có tồn tại không
         if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
         }

         // Xóa phương tiện
         await vehicle.destroy();

         // Trả về phản hồi thành công
         return res.status(200).json({ message: "Vehicle deleted successfully" });
      } catch (error) {
         console.error("Error deleting vehicle:", error);
         return res.status(500).json({ message: "Internal server error" });
      }
   }, // Xóa dấu phẩy ở đây
   findAllDeletedVehicle: async (req, res, next) => {
      new __RESPONSE.GET({
         message: "List of all deleted vehicles",
         metadata: await findAllDeletedVehicle(req),
         request: req,
      }).send(res);
   },
};

module.exports = __VEHICLE_CONTROLLER;