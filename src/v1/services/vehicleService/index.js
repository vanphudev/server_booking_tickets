// "use strict";
// const __RESPONSE = require("../../core");
// const {validationResult} = require("express-validator");
// const db = require("../../models");

// const getAllVehicles = async () => {
//    return await db.Vehicle.findAll({
//       attributes: [
//          "vehicle_id",
//          "vehicle_code",
//          "vehicle_license_plate",
//          "vehicle_model",
//          "vehicle_brand",
//          "vehicle_capacity",
//          "vehicle_manufacture_year",
//          "vehicle_color",
//          "vehicle_description",
//       ],
//       include: [
//          {
//             model: db.VehicleImage,
//             as: "vehicle_to_vehicleImage",
//             attributes: ["vehicle_image_id", "vehicle_image_url", "vehicle_image_description"],
//          },
//       ],
//       nest: true,
//       raw: true,
//    })
//       .then((vehicles) => {
//          if (!vehicles || vehicles.length == 0) {
//             throw new __RESPONSE.NotFoundError({
//                message: "Resource not found - Vehicles not found !",
//                suggestion: "Please check your request",
//                request: req,
//             });
//          }
//          return {
//             vehicles,
//             total: vehicles.length,
//          };
//       })
//       .catch((error) => {
//          throw new __RESPONSE.BadRequestError({
//             message: "Error in getting all vehicles",
//             suggestion: "Please check your request",
//             request: req,
//          });
//       });
// };

// // const getVehicleById = async (req) => {
// //    const errors = validationResult(req);
// //    if (!errors.isEmpty()) {
// //       throw new __RESPONSE.BadRequestError({
// //          message: "Validation failed " + errors.array()[0]?.msg + " !",
// //          suggestion: "Please provide the correct data",
// //          request: req,
// //       });
// //    }
// //    const {vehicleId} = req.query;
// //    return await db.Vehicle.findOne({
// //       where: {
// //          vehicle_id: vehicleId,
// //       },
// //       attributes: [
// //          "vehicle_id",
// //          "vehicle_code",
// //          "vehicle_license_plate",
// //          "vehicle_model",
// //          "vehicle_brand",
// //          "vehicle_capacity",
// //          "vehicle_manufacture_year",
// //          "vehicle_color",
// //          "vehicle_description",
// //       ],
// //       include: [
// //          {
// //             model: db.VehicleImage,
// //             as: "vehicle_to_vehicleImage",
// //             attributes: ["vehicle_image_id", "vehicle_image_url", "vehicle_image_description"],
// //          },
// //       ],
// //       nest: true,
// //       raw: true,
// //    })
// //       .then((vehicle) => {
// //          if (!vehicle) {
// //             throw new __RESPONSE.NotFoundError({
// //                message: "Resource not found - Vehicles not found !",
// //                suggestion: "Please check your request",
// //                request: req,
// //             });
// //          }
// //          return {vehicle};
// //       })
// //       .catch((error) => {
// //          if (error instanceof __RESPONSE.NotFoundError) {
// //             throw error;
// //          }
// //          throw new __RESPONSE.BadRequestError({
// //             message: "Error in getting vehicle by id " + error.message,
// //             suggestion: "Please check your request",
// //             request: req,
// //          });
// //       });
// // };

// // const createVehicle = async (req) => {
// //     const vehicle = await db.Vehicle.create({
// //       const errors = validationResult(req);
// //       if (!errors.isEmpty()) {
// //          throw new __RESPONSE.BadRequestError({
// //             message: "Validation failed " + errors.array()[0]?.msg + " !",
// //             suggestion: "Please provide the correct data",
// //             request: req,
// //          });
// //     }
// // });

// //    const {code, license_plate, model, brand, capacity, manufacture_year, color, description} = req.body;
// //    return await db.Vehicle.create({
// //       vehicle_code: code,
// //       vehicle_license_plate: license_plate,
// //       vehicle_model: model,
// //       vehicle_brand: brand,
// //       vehicle_capacity: capacity,
// //       vehicle_manufacture_year: manufacture_year,
// //       vehicle_color: color,
// //       vehicle_description: description,
// //       is_locked: locked,
// //       last_lock_at: lockat,
// //       map_vehicle_layout_id: layoutid,
// //       office_id: officeid,
// //       vehicle_type_id: vehicle_typeid,
// //    });
// //    return {
// //       id: vehicle.vehicle_id,
// //       code: vehicle.vehicle_code,
// //       license_plate: vehicle.vehicle_license_plate,
// //       model: vehicle.vehicle_model,
// //       brand: vehicle.vehicle_brand,
// //       capacity: vehicle.vehicle_capacity,
// //       manufacture_year: vehicle.vehicle_manufacture_year,
// //       color: vehicle.vehicle_color,
// //       description: vehicle.vehicle_description,
// //       locked: vehicle.is_locked,
// //       lockat: vehicle.last_lock_at,
// //       layoutid: vehicle.map_vehicle_layout_id,
// //       officeid: vehicle.office_id,
// //       vehicle_typeid: vehicle.vehicle_type_id,
// //    };
// // };

// // update
// const updateVehicle = async (req) => {
//    const {id} = req.params;
//    const {
//       code,
//       license_plate,
//       model,
//       brand,
//       capacity,
//       manufacture_year,
//       color,
//       description,
//       locked,
//       lockat,
//       layoutid,
//       officeid,
//       vehicle_typeid,
//    } = req.body;

//    if (!id || !code) {
//       return {status: 400, error: true, reason: "ID and name are required."};
//    }

//    const vehicle = await db.Vehicle.findByPk(id);
//    if (!vehicle) {
//       return {status: 404, error: true, reason: "Vehicle not found."};
//    }

//    vehicle.vehicle_code = code;
//    vehicle.vehicle_license_plate = license_plate;
//    vehicle.vehicle_model = model;
//    vehicle.vehicle_brand = brand;
//    vehicle.vehicle_capacity = capacity;
//    vehicle.vehicle_manufacture_year = manufacture_year;
//    vehicle.vehicle_color = color;
//    vehicle.vehicle_description = description;
//    vehicle.is_locked = locked;
//    vehicle.last_lock_at = lockat;
//    vehicle.map_vehicle_layout_id = layoutid;
//    vehicle.office_id = officeid;
//    vehicle.vehicle_type_id = vehicle_typeid;

//    await vehicle.save();
//    console.log(vehicle);
//    return {
//       status: 200,
//       error: false,
//       message: "Vehicle updated successfully.",
//       data: {
//          id: vehicle.vehicle_id,
//          code: vehicle.vehicle_code,
//          license_plate: vehicle.vehicle_license_plate,
//          model: vehicle.vehicle_model,
//          brand: vehicle.vehicle_brand,
//          capacity: vehicle.vehicle_capacity,
//          manufacture_year: vehicle.vehicle_manufacture_year,
//          color: vehicle.vehicle_color,
//          description: vehicle.vehicle_description,
//          locked: vehicle.is_locked,
//          lockat: vehicle.last_lock_at,
//          layoutid: vehicle.map_vehicle_layout_id,
//          officeid: vehicle.office_id,
//          vehicle_typeid: vehicle.vehicle_type_id,
//       },
//    };
// };

// // Xóa
// const deleteVehicle = async (req) => {
//    const {id} = req.params;

//    if (!id) {
//       return {status: 400, error: true, reason: "ID is required."};
//    }

//    const vehicle = await db.Vehicle.findByPk(id);
//    if (!vehicle) {
//       return {status: 404, error: true, reason: "Vehicle not found."};
//    }

//    await vehicle.destroy();

//    return {
//       status: 200,
//       error: false,
//       message: "Vehicle deleted successfully.",
//    };
// };

// module.exports = {
//    createVehicle,
//    deleteVehicle,
//    updateVehicle,
// };
//    })
//       .then((vehicle) => {
//          if (!vehicle) {
//             throw new __RESPONSE.BadRequestError({
//                message: "Error in creating vehicle",
//                suggestion: "Please check your request",
//                request: req,
//             });
//          }
//          return {vehicle};
//       })
//       .catch((error) => {
//          if (error.original?.code === "ER_DUP_ENTRY") {
//             throw new __RESPONSE.BadRequestError({
//                message: "Vehicle already exists " + error.original.sqlMessage,
//                suggestion: "Please check your request",
//                request: req,
//             });
//          }
//          throw new __RESPONSE.BadRequestError({
//             message: "Error in creating vehicle",
//             suggestion: "Please check your request",
//             request: req,
//          });
//       });
// };

// const updateVehicle = async (req) => {
//    const errors = validationResult(req);
//    if (!errors.isEmpty()) {
//       throw new __RESPONSE.BadRequestError({
//          message: "Validation failed " + errors.array()[0]?.msg + " !",
//          suggestion: "Please provide the correct data",
//          request: req,
//       });
//    }
//    const {vehicleId, code, license_plate, model, brand, capacity, manufacture_year, color, description} = req.body;
//    const vehicle = await db.Vehicle.findOne({
//       where: {
//          vehicle_id: vehicleId,
//       },
//       attributes: [
//          "vehicle_id",
//          "vehicle_code",
//          "vehicle_license_plate",
//          "vehicle_model",
//          "vehicle_brand",
//          "vehicle_capacity",
//          "vehicle_manufacture_year",
//          "vehicle_color",
//          "vehicle_description",
//       ],
//       include: [
//          {
//             model: db.VehicleImage,
//             as: "vehicle_to_vehicleImage",
//             attributes: ["vehicle_image_id", "vehicle_image_url", "vehicle_image_description"],
//          },
//       ],
//       nest: true,
//    });
//    if (!vehicle) {
//       throw new __RESPONSE.NotFoundError({
//          message: "Resource not found - Vehicles not found !",
//          suggestion: "Please check your request",
//          request: req,
//       });
//    }
//    return await vehicle
//       .update({
//          vehicle_code: code,
//          vehicle_license_plate: license_plate,
//          vehicle_model: model,
//          vehicle_brand: brand,
//          vehicle_capacity: capacity,
//          vehicle_manufacture_year: manufacture_year,
//          vehicle_color: color,
//          vehicle_description: description,
//       })
//       .then((vehicle) => {
//          if (!vehicle) {
//             throw new __RESPONSE.BadRequestError({
//                message: "Error in updating vehicle",
//                suggestion: "Please check your request",
//                request: req,
//             });
//          }
//          return {vehicle};
//       })
//       .catch((error) => {
//          if (error.original?.code === "ER_DUP_ENTRY") {
//             throw new __RESPONSE.BadRequestError({
//                message: "Vehicle already exists " + error.original.sqlMessage,
//                suggestion: "Please check your request",
//                request: req,
//             });
//          }
//          throw new __RESPONSE.BadRequestError({
//             message: "Error in updating vehicle",
//             suggestion: "Please check your request",
//             request: req,
//          });
//       });
// };

// const deleteVehicle = async (req) => {
//    const errors = validationResult(req);
//    if (!errors.isEmpty()) {
//       throw new __RESPONSE.BadRequestError({
//          message: "Validation failed " + errors.array()[0]?.msg + " !",
//          suggestion: "Please provide the correct data",
//          request: req,
//       });
//    }
//    const {vehicleId} = req.query;
//    const vehicle = await db.Vehicle.findOne({
//       where: {
//          vehicle_id: vehicleId,
//       },
//    });
//    if (!vehicle) {
//       throw new __RESPONSE.NotFoundError({
//          message: "Resource not found - vehicle not found !",
//          suggestion: "Please check your request",
//          request: req,
//       });
//    }
//    return await vehicle
//       .destroy()
//       .then((vehicle) => {
//          if (!vehicle) {
//             throw new __RESPONSE.NotFoundError({
//                message: "Resource not found - Vehicle not found !",
//                suggestion: "Please check your request",
//                request: req,
//             });
//          }
//          return {vehicle};
//       })
//       .catch((error) => {
//          if (error.original && error.original.code === "ER_ROW_IS_REFERENCED_2") {
//             throw new __RESPONSE.BadRequestError({
//                message: "Vehicle is referenced by other tables",
//                suggestion: "Please check your request",
//                request: req,
//             });
//          }
//          throw new __RESPONSE.BadRequestError({
//             message: "Error in deleting vehicle",
//             suggestion: "Please check your request",
//             request: req,
//          });
//       });
// };

// const findAllDeletedVehicle = async (req) => {
//    return await db.Vehicle.findAll({
//       attributes: [
//          "vehicle_id",
//          "vehicle_code",
//          "vehicle_license_plate",
//          "vehicle_model",
//          "vehicle_brand",
//          "vehicle_capacity",
//          "vehicle_manufacture_year",
//          "vehicle_color",
//          "vehicle_description",
//          "deleted_at",
//       ],
//       where: {
//          deleted_at: {[db.Sequelize.Op.ne]: null},
//       },
//       order: [["deleted_at", "DESC"]],
//       include: [
//          {
//             model: db.VehicleImage,
//             as: "vehicle_to_vehicleImage",
//             attributes: ["vehicle_image_id", "vehicle_image_url", "vehicle_image_description"],
//          },
//       ],
//       paranoid: false,
//       nest: true,
//       raw: true,
//    })
//       .then((vehicles) => {
//          if (!vehicles) {
//             throw new __RESPONSE.NotFoundError({
//                message: "Resource not found - List of all deleted vehicles not found !",
//                suggestion: "Please check your request",
//                request: req,
//             });
//          }
//          return {vehicles, total: vehicles.length};
//       })
//       .catch((error) => {
//          throw new __RESPONSE.BadRequestError({
//             message: "Error in finding all deleted vehicles",
//             suggestion: "Please check your request",
//             request: req,
//          });
//       });
// };

// module.exports = {
//    getAllVehicles,
//    getVehicleById,
//    createVehicle,
//    updateVehicle,
//    deleteVehicle,
//    findAllDeletedVehicle,
// };
