"use strict";
const __RESPONSE = require("../../core");
const {validationResult} = require("express-validator");
const {handleUpload, deleteImage} = require("../../utils/uploadImages");
const db = require("../../models");

const getAllCustomers = async (req) => {
   return await db.Office.findAll({
      attributes: [
         "customer_id",
         "customer_full_name",
         "customer_email",
         "customer_gender",
         "customer_birthday",
         "customer_avatar_url",
         "customer_destination_address",
         "customer_password",
         "is_disabled",
         "last_login_at",
         "access_token",
         "refresh_token",
         "is_deleted",
         "created_at",
         "updated_at",
      ],
      include: [
         {
            model: db.CustomerType,
            as: "office_to_officeImage",
            attributes: ["customer_type_id", "customer_type_name", "customer_type_description"],
         },
         {
            model: db.GroupCustomer,
            as: "group_id",
            attributes: ["ward_id", "ward_name"],
         },
         {
            model: db.Group,
            as: "vehicleType_belongto_vehicle",
            attributes: ["group_id", "group_name", "group_description", "is_deleted", "is_locked","created_at", "updated_at"],
         },
      ],
   })
      .then((offices) => {
         if (!offices || offices.length === 0) {
            throw new __RESPONSE.NotFoundError({
               message: "Resource not found - Offices not found !",
               suggestion: "Please check your request",
               request: req,
            });
         }
         return {
            offices,
            total: offices.length,
         };
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Error in getting all offices" + error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};

const getCustomerById = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }
   const {officeId} = req.query;
   return await db.Office.findOne({
      where: {
         office_id: officeId,
      },
      attributes: [
         "office_id",
         "office_name",
         "office_address",
         "office_phone",
         "office_fax",
         "office_description",
         "office_latitude",
         "office_longitude",
         "office_map_url",
      ],
      include: [
         {
            model: db.OfficeImage,
            as: "office_to_officeImage",
            attributes: ["office_image_id", "office_image_url", "office_image_description"],
         },
      ],
      nest: true,
      raw: true,
      attributes: [
         "office_id",
         "office_name",
         "office_address",
         "office_phone",
         "office_fax",
         "office_description",
         "office_latitude",
         "office_longitude",
         "office_map_url",
      ],
      include: [
         {
            model: db.OfficeImage,
            as: "office_to_officeImage",
            attributes: ["office_image_id", "office_image_url", "office_image_description"],
         },
      ],
      nest: true,
      raw: true,
   })
      .then((office) => {
         if (!office) {
            throw new __RESPONSE.NotFoundError({
               message: "Resource not found - Offices not found !",
               suggestion: "Please check your request",
               request: req,
            });
         }
         return {office};
      })
      .catch((error) => {
         if (error instanceof __RESPONSE.NotFoundError) {
            throw error;
         }
         throw new __RESPONSE.BadRequestError({
            message: "Error in getting office by id " + error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};

const createCustomer = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }
   const {name, address, phone, fax, description, latitude, longitude, map_url, isLocked, lastLockAt, wardId} =
      req.body;
   return await db.Office.create({
      office_name: name,
      office_address: address,
      office_phone: phone,
      office_fax: fax,
      office_description: description,
      office_latitude: latitude,
      office_longitude: longitude,
      office_map_url: map_url,
      ward_id: wardId,
      is_locked: isLocked && isLocked == 1 ? 1 : 0,
      last_lock_at: isLocked && isLocked == 1 ? new Date() : null,
   })
      .then((office) => {
         if (!office) {
            throw new __RESPONSE.BadRequestError({
               message: "Error in creating office",
               suggestion: "Please check your request",
               request: req,
            });
         }
         return {office};
      })
      .catch((error) => {
         if (error.original?.code === "ER_DUP_ENTRY") {
            throw new __RESPONSE.BadRequestError({
               message: "Office already exists " + error.original.sqlMessage,
               suggestion: "Please check your request",
               request: req,
            });
         }
         throw new __RESPONSE.BadRequestError({
            message: "Error in creating office" + error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};

const updateCustomer = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }
   const {
      officeId,
      name,
      address,
      phone,
      fax,
      description,
      latitude,
      longitude,
      map_url,
      isLocked,
      lastLockAt,
      wardId,
   } = req.body;

   const office = await db.Office.findOne({
      where: {
         office_id: officeId,
      },
   });

   if (!office) {
      throw new __RESPONSE.NotFoundError({
         message: "Resource not found - Office not found !",
         suggestion: "Please check your request",
         request: req,
      });
   }

   return await office
      .update({
         office_name: name,
         office_address: address,
         office_phone: phone,
         office_fax: fax,
         office_description: description,
         office_latitude: latitude,
         office_longitude: longitude,
         office_map_url: map_url,
         ward_id: wardId,
         is_locked: isLocked && isLocked == 1 ? 1 : 0,
         last_lock_at: isLocked && isLocked == 1 ? new Date() : null,
      })
      .then((office) => {
         if (!office) {
            throw new __RESPONSE.BadRequestError({
               message: "Error in updating office",
               suggestion: "Please check your request",
               request: req,
            });
         }
         return {office};
      })
      .catch((error) => {
         if (error.original?.code === "ER_DUP_ENTRY") {
            throw new __RESPONSE.BadRequestError({
               message: "Office already exists " + error.original.sqlMessage,
               suggestion: "Please check your request",
               request: req,
            });
         }
         throw new __RESPONSE.BadRequestError({
            message: "Error in updating office",
            suggestion: "Please check your request",
            request: req,
         });
      });
};

const deleteCustomer = async (req) => {
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
      where: {
         office_id: officeId,
      },
   });

   if (!office) {
      throw new __RESPONSE.NotFoundError({
         message: "Resource not found - Office not found !",
         suggestion: "Please check your request",
         request: req,
      });
   }

   const officeImages = await db.OfficeImage.findAll({
      where: {
         office_id: officeId,
      },
   });

   try {
      if (officeImages && officeImages.length > 0) {
         officeImages.forEach(async (image) => {
            await image.destroy();
            await deleteImage(image.office_image_public_id);
         });
      }
   } catch (error) {
      throw new __RESPONSE.BadRequestError({
         message: "Error in deleting office images",
         suggestion: "Please check your request",
         request: req,
      });
   }

   return await office
      .destroy()
      .then((office) => {
         if (!office) {
            throw new __RESPONSE.NotFoundError({
               message: "Resource not found - Offices not found !",
               suggestion: "Please check your request",
               request: req,
            });
         }
         return {office};
      })
      .catch((error) => {
         if (error.original && error.original.code === "ER_ROW_IS_REFERENCED_2") {
            throw new __RESPONSE.BadRequestError({
               message: "Office is referenced by other tables",
               suggestion: "Please check your request",
               request: req,
            });
         }
         throw new __RESPONSE.BadRequestError({
            message: "Error in deleting office",
            suggestion: "Please check your request",
            request: req,
         });
      });
};

const findAllDeletedCustomer = async (req) => {
   return await db.Customer.findAll({
      attributes: [
         "office_id",
         "office_name",
         "office_address",
         "office_phone",
         "office_fax",
         "office_description",
         "office_latitude",
         "office_longitude",
         "office_map_url",
         "deleted_at",
      ],
      where: {
         deleted_at: {[db.Sequelize.Op.ne]: null},
      },
      order: [["deleted_at", "DESC"]],
      include: [
         {
            model: db.OfficeImage,
            as: "office_to_officeImage",
            attributes: ["office_image_id", "office_image_url", "office_image_description"],
         },
      ],
      paranoid: false,
      nest: true,
      raw: true,
   })
      .then((offices) => {
         if (!offices) {
            throw new __RESPONSE.NotFoundError({
               message: "Resource not found - List of all deleted offices not found !",
               suggestion: "Please check your request",
               request: req,
            });
         }
         return {offices, total: offices.length};
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Error in finding all deleted offices",
            suggestion: "Please check your request",
            request: req,
         });
      });
};

module.exports = {
   getCustomerById,
   getAllCustomers,
   createCustomer,
   updateCustomer,
   deleteCustomer,
   findAllDeletedCustomer,
 
};
