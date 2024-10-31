"use strict";

const __RESPONSE = require("../../core");
const db = require("../../models");

const getAllVouchers = async () => {
   try {
      const vouchers = await db.Voucher.findAll({
         include: [
            {
               model: db.VoucherCondition,
               as: "voucher_to_voucherCondition",
            },
            {
               model: db.Employee,
               as: "voucher_belongto_employee",
            },
         ],
         nest: true,
         raw: true,
      });
      console.log(vouchers);
      if (!vouchers) {
         throw new __RESPONSE.NotFoundError({
            message: "Vouchers not found !",
            suggestion: "Please check your request",
            request: req,
         });
      }
      return {
         vouchers,
         total: vouchers.length,
      };
   } catch (error) {
      console.log(error);
   }
};

const getVoucherByCode = async (req) => {
   // 1. Giảm gía cho khách hàng mới đăng ký.
   const {code} = req.query;
   if (!code) {
      throw new __RESPONSE.BadRequestError({
         message: "Voucher code is required !",
         suggestion: "Please check your request",
         request: req,
      });
   }

   const voucherWithConditions = await db.Voucher.findOne({
      where: {
         voucher_code: code,
      },
      include: [
         {
            model: db.VoucherCondition,
            as: "voucher_to_voucherCondition",
         },
      ],
   });

   if (!voucherWithConditions) {
      throw new __RESPONSE.NotFoundError({
         message: "Voucher not found !",
         suggestion: "Please check your request",
         request: req,
      });
   }

   return {
      code: voucherWithConditions.voucher_code,
      discount: voucherWithConditions.voucher_discount_percentage,
      max_discount: voucherWithConditions.voucher_discount_max_amount,
      usage_limit: voucherWithConditions.voucher_usage_limit,
      valid_from: voucherWithConditions.voucher_valid_from,
      valid_to: voucherWithConditions.voucher_valid_to,
      conditions: voucherWithConditions.voucher_to_voucherCondition,
   };
};

module.exports = {
   getAllVouchers,
   getVoucherByCode,
};
