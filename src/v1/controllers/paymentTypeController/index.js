"use strict";

const __RESPONSE = require("../../core");
const {
    getAllPaymentTypes,
    getPaymentTypeById,
    createPaymentType,
    updatePaymentType,
    deletePaymentType,
} = require("../../services/paymentTypeService");

const __PAYMENT_TYPE_CONTROLLER = {
    getAllPaymentTypes: async (req, res, next) => {
        try {
            new __RESPONSE.GET({
                message: "List of all payment types",
                metadata: await getAllPaymentTypes(),
                request: req,
            }).send(res);
        } catch (error) {
            console.error("Error finding payment types:", error);
            res.status(error.statusCode || 500).json({
                error: true,
                message: error.message,
                details: error.details || {},
            });
        }
    },

    getPaymentTypeById: async (req, res, next) => {
        try {
            new __RESPONSE.GET({
                message: "Payment type details",
                metadata: await getPaymentTypeById(req),
                request: req,
            }).send(res);
        } catch (error) {
            console.error("Error finding payment type by ID:", error);
            res.status(error.statusCode || 500).json({
                error: true,
                message: error.message,
                details: error.details || {},
            });
        }
    },

    createPaymentType: async (req, res, next) => {
        try {
            new __RESPONSE.CREATED({
                message: "Payment type created successfully",
                metadata: await createPaymentType(req),
                request: req,
            }).send(res);
        } catch (error) {
            console.error("Error creating payment type:", error);
            res.status(error.statusCode || 500).json({
                error: true,
                message: error.message,
                details: error.details || {},
            });
        }
    },

    updatePaymentType: async (req, res, next) => {
        try {
            new __RESPONSE.OK({
                message: "Payment type updated successfully",
                metadata: await updatePaymentType(req),
                request: req,
            }).send(res);
        } catch (error) {
            console.error("Error updating payment type:", error);
            res.status(error.statusCode || 500).json({
                error: true,
                message: error.message,
                details: error.details || {},
            });
        }
    },

    deletePaymentType: async (req, res, next) => {
        try {
            new __RESPONSE.DELETE({
                message: "Payment type deleted successfully",
                metadata: await deletePaymentType(req),
                request: req,
            }).send(res);
        } catch (error) {
            console.error("Error deleting payment type:", error);
            res.status(error.statusCode || 500).json({
                error: true,
                message: error.message,
                details: error.details || {},
            });
        }
    },
};

module.exports = __PAYMENT_TYPE_CONTROLLER;