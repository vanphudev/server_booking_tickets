"use strict";

const __RESPONSE = require("../../core");
const { getAllPaymentMethod, getPaymentMethodById, createPaymentMethod, updatePaymentMethod, deletePaymentMethod} = require("../../services/paymentMethodService");
const __PAYMENTMETHOD_CONTROLLER = {
    getAllPaymentMethod: async (req, res, next) => {
        try {
            const paymentMethod = await getAllPaymentMethod(); 
            new __RESPONSE.OK({
                message: "Retrieved all Payment Method",
                metadata: paymentMethod,
                request: req,
            }).send(res);
        } catch (error) {
            console.error("Error retrieving Payment Method:", error);
            res.status(500).json({
                error: true,
                message: "Internal Server Error",
                details: error.message,
            });
        }
    },

    getPaymentMethodById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const paymentMethod = await getPaymentMethodById(id); // Gọi phương thức từ service

            new __RESPONSE.OK({
                message: "Retrieved Payment Method",
                metadata: paymentMethod,
                request: req,
            }).send(res);
        } catch (error) {
            console.error("Error retrieving Payment Method:", error);
            res.status(500).json({
                error: true,
                message: "Internal Server Error",
                details: error.message,
            });
        }
    },

    createPaymentMethod: async (req, res, next) => {
        try {
            const paymentMethod = await createPaymentMethod(req);
            new __RESPONSE.CREATED({
                message: "Create new Payment Method",
                metadata: paymentMethod,
                request: req,
            }).send(res);
        } catch (error) {
            console.error("Error in createPaymentMethod:", error);  // Log lỗi chi tiết
            res.status(500).json({
                error: true,
                message: "Internal Server Error",
                details: error.message,  
            });
        }
    },
    
    updatePaymentMethod: async (req, res, next) => {
        try {
            const paymentMethodId = req.params.id;
            const metadata = await updatePaymentMethod(req);
            new __RESPONSE.SUCCESS({
                message: "Update Payment Method successfully",
                metadata: metadata,
                request: req,
            }).send(res);
        } catch (error) {
            console.error("Error in controller updatePaymentMethod:", error); // Log lỗi chi tiết
            res.status(500).json({
                error: true,
                message: "Failed to update Payment Method",
                details: error.message,
            });
        }
    },
    
    deletePaymentMethod: async (req, res, next) => {
        try {
           new __RESPONSE.OK({
              message: "Payment Method deleted successfully",
              metadata: await deletePaymentMethod(req),
              request: req,
           }).send(res);
        } catch (error) {
           next(error);
        }
     },
 };
module.exports = __PAYMENTMETHOD_CONTROLLER;
