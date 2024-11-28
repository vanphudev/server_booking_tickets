const express = require("express");
const rootRouter = express.Router();
const __RESPONSE = require("../../core/errorResponse");
const __REVIEW_CONTROLLER = require("../../controllers/reviewController");
const asyncHandler = require("../../middlewares/handleError");
// const {
//    validateCreateOffice,
//    validateUpdateOffice,
//    validateOfficeWithByIDToQuery,
//    validateOfficeWithByIDToParams,
// } = require("../../middlewares/validates/officeValidates");

rootRouter
.get("/getall", asyncHandler(__REVIEW_CONTROLLER.getAllReviews))

module.exports = rootRouter;
