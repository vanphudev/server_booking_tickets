"use strict";

const __RESPONSE = require("../../core");
const {
   getAllPaymentMethod,
   getPaymentMethodById,
   createPaymentMethod,
   updatePaymentMethod,
   deletePaymentMethod,
} = require("../../services/paymentMethodService");

const __PAYMENT_METHOD_CONTROLLER = {
   getAllPaymentMethod: async (req, res, next) => {
      try {
         new __RESPONSE.GET({
            message: "List of all payment methods",
            metadata: await getAllPaymentMethod(),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error finding payment methods:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },

   getPaymentMethodById: async (req, res, next) => {
      try {
         new __RESPONSE.GET({
            message: "Payment method details",
            metadata: await getPaymentMethodById(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error finding payment method by ID:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },

   createPaymentMethod: async (req, res, next) => {
      try {
         new __RESPONSE.CREATED({
            message: "Payment method created successfully",
            metadata: await createPaymentMethod(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error creating payment method:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },

   updatePaymentMethod: async (req, res, next) => {
      try {
         new __RESPONSE.OK({
            message: "Payment method updated successfully",
            metadata: await updatePaymentMethod(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error updating payment method:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },

   deletePaymentMethod: async (req, res, next) => {
      try {
         new __RESPONSE.DELETE({
            message: "Payment method deleted successfully",
            metadata: await deletePaymentMethod(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error deleting payment method:", error);
         res.status(error.statusCode || 500).json({
            error: true,
            message: error.message,
            details: error.details || {},
         });
      }
   },
};

module.exports = __PAYMENT_METHOD_CONTROLLER;
