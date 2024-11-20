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
               attributes: ["condition_id", "condition_key", "condition_value"],
            },
            {
               model: db.Employee,
               as: "voucher_belongto_employee",
               attributes: ["employee_id"],
            },
         ],
         attributes: [
            "voucher_id",
            "voucher_code",
            "voucher_discount_percentage",
            "voucher_discount_max_amount",
            "voucher_usage_limit",
            "voucher_valid_from",
            "voucher_valid_to",
         ],
         nest: true,
         raw: true,
      });
      if (!vouchers) {
         throw new __RESPONSE.NotFoundError({
            message: "Vouchers not found !",
            suggestion: "Please check your request",
            //request: req,
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
            attributes: ["condition_id", "condition_key", "condition_value"],
         },
      ],
      attributes: [
         "voucher_code",
         "voucher_discount_percentage",
         "voucher_discount_max_amount",
         "voucher_usage_limit",
         "voucher_valid_from",
         "voucher_valid_to",
      ],
      nest: true,
      raw: true,
   });
   if (!voucherWithConditions) {
      throw new __RESPONSE.NotFoundError({
         message: "Voucher not found !",
         suggestion: "Please check your request",
         request: req,
      });
   }
   return {
      voucher: voucherWithConditions,
   };
};

const createVoucher = async (req) => {
   const {code, percentage, max_amount, usage_limit, valid_from, valid_to, create_by} = req.body;
   // Kiểm tra xem các thông tin của voucher có đầy đủ không
   if (!code || !percentage || !max_amount || !usage_limit || !valid_from || !valid_to || !create_by) {
      throw new __RESPONSE.BadRequestError({
         message: "Voucher details are required !",
         suggestion: "Please check your request",
         request: req,
      });
   }
   // kiểm tra xem voucher đã tồn tại chưa
   const voucherExist = await db.Voucher.findOne({
      where: {
         voucher_code: code,
      },
   });
   if (voucherExist) {
      throw new __RESPONSE.BadRequestError({
         message: "Voucher already exists !",
         suggestion: "Please check your request",
         request: req,
      });
   }
   // Kiểm tra create_by có tồn tại không
   const employee = await db.Employee.findOne({
      where: {
         employee_id: create_by,
      },
   });
   if (!employee) {
      throw new __RESPONSE.BadRequestError({
         message: "Employee not found !",
         suggestion: "Please check your request",
         request: req,
      });
   }
   const voucher = await db.Voucher.create({
      voucher_code: code.toUpperCase(),
      voucher_discount_percentage: percentage,
      voucher_discount_max_amount: max_amount,
      voucher_usage_limit: usage_limit,
      voucher_valid_from: valid_from,
      voucher_valid_to: valid_to,
      voucher_created_by: create_by,
   });
   if (!voucher) {
      throw new __RESPONSE.BadRequestError({
         message: "Voucher not created !",
         suggestion: "Please check your request",
         request: req,
      });
   }
   return {
      voucher,
   };
};

const updateVoucher = async (req) => {
   const {code, percentage, max_amount, usage_limit, valid_from, valid_to, update_by} = req.body;
   // Kiểm tra xem các thông tin của voucher có đầy đủ không
   if (!code || !percentage || !max_amount || !usage_limit || !valid_from || !valid_to || !update_by) {
      throw new __RESPONSE.BadRequestError({
         message: "Voucher details are required !",
         suggestion: "Please check your request",
         request: req,
      });
   }
   // kiểm tra xem voucher đã tồn tại chưa
   const voucherExist = await db.Voucher.findOne({
      where: {
         voucher_code: code,
      },
   });
   if (!voucherExist) {
      throw new __RESPONSE.BadRequestError({
         message: "Voucher not found !",
         suggestion: "Please check your request",
         request: req,
      });
   }
   // Kiểm tra update_by có tồn tại không
   const employee = await db.Employee.findOne({
      where: {
         employee_id: update_by,
      },
   });
   if (!employee) {
      throw new __RESPONSE.BadRequestError({
         message: "Employee not found !",
         suggestion: "Please check your request",
         request: req,
      });
   }
   const voucher = await db.Voucher.update(
      {
         voucher_discount_percentage: percentage,
         voucher_discount_max_amount: max_amount,
         voucher_usage_limit: usage_limit,
         voucher_valid_from: valid_from,
         voucher_valid_to: valid_to,
         voucher_updated_by: update_by,
      },
      {
         where: {
            voucher_code: code,
         },
      }
   );
   if (!voucher) {
      throw new __RESPONSE.BadRequestError({
         message: "Voucher not updated !",
         suggestion: "Please check your request",
         request: req,
      });
   }
   return {
      voucher,
   };
};

const deleteVoucher = async (req) => {
   const {code, delete_by} = req.body;
   // Kiểm tra xem các thông tin của voucher có đầy đủ không
   if (!code || !delete_by) {
      throw new __RESPONSE.BadRequestError({
         message: "Voucher code and delete_by are required !",
         suggestion: "Please check your request",
         request: req,
      });
   }
   // kiểm tra xem voucher đã tồn tại chưa
   const voucherExist = await db.Voucher.findOne({
      where: {
         voucher_code: code,
      },
   });
   if (!voucherExist) {
      throw new __RESPONSE.BadRequestError({
         message: "Voucher not found !",
         suggestion: "Please check your request",
         request: req,
      });
   }
   // Kiểm tra delete_by có tồn tại không
   const employee = await db.Employee.findOne({
      where: {
         employee_id: delete_by,
      },
   });
   if (!employee) {
      throw new __RESPONSE.BadRequestError({
         message: "Employee not found !",
         suggestion: "Please check your request",
         request: req,
      });
   }
   const voucher = await db.Voucher.destroy({
      where: {
         voucher_code: code,
      },
   });
   if (!voucher) {
      throw new __RESPONSE.BadRequestError({
         message: "Voucher not deleted !",
         suggestion: "Please check your request",
         request: req,
      });
   }
   return {
      voucher,
   };
};

module.exports = {
   getAllVouchers,
   getVoucherByCode,
   createVoucher,
   updateVoucher,
   deleteVoucher,
};
