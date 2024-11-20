"use strict";
const __RESPONSE = require("../../core");
const {validationResult} = require("express-validator");
const db = require("../../models");
const {handleUpload, deleteImage} = require("../../utils/uploadImages");
const {normalizeVietnameseString} = require("../../utils/normalizeVietnameseString");
const __VEHICLE_IMAGE_FOLDER = "vehicle_images";

const getAllVehicleImages = async (req, res) => {
   const {vehicleId} = req.query;
   // try {
   //    const vehicleImages = await db.VehicleImage.findAll({
   //       attributes: [
   //          "vehicle_image_id",
   //          "vehicle_image_url",
   //          "vehicle_image_description",
   //          "vehicle_image_public_id",
   //          "vehicle_id",
   //       ],
   //       include: [
   //          {
   //             model: db.Vehicle,
   //             as: "vehicleImage_belongto_vehicle",
   //             attributes: ["vehicle_id", "vehicle_code"],
   //          },
   //       ],
   //       nest: true,
   //       raw: true,
   //    });

   //    if (!vehicleImages?.length) {
   //       throw new __RESPONSE.NotFoundError({
   //          message: "Không tìm thấy hình ảnh phương tiện nào",
   //          suggestion: "Vui lòng kiểm tra lại yêu cầu",
   //          request: req,
   //       });
   //    }

   //    return {
   //       vehicleImages,
   //       total: vehicleImages.length,
   //    };
   // } catch (error) {
   //    if (error instanceof __RESPONSE.NotFoundError) {
   //       throw error;
   //    }

   //    throw new __RESPONSE.BadRequestError({
   //       message: `Lỗi khi lấy danh sách hình ảnh: ${error.message}`,
   //       suggestion: "Vui lòng kiểm tra lại yêu cầu",
   //       request: req,
   //    });
   // }
};

const getVehicleImageById = async (req, res) => {
   const {vehicleImageId} = req.query;
};

const getVehicleByVehicleId = async (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }
   const vehicleid = req.headers.vehicleid;
   return await db.Vehicle.findOne({
      where: {vehicle_id: vehicleid},
      attributes: ["vehicle_id", "vehicle_code"],
   })
      .then((vehicle) => {
         if (!vehicle) {
            throw new __RESPONSE.NotFoundError({
               message: "Vehicles not found with id " + vehicleid,
               suggestion: "Please try again with correct vehicle id",
               request: req,
            });
         }
         return vehicle;
      })
      .catch((error) => {
         if (error instanceof __RESPONSE.NotFoundError) {
            throw error;
         }
         throw new __RESPONSE.BadRequestError({
            message: "Get vehicle failed " + error.message,
            suggestion: "Please try again with correct data " + error.message,
            request: req,
         });
      });
};

const createVehicleImage = async (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }
   const vehicleid =req.headers.vehicleid;
   const vehicle = await db.Vehicle.findOne({
      where: {vehicle_id: vehicleid},
      attributes: ["vehicle_id", "vehicle_code"],
   });
   if (!vehicle) {
      throw new __RESPONSE.NotFoundError({
         message: "Vehicle not found with id " + vehicleid,
         suggestion: "Please try again with correct vehicle id",
         request: req,
      });
   }

   const uploadedImages = req.uploadedImages;
   console.log("uploadedImages", uploadedImages);
   if (!uploadedImages || uploadedImages.length === 0) {
      throw new __RESPONSE.BadRequestError({
         message: "No image uploaded !",
         suggestion: "Please try again with correct data",
         request: req,
      });
   }
   try {
      const result = await db.sequelize.transaction(async (transaction) => {
         const createdImages = await Promise.all(
            uploadedImages.map(async (image) => {
               const vehicleImage = await db.VehicleImage.create(
                  {
                     vehicle_id: vehicle.vehicle_id,
                     vehicle_image_url: image.url,
                     vehicle_image_public_id: image.public_id,
                     vehicle_image_description: image.original_name,
                  },
                  {transaction}
               );
               if (!vehicleImage) {
                  throw new __RESPONSE.BadRequestError({
                     message: "Create vehicle image failed " + error.message,
                     suggestion: "Please try again with correct data " + error.message,
                     request: req,
                  });
               }
               return vehicleImage;
            })
         );
         return createdImages;
      });
      return {
         createdImages: result,
      };
   } catch (error) {
      if (error instanceof __RESPONSE.BadRequestError) {
         throw error;
      }
      throw new __RESPONSE.BadRequestError({
         message: "Create vehicle image failed " + error.message,
         suggestion: "Please try again with correct data " + error.message,
         request: req,
      });
   }
};

const deleteVehicleImage = async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const { vehicleImageId } = req.query;

   try {
      const vehicleImage = await db.VehicleImage.findOne({
         where: { vehicle_image_id: vehicleImageId },
         include: [
            {
               model: db.Vehicle,
               as: "vehicleImage_belongto_vehicle",
               attributes: ["vehicle_id", "vehicle_code"],
            },
         ],
      });

      if (!vehicleImage) {
         throw new __RESPONSE.NotFoundError({
            message: "Không tìm thấy hình ảnh phương tiện với ID " + vehicleImageId,
            suggestion: "Vui lòng kiểm tra lại ID hình ảnh",
            request: req,
         });
      }

      if (vehicleImage.vehicle_image_public_id) {
         try {
            await deleteImage(vehicleImage.vehicle_image_public_id);
         } catch (cloudError) {
            console.error("Lỗi khi xóa ảnh trên cloud:", cloudError);
         }
      }

      // Xóa record trong database
      await vehicleImage.destroy();

      return {
         deletedImage: {
            vehicle_image_id: vehicleImage.vehicle_image_id,
            vehicle_image_url: vehicleImage.vehicle_image_url,
            vehicle_image_description: vehicleImage.vehicle_image_description,
            vehicle: vehicleImage.vehicleImage_belongto_vehicle
         }
      };

   } catch (error) {
      if (error instanceof __RESPONSE.NotFoundError) {
         throw error;
      }

      throw new __RESPONSE.BadRequestError({
         message: "Lỗi khi xóa hình ảnh phương tiện: " + error.message,
         suggestion: "Vui lòng thử lại",
         request: req,
      });
   }
};

const deleteAllVehicleImages = async (req, res) => {
   const {vehicleId} = req.query;
};

// Thêm hàm tìm kiếm các ảnh đã xóa
const findAllDeleteVehicleImages = async (req, res) => {
   try {
      const vehicleImages = await db.VehicleImage.findAll({
         where: {
            deleted_at: { [db.Sequelize.Op.ne]: null }
         },
         attributes: [
            "vehicle_image_id",
            "vehicle_image_url",
            "vehicle_image_description",
            "vehicle_image_public_id",
            "vehicle_id",
            "deleted_at"
         ],
         include: [
            {
               model: db.Vehicle,
               as: "vehicleImage_belongto_vehicle",
               attributes: ["vehicle_id", "vehicle_code"],
            },
         ],
         paranoid: false, 
         nest: true,
         raw: true,
      });

      if (!vehicleImages?.length) {
         throw new __RESPONSE.NotFoundError({
            message: "Không tìm thấy hình ảnh phương tiện đã xóa nào",
            suggestion: "Danh sách hình ảnh đã xóa trống",
            request: req,
         });
      }

      return {
         vehicleImages,
         total: vehicleImages.length,
      };
   } catch (error) {
      if (error instanceof __RESPONSE.NotFoundError) {
         throw error;
      }

      throw new __RESPONSE.BadRequestError({
         message: "Lỗi khi lấy danh sách hình ảnh đã xóa: " + error.message,
         suggestion: "Vui lòng thử lại",
         request: req,
      });
   }
};

const updateVehicleImage = async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const vehicleid = req.headers.vehicleid;
   const vehicle = await db.Vehicle.findOne({
         where: { vehicle_id: vehicleid },
      });

      if (!vehicle) {
         throw new __RESPONSE.NotFoundError({
            message: "Không tìm thấy hình ảnh phương tiện với ID " + vehicleImageId,
            suggestion: "Vui lòng kiểm tra lại ID hình ảnh",
            request: req,
         });
      }

      const vehicleImages = await db.VehicleImage.findAll({
         where: { vehicle_id: vehicle.vehicle_id },
      });

      if (vehicleImages && vehicleImages.length !== 0) {
         await Promise.all(
            vehicleImages.map(async (image) => {
               await deleteImage(image.vehicle_image_public_id);
            })
         ).catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Delete office image failed to Cloud " + error.message,
            suggestion: "Please try again with correct data" + error.message,
            request: req,
         });
      });

      const deletedImages = await db.VehicleImage.destroy({
         where: {vehicle_id: vehicle.vehicle_id},
      });

      if (deletedImages < 0) {
         throw new __RESPONSE.BadRequestError({
            message: "Delete vehicle image failed to update",
            suggestion: "Please try again with correct data",
            request: req,
         });
      }
   }
   const uploadedImages = req.uploadedImages;
   if (!uploadedImages || uploadedImages.length === 0) {
      return;
   }
   try {
      const result = await db.sequelize.transaction(async (transaction) => {
         const createdImages = await Promise.all(
            uploadedImages.map(async (image) => {
               const vehicleImage = await db.VehicleImage.create(
                  {
                     vehicle_id: vehicle.vehicle_id,
                     vehicle_image_url: image.url,
                     vehicle_image_public_id: image.public_id,
                     vehicle_image_description: image.original_name,
                  },
                  {transaction}
               );
               if (!vehicleImage) {
                  throw new __RESPONSE.BadRequestError({
                     message: "Create office image failed " + error.message,
                     suggestion: "Please try again with correct data " + error.message,
                     request: req,
                  });
               }
               return vehicleImage;
            })
         );
         return createdImages;
      });
      return {
         vehicleImages: result,
      };
   } catch (error) {
      if (error instanceof __RESPONSE.BadRequestError) {
         throw error;
      }
      throw new __RESPONSE.BadRequestError({
         message: "Create vehicle image failed " + error.message,
         suggestion: "Please try again with correct data " + error.message,
         request: req,
      });
   }
};
     

module.exports = {
   getAllVehicleImages,
   getVehicleImageById,
   getVehicleByVehicleId,
   createVehicleImage,
   deleteVehicleImage,
   findAllDeleteVehicleImages,
   updateVehicleImage,
   deleteAllVehicleImages
};