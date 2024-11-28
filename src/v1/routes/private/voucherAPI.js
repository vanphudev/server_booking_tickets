const express = require("express");
const voucherRouter = express.Router();
const asyncHandler = require("../../middlewares/handleError");
const __VOUCHER_CONTROLLER__ = require("../../controllers/voucherController");
const {
   validateCreateVoucher,
   validateUpdateVoucher,
} = require("../../middlewares/validates/voucherValidate");

voucherRouter.get("/getall", asyncHandler(__VOUCHER_CONTROLLER__.getAllVouchers));
voucherRouter.get("/getByCode", asyncHandler(__VOUCHER_CONTROLLER__.getVoucherByCode));
voucherRouter.post("/create", validateCreateVoucher, asyncHandler(__VOUCHER_CONTROLLER__.createVoucher));
voucherRouter.put("/update", asyncHandler(__VOUCHER_CONTROLLER__.updateVoucher));
voucherRouter.delete("/delete/:Id", asyncHandler(__VOUCHER_CONTROLLER__.deleteVoucher));


module.exports = voucherRouter;
