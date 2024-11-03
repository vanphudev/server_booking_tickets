"use strict";

const __RESPONSE = require("../../core");
const db = require("../../models");
const { getAllPaymentTypes, getPaymentTypeById, createPaymentType, updatePaymentType, deletePaymentType } = require("../../services/paymentTypeService");

const __PAYMENT_TYPE_CONTROLLER = {
    getAllPaymentTypes: async (req, res, next) => {
        try {
            const paymentTypes = await getAllPaymentTypes(); // Gọi phương thức từ service
            new __RESPONSE.OK({
                message: "Retrieved all Payment Types",
                metadata: paymentTypes,
                request: req,
            }).send(res);
        } catch (error) {
            console.error("Error retrieving Payment Types:", error);
            res.status(500).json({
                error: true,
                message: "Internal Server Error",
                details: error.message,
            });
        }
    },

    getPaymentTypeById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const paymentType = await getPaymentTypeById(id); // Gọi phương thức từ service

            new __RESPONSE.OK({
                message: "Retrieved Payment Type",
                metadata: paymentType,
                request: req,
            }).send(res);
        } catch (error) {
            console.error("Error retrieving Payment Type:", error);
            res.status(500).json({
                error: true,
                message: "Internal Server Error",
                details: error.message,
            });
        }
    },

    createPaymentType: async (req, res, next) => {
        try {
           new __RESPONSE.CREATED({
              message: "Create new Payment Type",
              metadata: await createPaymentType(req),
              request: req,
           }).send(res);
        } catch (error) {
           console.error("Error creating Payment Type:", error); // Ghi log lỗi
           res.status(500).json({
              error: true,
              message: "Internal Server Error",
              details: error.message,
           });
        }
     },
   
   updatePaymentType: async (req, res, next) => {
      try {
         new __RESPONSE.OK({
            message: "Payment Type updated successfully",
            metadata: await updatePaymentType(req),
            request: req,
         }).send(res);
      } catch (error) {
         console.error("Error updating Payment Type:", error);
         res.status(500).json({
            error: true,
            message: "Internal Server Error",
            details: error.message,
         });
      }
   },

   deletePaymentType: async (req, res, next) => {
      try {
         new __RESPONSE.OK({
            message: "Payment Type deleted successfully",
            metadata: await deletePaymentType(req),
            request: req,
         }).send(res);
      } catch (error) {
         next(error);
      }
   },
};

module.exports = __PAYMENT_TYPE_CONTROLLER;