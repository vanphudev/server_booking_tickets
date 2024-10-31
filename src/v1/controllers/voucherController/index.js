"use strict";

const __RESPONSE = require("../../core");
const {getAllVouchers, getVoucherByCode} = require("../../services/voucherService");

const __VOUCHER_CONTROLLER = {
   getAllVouchers: async (req, res, next) => {
      new __RESPONSE.GET({
         message: "List of all vouchers",
         metadata: await getAllVouchers(),
         request: req,
      }).send(res);
   },
   getVoucherByCode: async (req, res, next) => {
      new __RESPONSE.GET({
         message: "Voucher information",
         metadata: await getVoucherByCode(req),
         request: req,
      }).send(res);
   },
};

module.exports = __VOUCHER_CONTROLLER;
