const express = require("express");
const rootRouter = express.Router();
const __RESPONSE = require("../../core/errorResponse");
const __ROUTES_CONTROLLER = require("../../controllers/routesController");
const asyncHandler = require("../../middlewares/handleError");

rootRouter.get("/getall", asyncHandler(__ROUTES_CONTROLLER.getRoutes));

module.exports = rootRouter;
