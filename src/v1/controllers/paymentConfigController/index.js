"use strict";

const __RESPONSE = require("../../core");
const {
   getAllPaymentConfigs,
   getPaymentConfigById,
   createPaymentConfig,
   updatePaymentConfig,
   deletePaymentConfig,
} = require("../../services/paymentConfigService");

const __PAYMENT_CONFIG_CONTROLLER = {
   getAllPaymentConfigs: async (req, res, next) => {
      try {
         new __RESPONSE.GET({
            message: "List of all payment configs",
            metadata: await getAllPaymentConfigs(),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error finding payment configs:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },

   getPaymentConfigById: async (req, res, next) => {
      try {
         new __RESPONSE.GET({
            message: "Payment config details",
            metadata: await getPaymentConfigById(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error finding payment config by ID:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },

   createPaymentConfig: async (req, res, next) => {
      try {
         new __RESPONSE.CREATED({
            message: "Payment config created successfully",
            metadata: await createPaymentConfig(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error creating payment config:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },

   updatePaymentConfig: async (req, res, next) => {
      try {
         new __RESPONSE.OK({
            message: "Payment config updated successfully",
            metadata: await updatePaymentConfig(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error updating payment config:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },

   deletePaymentConfig: async (req, res, next) => {
      try {
         new __RESPONSE.DELETE({
            message: "Payment config deleted successfully",
            metadata: await deletePaymentConfig(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error deleting payment config:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },
};

module.exports = __PAYMENT_CONFIG_CONTROLLER;