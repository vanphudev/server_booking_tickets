"use strict";
const __RESPONSE = require("../../core");
const {validationResult} = require("express-validator");
const db = require("../../models");

const getAllPaymentConfigs = async () => {
   try {
      const configs = await db.PaymentConfig.findAll({
         attributes: [
            "payment_config_id",
            "api_key",
            "secret_key",
            "public_key",
            "payment_endpoint_url",
            "transaction_timeout",
            "environment",
            "payment_method_id",
            "created_at",
            "updated_at"
         ],
         include: [
            {
               model: db.PaymentMethod,
               as: "paymentConfig_onetoOne_paymentMethod",
               attributes: ["payment_method_id", "payment_method_code", "payment_method_name"]
            }
         ],
         where: {
            deleted_at: null
         },
         order: [["payment_config_id", "ASC"]]
      });

      return {configs, total: configs.length};
   } catch (error) {
      console.error("getAllPaymentConfigs Error:", error);
      throw new __RESPONSE.BadRequestError({
         message: "Error in finding all payment configs",
         suggestion: "Please check database connection",
         details: error.message,
      });
   }
};

const getPaymentConfigById = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed: " + errors.array()[0]?.msg,
            suggestion: "Please provide the correct data",
         });
      }

      const {configId} = req.query;
      const config = await db.PaymentConfig.findOne({
         where: {
            payment_config_id: configId,
            deleted_at: null
         },
         attributes: [
            "payment_config_id",
            "api_key",
            "secret_key",
            "public_key",
            "payment_endpoint_url",
            "transaction_timeout",
            "environment",
            "payment_method_id",
            "created_at",
            "updated_at"
         ],
         include: [
            {
               model: db.PaymentMethod,
               as: "paymentConfig_onetoOne_paymentMethod",
               attributes: ["payment_method_id", "payment_method_code", "payment_method_name"]
            }
         ]
      });

      if (!config) {
         throw new __RESPONSE.NotFoundError({
            message: "Payment config not found",
            suggestion: "Please check the payment config ID",
         });
      }

      return {config};
   } catch (error) {
      console.error("getPaymentConfigById Error:", error);
      if (error instanceof __RESPONSE.NotFoundError) throw error;
      throw new __RESPONSE.BadRequestError({
         message: "Error in finding payment config",
         suggestion: "Please check your request",
         details: error.message,
      });
   }
};

const createPaymentConfig = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed: " + errors.array()[0]?.msg,
            suggestion: "Please provide the correct data",
         });
      }

      const {
         api_key,
         secret_key,
         public_key,
         payment_endpoint_url,
         transaction_timeout,
         environment,
         payment_method_id
      } = req.body;

      const config = await db.PaymentConfig.create({
         api_key,
         secret_key,
         public_key,
         payment_endpoint_url,
         transaction_timeout,
         environment,
         payment_method_id
      });

      const newConfig = await db.PaymentConfig.findOne({
         where: {payment_config_id: config.payment_config_id},
         include: [
            {
               model: db.PaymentMethod,
               as: "paymentConfig_onetoOne_paymentMethod",
               attributes: ["payment_method_id", "payment_method_code", "payment_method_name"]
            }
         ]
      });

      return {config: newConfig};
   } catch (error) {
      console.error("createPaymentConfig Error:", error);
      throw new __RESPONSE.BadRequestError({
         message: "Error in creating payment config",
         suggestion: "Please check your request",
         details: error.message,
      });
   }
};

const updatePaymentConfig = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed: " + errors.array()[0]?.msg,
            suggestion: "Please provide the correct data",
         });
      }

      const {configId} = req.params;
      const updateData = req.body;

      const config = await db.PaymentConfig.findOne({
         where: {
            payment_config_id: configId,
            deleted_at: null
         }
      });

      if (!config) {
         throw new __RESPONSE.NotFoundError({
            message: "Payment config not found",
            suggestion: "Please check the payment config ID",
         });
      }

      await config.update(updateData);

      const updatedConfig = await db.PaymentConfig.findOne({
         where: {payment_config_id: configId},
         include: [
            {
               model: db.PaymentMethod,
               as: "paymentConfig_onetoOne_paymentMethod",
               attributes: ["payment_method_id", "payment_method_code", "payment_method_name"]
            }
         ]
      });

      return {config: updatedConfig};
   } catch (error) {
      console.error("updatePaymentConfig Error:", error);
      throw new __RESPONSE.BadRequestError({
         message: "Error in updating payment config",
         suggestion: "Please check your request",
         details: error.message,
      });
   }
};

const deletePaymentConfig = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed: " + errors.array()[0]?.msg,
            suggestion: "Please provide the correct data",
         });
      }

      const {configId} = req.params;
      const config = await db.PaymentConfig.findOne({
         where: {
            payment_config_id: configId,
            deleted_at: null
         }
      });

      if (!config) {
         throw new __RESPONSE.NotFoundError({
            message: "Payment config not found",
            suggestion: "Please check the payment config ID",
         });
      }

      await config.destroy(); // Soft delete vì đã có paranoid: true

      return {message: "Payment config deleted successfully"};
   } catch (error) {
      console.error("deletePaymentConfig Error:", error);
      throw new __RESPONSE.BadRequestError({
         message: "Error in deleting payment config",
         suggestion: "Please check your request",
         details: error.message,
      });
   }
};

module.exports = {
   getAllPaymentConfigs,
   getPaymentConfigById,
   createPaymentConfig,
   updatePaymentConfig,
   deletePaymentConfig,
};