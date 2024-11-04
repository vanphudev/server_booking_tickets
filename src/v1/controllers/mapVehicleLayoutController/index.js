"use strict";

const __RESPONSE = require("../../core");
const {
    getAllMapVehicleLayouts,
    getMapVehicleLayoutById,
    createMapVehicleLayout,
    updateMapVehicleLayout,
    deleteMapVehicleLayout,
} = require("../../services/mapVehicleLayoutService");

const __MAP_VEHICLE_LAYOUT_CONTROLLER = {
    getAllMapVehicleLayouts: async (req, res, next) => {
        try {
            new __RESPONSE.GET({
                message: "List of all map vehicle layouts",
                metadata: await getAllMapVehicleLayouts(),
                request: req,
            }).send(res);
        } catch (error) {
            console.error("Error finding map vehicle layouts:", error);
            res.status(error.statusCode || 500).json({
                error: true,
                message: error.message,
                details: error.details || {},
            });
        }
    },

    getMapVehicleLayoutById: async (req, res, next) => {
        try {
            new __RESPONSE.GET({
                message: "Map vehicle layout details",
                metadata: await getMapVehicleLayoutById(req),
                request: req,
            }).send(res);
        } catch (error) {
            console.error("Error finding map vehicle layout by ID:", error);
            res.status(error.statusCode || 500).json({
                error: true,
                message: error.message,
                details: error.details || {},
            });
        }
    },

    createMapVehicleLayout: async (req, res, next) => {
        try {
            new __RESPONSE.CREATED({
                message: "Map vehicle layout created successfully",
                metadata: await createMapVehicleLayout(req),
                request: req,
            }).send(res);
        } catch (error) {
            console.error("Error creating map vehicle layout:", error);
            res.status(error.statusCode || 500).json({
                error: true,
                message: error.message,
                details: error.details || {},
            });
        }
    },

    updateMapVehicleLayout: async (req, res, next) => {
        try {
            new __RESPONSE.OK({
                message: "Map vehicle layout updated successfully",
                metadata: await updateMapVehicleLayout(req),
                request: req,
            }).send(res);
        } catch (error) {
            console.error("Error updating map vehicle layout:", error);
            res.status(error.statusCode || 500).json({
                error: true,
                message: error.message,
                details: error.details || {},
            });
        }
    },

    deleteMapVehicleLayout: async (req, res, next) => {
        try {
            new __RESPONSE.DELETE({
                message: "Map vehicle layout deleted successfully",
                metadata: await deleteMapVehicleLayout(req),
                request: req,
            }).send(res);
        } catch (error) {
            console.error("Error deleting map vehicle layout:", error);
            res.status(error.statusCode || 500).json({
                error: true,
                message: error.message,
                details: error.details || {},
            });
        }
    },
};

module.exports = __MAP_VEHICLE_LAYOUT_CONTROLLER;