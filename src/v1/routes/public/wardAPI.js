const express = require("express");
const rootRouter = express.Router();
const asyncHandler = require("../../middlewares/handleError");
const __WARD_CONTROLLER__ = require("../../controllers/wardController");

rootRouter.get("/getall", asyncHandler(__WARD_CONTROLLER__.getWards));
rootRouter.get("/getById", asyncHandler(__WARD_CONTROLLER__.getWardsByIdDistrict));

module.exports = rootRouter;
