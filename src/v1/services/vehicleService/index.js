"use strict";
const __RESPONSE = require("../../core");
const { validationResult } = require("express-validator");
const db = require("../../models");

const getAllVehicles = async () => {
   return await db.Vehicle.findAll({
      attributes: [
         "vehicle_id",
         "vehicle_code",
         "vehicle_license_plate",
         "vehicle_model",
         "vehicle_brand",
         "vehicle_capacity",
         "vehicle_manufacture_year",
         "vehicle_color",
         "vehicle_description",
      ],
      include: [
         {
            model: db.VehicleImage,
            as: "vehicle_to_vehicleImage",
            attributes: ["vehicle_image_id", "vehicle_image_url", "vehicle_image_description"],
         },
      ],
      nest: true,
      raw: true,
   })
      .then((vehicles) => {
         if (!vehicles || vehicles.length == 0) {
            throw new __RESPONSE.NotFoundError({
               message: "Resource not found - Vehicles not found !",
               suggestion: "Please check your request",
            });
         }
         return {
            vehicles,
            total: vehicles.length,
         };
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Error in getting all vehicles",
            suggestion: "Please check your request",
         });
      });
};

const getVehicleById = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }
   const { vehicleId } = req.query;
   return await db.Vehicle.findOne({
      where: {
         vehicle_id: vehicleId,
      },
      attributes: [
         "vehicle_id",
         "vehicle_code",
         "vehicle_license_plate",
         "vehicle_model",
         "vehicle_brand",
         "vehicle_capacity",
         "vehicle_manufacture_year",
         "vehicle_color",
         "vehicle_description",
      ],
      include: [
         {
            model: db.VehicleImage,
            as: "vehicle_to_vehicleImage",
            attributes: ["vehicle_image_id", "vehicle_image_url", "vehicle_image_description"],
         },
      ],
      nest: true,
      raw: true,
   })
      .then((vehicle) => {
         if (!vehicle) {
            throw new __RESPONSE.NotFoundError({
               message: "Resource not found - Vehicle not found !",
               suggestion: "Please check your request",
               request: req,
            });
         }
         return { vehicle };
      })
      .catch((error) => {
         if (error instanceof __RESPONSE.NotFoundError) {
            throw error;
         }
         throw new __RESPONSE.BadRequestError({
            message: "Error in getting vehicle by id " + error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};

const createVehicle = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const { code, license_plate, model, brand, capacity, manufacture_year, color, description } = req.body;
   return await db.Vehicle.create({
      vehicle_code: code,
      vehicle_license_plate: license_plate,
      vehicle_model: model,
      vehicle_brand: brand,
      vehicle_capacity: capacity,
      vehicle_manufacture_year: manufacture_year,
      vehicle_color: color,
      vehicle_description: description,
   })
      .then((vehicle) => {
         if (!vehicle) {
            throw new __RESPONSE.BadRequestError({
               message: "Error in creating vehicle",
               suggestion: "Please check your request",
               request: req,
            });
         }
         return { vehicle };
      })
      .catch((error) => {
         if (error.original?.code === "ER_DUP_ENTRY") {
            throw new __RESPONSE.BadRequestError({
               message: "Vehicle already exists " + error.original.sqlMessage,
               suggestion: "Please check your request",
               request: req,
            });
         }
         throw new __RESPONSE.BadRequestError({
            message: "Error in creating vehicle",
            suggestion: "Please check your request",
            request: req,
         });
      });
};

const updateVehicle = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const { vehicleId, code, license_plate, model, brand, capacity, manufacture_year, color, description } = req.body;
   const vehicle = await db.Vehicle.findOne({
      where: {
         vehicle_id: vehicleId,
      },
   });

   if (!vehicle) {
      throw new __RESPONSE.NotFoundError({
         message: "Resource not found - Vehicle not found !",
         suggestion: "Please check your request",
         request: req,
      });
   }

   return await vehicle.update({
      vehicle_code: code,
      vehicle_license_plate: license_plate,
      vehicle_model: model,
      vehicle_brand: brand,
      vehicle_capacity: capacity,
      vehicle_manufacture_year: manufacture_year,
      vehicle_color: color,
      vehicle_description: description,
   })
      .then((vehicle) => {
         if (!vehicle) {
            throw new __RESPONSE.BadRequestError({
               message: "Error in updating vehicle",
               suggestion: "Please check your request",
               request: req,
            });
         }
         return { vehicle };
      })
      .catch((error) => {
         if (error.original?.code === "ER_DUP_ENTRY") {
            throw new __RESPONSE.BadRequestError({
               message: "Vehicle already exists " + error.original.sqlMessage,
               suggestion: "Please check your request",
               request: req,
            });
         }
         throw new __RESPONSE.BadRequestError({
            message: "Error in updating vehicle",
            suggestion: "Please check your request",
            request: req,
         });
      });
};

const deleteVehicle = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const { vehicleId } = req.query;
   const vehicle = await db.Vehicle.findOne({
      where: {
         vehicle_id: vehicleId,
      },
   });

   if (!vehicle) {
      throw new __RESPONSE.NotFoundError({
         message: "Resource not found - Vehicle not found !",
         suggestion: "Please check your request",
         request: req,
      });
   }

   return await vehicle.destroy()
      .then(() => {
         return { success: true };
      })
      .catch((error) => {
         if (error.original?.code === "ER_ROW_IS_REFERENCED_2") {
            throw new __RESPONSE.BadRequestError({
               message: "Vehicle is referenced by other tables",
               suggestion: "Please check your request",
               request: req,
            });
         }
         throw new __RESPONSE.BadRequestError({
            message: "Error in deleting vehicle",
            suggestion: "Please check your request",
            request: req,
         });
      });
};

const findAllDeletedVehicle = async () => {
   return await db.Vehicle.findAll({
      attributes: [
         "vehicle_id",
         "vehicle_code",
         "vehicle_license_plate",
         "vehicle_model",
         "vehicle_brand",
         "vehicle_capacity",
         "vehicle_manufacture_year",
         "vehicle_color",
         "vehicle_description",
         "deleted_at",
      ],
      where: {
         deleted_at: { [db.Sequelize.Op.ne]: null },
      },
      order: [["deleted_at", "DESC"]],
      include: [
         {
            model: db.VehicleImage,
            as: "vehicle_to_vehicleImage",
            attributes: ["vehicle_image_id", "vehicle_image_url", "vehicle_image_description"],
         },
      ],
      paranoid: false,
      nest: true,
      raw: true,
   })
      .then((vehicles) => {
         if (!vehicles || vehicles.length === 0) {
            throw new __RESPONSE.NotFoundError({
               message: "Resource not found - No deleted vehicles found !",
               suggestion: "Please check your request",
            });
         }
         return { vehicles, total: vehicles.length };
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Error in finding deleted vehicles",
            suggestion: "Please check your request",
         });
      });
};

module.exports = {
   getAllVehicles,
   getVehicleById,
   createVehicle,
   updateVehicle,
   deleteVehicle,
   findAllDeletedVehicle,
};