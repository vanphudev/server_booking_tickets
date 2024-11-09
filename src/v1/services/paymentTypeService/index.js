"use strict";
const __RESPONSE = require("../../core");
const { validationResult } = require("express-validator");
const db = require("../../models");

const getAllPaymentTypes = async () => {
   return await db.PaymentType.findAll({
      attributes: ['payment_type_id', 'payment_type_name'],
   })
      .then((types) => {
         if (!types || types.length === 0) {
            throw new __RESPONSE.NotFoundError({
               message: "Resource not found - PaymentTypes not found!",
               suggestion: "Please check your request",
            });
         }
         return { types, total: types.length };
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Error in finding all payment types",
            suggestion: "Please check your request",
         });
      });
};

const getPaymentTypeById = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed: " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const { typeId } = req.query;
   return await db.PaymentType.findOne({
      where: { payment_type_id: typeId },
      attributes: ['payment_type_id', 'payment_type_name'],
   })
      .then((type) => {
         if (!type) {
            throw new __RESPONSE.NotFoundError({
               message: "Resource not found - PaymentType not found!",
               suggestion: "Please check your request",
            });
         }
         return { type };
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Error in finding payment type: " + error.message,
            suggestion: "Please check your request",
         });
      });
};

const createPaymentType = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed: " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const { name } = req.body;
   return await db.PaymentType.create({
      payment_type_name: name,
   })
      .then((type) => {
         if (!type) {
            throw new __RESPONSE.BadRequestError({
               message: "Error in creating payment type",
               suggestion: "Please check your request",
               request: req,
            });
         }
         return { type };
      })
      .catch((error) => {
         if (error.original?.code === "ER_DUP_ENTRY") {
            throw new __RESPONSE.BadRequestError({
               message: "Payment type name already exists: " + error.original.sqlMessage,
               suggestion: "Please use different payment type name",
               request: req,
            });
         }
         throw new __RESPONSE.BadRequestError({
            message: "Error in creating payment type: " + error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};

const updatePaymentType = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed: " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const id = parseInt(req.params.id);
   const { name } = req.body;

   const type = await db.PaymentType.findOne({
      where: { payment_type_id: id },
   });

   if (!type) {
      throw new __RESPONSE.NotFoundError({
         message: "Resource not found - PaymentType not found!",
         suggestion: "Please check your request",
         request: req,
      });
   }

   return await type
      .update({
         payment_type_name: name || type.payment_type_name,
      })
      .then((updatedType) => {
         return { type: updatedType };
      })
      .catch((error) => {
         if (error.original?.code === "ER_DUP_ENTRY") {
            throw new __RESPONSE.BadRequestError({
               message: "Payment type name already exists: " + error.original.sqlMessage,
               suggestion: "Please use different payment type name",
               request: req,
            });
         }
         throw new __RESPONSE.BadRequestError({
            message: "Error in updating payment type: " + error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};

const deletePaymentType = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed: " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const id = parseInt(req.params.id);

   const type = await db.PaymentType.findOne({
      where: { payment_type_id: id },
   });

   if (!type) {
      throw new __RESPONSE.NotFoundError({
         message: "Resource not found - PaymentType not found!",
         suggestion: "Please check your request",
         request: req,
      });
   }

   return await type
      .destroy()
      .then(() => {
         return { message: "PaymentType deleted successfully" };
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Error in deleting payment type: " + error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};

module.exports = {
   getAllPaymentTypes,
   getPaymentTypeById,
   createPaymentType,
   updatePaymentType,
   deletePaymentType,
};