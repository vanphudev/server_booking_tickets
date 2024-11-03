"use strict";
const __RESPONSE = require("../../core");
const {validationResult} = require("express-validator");
const db = require("../../models");
const {handleUpload, deleteImage} = require("../../utils/uploadImages");
const {normalizeVietnameseString} = require("../../utils/normalizeVietnameseString");

const __OFFICE_IMAGE_FOLDER = "office_images";

const getAllOfficeImages = async (req, res) => {
   const {officeId} = req.query;
};

const getOfficeImageById = async (req, res) => {
   const {officeImageId} = req.query;
};

const getOfficeByOfficeId = async (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }
   const {officeId} = req.params;
   return await db.Office.findOne({
      where: {office_id: officeId},
      attributes: ["office_id", "office_name"],
   })
      .then((office) => {
         if (!office) {
            throw new __RESPONSE.NotFoundError({
               message: "Office not found with id " + officeId,
               suggestion: "Please try again with correct office id",
               request: req,
            });
         }
         return office;
      })
      .catch((error) => {
         if (error instanceof __RESPONSE.NotFoundError) {
            throw error;
         }
         throw new __RESPONSE.BadRequestError({
            message: "Get office failed " + error.message,
            suggestion: "Please try again with correct data " + error.message,
            request: req,
         });
      });
};

const createOfficeImage = async (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }
   const {officeId} = req.params;
   const office = await db.Office.findOne({
      where: {office_id: officeId},
      attributes: ["office_id", "office_name"],
   });
   if (!office) {
      throw new __RESPONSE.NotFoundError({
         message: "Office not found with id " + officeId,
         suggestion: "Please try again with correct office id",
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
               const officeImage = await db.OfficeImage.create(
                  {
                     office_id: office.office_id,
                     office_image_url: image.url,
                     office_image_public_id: image.public_id,
                     office_image_description: image.original_name,
                  },
                  {transaction}
               );
               if (!officeImage) {
                  throw new __RESPONSE.BadRequestError({
                     message: "Create office image failed " + error.message,
                     suggestion: "Please try again with correct data " + error.message,
                     request: req,
                  });
               }
               return officeImage;
            })
         );
         return createdImages;
      });
      return {
         officeImages: result,
      };
   } catch (error) {
      if (error instanceof __RESPONSE.BadRequestError) {
         throw error;
      }
      throw new __RESPONSE.BadRequestError({
         message: "Create office image failed " + error.message,
         suggestion: "Please try again with correct data " + error.message,
         request: req,
      });
   }
};

const updateOfficeImage = async (req, res) => {
   const {officeImageId} = req.query;
};

const deleteOfficeImage = async (req, res) => {
   const {officeImageId} = req.query;
};

const findAllDeletedOfficeImages = async (req, res) => {
   const {officeId} = req.query;
};

module.exports = {
   getAllOfficeImages,
   getOfficeImageById,
   getOfficeByOfficeId,
   createOfficeImage,
   updateOfficeImage,
   deleteOfficeImage,
   findAllDeletedOfficeImages,
};
