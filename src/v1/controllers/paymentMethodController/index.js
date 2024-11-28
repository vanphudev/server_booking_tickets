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

         new __RESPONSE.UPDATE({

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


   // deletePaymentMethod: async (req, res, next) => {
   //    try {
   //       new __RESPONSE.DELETE({
   //          message: "Payment method deleted successfully",
   //          metadata: await deletePaymentMethod(req),
   //          request: req,
   //       }).send(res);
   //    } catch (error) {
   //       console.error("Error deleting payment method:", error);
   //       res.status(error.statusCode || 500).json({
   //          error: true,
   //          message: error.message,
   //          details: error.details || {},
   //       });
   //    }
   // },
   deletePaymentMethod: async (req, res, next) => {
      const { id } = req.params; // Lấy ID từ params
   
      if (!id) {
         return res.status(400).json({ message: "Payment Method ID is required" });
      }
   
      try {
         const paymentMethod = await db.PaymentMethod.findOne({
            where: {
               payment_method_id: id,
            },
         });
   
         if (!paymentMethod) {
            return res.status(404).json({ message: "PaymentMethod not found" });
         }
   
         await paymentMethod.destroy(); // Xóa phương thức thanh toán
   
         return res.status(200).json({ message: "Payment Method deleted successfully" });
      } catch (error) {
         console.error("Error deleting payment method:", error);
         return res.status(500).json({ message: "Internal server error" });
      }
   },
   
   updatePaymentMethodAvatar: async (req, res, next) => {
      try {
         new __RESPONSE.UPDATE({
            message: "Payment method avatar updated successfully",
            metadata: await updatePaymentMethodAvatar(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error updating payment method avatar:", error);

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

