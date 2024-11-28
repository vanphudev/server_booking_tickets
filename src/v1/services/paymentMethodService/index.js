"use strict";
const __RESPONSE = require("../../core");
const {validationResult} = require("express-validator");
const db = require("../../models");

const getAllPaymentMethod = async () => {
   try {
      const methods = await db.PaymentMethod.findAll({
         attributes: [
            "payment_method_id",
            "payment_method_code",
            "payment_method_name",
            "payment_method_avatar_url",
            "payment_method_avatar_public_id",
            "is_locked",
            "last_lock_at",
            "payment_method_description",
            "payment_type_id",
         ],
         include: [
            {
               model: db.PaymentType,
               as: "paymentMethod_belongto_paymentType",
               attributes: ["payment_type_name"],
            },
         ],
         order: [["payment_method_id", "ASC"]],
         where: {
            deleted_at: null,
         },
      });

      return {methods, total: methods.length};
   } catch (error) {
      console.error("getAllPaymentMethod Error:", error);
      throw new __RESPONSE.BadRequestError({
         message: "Error in finding all payment methods",
         suggestion: "Please check database connection",
         details: error.message,
      });
   }
};

const getPaymentMethodById = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed: " + errors.array()[0]?.msg,
            suggestion: "Please provide the correct data",
         });
      }

      const {methodId} = req.query;
      const method = await db.PaymentMethod.findOne({
         where: {
            payment_method_id: methodId,
            deleted_at: null,
         },
         attributes: [
            "payment_method_id",
            "payment_method_code",
            "payment_method_name",
            "payment_method_avatar_url",
            "payment_method_avatar_public_id",
            "is_locked",
            "last_lock_at",
            "payment_method_description",
            "payment_type_id",
         ],
         include: [
            {
               model: db.PaymentType,
               as: "paymentMethod_belongto_paymentType",
               attributes: ["payment_type_name"],
            },
         ],
      });

      if (!method) {
         throw new __RESPONSE.NotFoundError({
            message: "PaymentMethod not found",
            suggestion: "Please check the payment method ID",
         });
      }

      return {method};
   } catch (error) {
      console.error("getPaymentMethodById Error:", error);
      if (error instanceof __RESPONSE.NotFoundError) throw error;
      throw new __RESPONSE.BadRequestError({
         message: "Error in finding payment method",
         suggestion: "Please check your request",
         details: error.message,
      });
   }
};

const createPaymentMethod = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed: " + errors.array()[0]?.msg,
            suggestion: "Please provide the correct data",
         });
      }

      const {code, name, avatar_url, avatar_public_id, islocked, lock_at, description, paymenttypeid} = req.body;

      // Kiểm tra payment type tồn tại
      if (paymenttypeid) {
         const paymentType = await db.PaymentType.findByPk(paymenttypeid);
         if (!paymentType) {
            throw new __RESPONSE.NotFoundError({
               message: "PaymentType not found",
               suggestion: "Please check the payment type ID",
            });
         }
      }

      const method = await db.PaymentMethod.create({
         payment_method_code: code,
         payment_method_name: name,
         payment_method_avatar_url: avatar_url,
         payment_method_avatar_public_id: avatar_public_id,
         is_locked: islocked ? 1 : 0,
         last_lock_at: lock_at,
         payment_method_description: description,
         payment_type_id: paymenttypeid,
      });

      const newMethod = await db.PaymentMethod.findOne({
         where: {payment_method_id: method.payment_method_id},
         attributes: [
            "payment_method_id",
            "payment_method_code",
            "payment_method_name",
            "payment_method_avatar_url",
            "payment_method_avatar_public_id",
            "is_locked",
            "last_lock_at",
            "payment_method_description",
            "payment_type_id",
         ],
         include: [
            {
               model: db.PaymentType,
               as: "paymentMethod_belongto_paymentType",
               attributes: ["payment_type_name"],
            },
         ],
      });

      return {method: newMethod};
   } catch (error) {
      console.error("createPaymentMethod Error:", error);
      if (error.name === "SequelizeUniqueConstraintError") {
         throw new __RESPONSE.BadRequestError({
            message: "Payment method code or name already exists",
            suggestion: "Please use different code and name",
         });
      }
      throw new __RESPONSE.BadRequestError({
         message: "Error in creating payment method",
         suggestion: "Please check your request",
         details: error.message,
      });
   }
};

const updatePaymentMethod = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed: " + errors.array()[0]?.msg,
            suggestion: "Please provide the correct data",
         });
      }

      const id = parseInt(req.params.id);
      const {code, name, avatar_url, avatar_public_id, islocked, lock_at, description, paymenttypeid} = req.body;

      const method = await db.PaymentMethod.findOne({
         where: {
            payment_method_id: id,
            deleted_at: null,
         },
      });

      if (!method) {
         throw new __RESPONSE.NotFoundError({
            message: "PaymentMethod not found",
            suggestion: "Please check the payment method ID",
         });
      }

      if (paymenttypeid) {
         const paymentType = await db.PaymentType.findByPk(paymenttypeid);
         if (!paymentType) {
            throw new __RESPONSE.NotFoundError({
               message: "PaymentType not found",
               suggestion: "Please check the payment type ID",
            });
         }
      }

      await method.update({
         payment_method_code: code || method.payment_method_code,
         payment_method_name: name || method.payment_method_name,
         payment_method_avatar_url: avatar_url || method.payment_method_avatar_url,
         payment_method_avatar_public_id: avatar_public_id || method.payment_method_avatar_public_id,
         is_locked: islocked !== undefined ? (islocked ? 1 : 0) : method.is_locked,
         last_lock_at: lock_at || method.last_lock_at,
         payment_method_description: description || method.payment_method_description,
         payment_type_id: paymenttypeid || method.payment_type_id,
      });

      const updatedMethod = await db.PaymentMethod.findOne({
         where: {payment_method_id: id},
         attributes: [
            "payment_method_id",
            "payment_method_code",
            "payment_method_name",
            "payment_method_avatar_url",
            "payment_method_avatar_public_id",
            "is_locked",
            "last_lock_at",
            "payment_method_description",
            "payment_type_id",
         ],
         include: [
            {
               model: db.PaymentType,
               as: "paymentMethod_belongto_paymentType",
               attributes: ["payment_type_name"],
            },
         ],
      });

      return {method: updatedMethod};
   } catch (error) {
      console.error("updatePaymentMethod Error:", error);
      if (error.name === "SequelizeUniqueConstraintError") {
         throw new __RESPONSE.BadRequestError({
            message: "Payment method code or name already exists",
            suggestion: "Please use different code and name",
         });
      }
      throw new __RESPONSE.BadRequestError({
         message: "Error in updating payment method",
         suggestion: "Please check your request",
         details: error.message,
      });
   }
};

const deletePaymentMethod = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed: " + errors.array()[0]?.msg,
            suggestion: "Please provide the correct data",
         });
      }

      const id = parseInt(req.params.id);
      const method = await db.PaymentMethod.findOne({
         where: {
            payment_method_id: id,
            deleted_at: null,
         },
      });

      if (!method) {
         throw new __RESPONSE.NotFoundError({
            message: "PaymentMethod not found",
            suggestion: "Please check the payment method ID",
         });
      }

      await method.destroy();
      return {message: "PaymentMethod deleted successfully"};
   } catch (error) {
      console.error("deletePaymentMethod Error:", error);
      throw new __RESPONSE.BadRequestError({
         message: "Error in deleting payment method",
         suggestion: "Please check your request",
         details: error.message,
      });
   }
};

module.exports = {
   getAllPaymentMethod,
   getPaymentMethodById,
   createPaymentMethod,
   updatePaymentMethod,
   deletePaymentMethod,
};
