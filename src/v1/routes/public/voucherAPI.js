const express = require("express");
const voucherRouter = express.Router();
const asyncHandler = require("../../middlewares/handleError");
const __VOUCHER_CONTROLLER__ = require("../../controllers/voucherController");

voucherRouter.get("/getall", asyncHandler(__VOUCHER_CONTROLLER__.getAllVouchers));
voucherRouter.get("/getByCode", asyncHandler(__VOUCHER_CONTROLLER__.getVoucherByCode));

module.exports = voucherRouter;
