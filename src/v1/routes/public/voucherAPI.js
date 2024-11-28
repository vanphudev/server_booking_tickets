const express = require("express");
const voucherRouter = express.Router();
const asyncHandler = require("../../middlewares/handleError");
const __VOUCHER_CONTROLLER__ = require("../../controllers/voucherController");
const {
   validateCreateVoucher,
   validateUpdateVoucher,
} = require("../../middlewares/validates/voucherValidate");

voucherRouter.get("/getall", asyncHandler(__VOUCHER_CONTROLLER__.getAllVouchers));

module.exports = voucherRouter;
