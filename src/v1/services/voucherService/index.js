"use strict";
const __RESPONSE = require("../../core");
const db = require("../../models");
const {validationResult} = require("express-validator");
const getAllVouchers = async () => {
   try {
      const vouchers = await db.Voucher.findAll({
         include: [
            {
               model: db.VoucherCondition,
               as: "voucher_to_voucherCondition",
               attributes: ["condition_id", "voucher_id", "condition_key", "condition_value"],
            },
            {
               model: db.Employee,
               as: "voucher_belongto_employee",
               attributes: [
                  "employee_id",
                  "employee_full_name",
                  "employee_email",
                  "employee_phone",
                  "employee_username",
                  "employee_birthday",
                  "employee_password",
                  "employee_profile_image",
                  "employee_profile_image_public_id",
                  "employee_gender",
                  "is_first_activation",
                  "is_locked",
                  "last_lock_at",
                  "office_id",
                  "employee_type_id",
               ],
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
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const {code, percentage, max_amount, usage_limit, valid_from, valid_to, create_by} = req.body;
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
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }
   const {voucherId, code, percentage, max_amount, usage_limit, valid_from, valid_to, update_by} = req.body;
   const voucherExist = await db.Voucher.findOne({
      where: {
         voucher_id: voucherId,
      },
   });
   if (!voucherExist) {
      throw new __RESPONSE.BadRequestError({
         message: "Voucher not found !",
         suggestion: "Please check your request",
         request: req,
      });
   }
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
         voucher_code: code,
         voucher_discount_percentage: percentage,
         voucher_discount_max_amount: max_amount,
         voucher_usage_limit: usage_limit,
         voucher_valid_from: valid_from,
         voucher_valid_to: valid_to,
         voucher_created_by: update_by,
      },
      {
         where: {
            voucher_id: voucherId,
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
   const {Id} = req.params;

   if (!Id) {
      throw new __RESPONSE.BadRequestError({
         message: "Voucher ID is required !",
         suggestion: "Please check your request",
         request: req,
      });
   }

   const voucherExist = await db.Voucher.findOne({
      where: {
         voucher_id: Id,
      },
   });
   if (!voucherExist) {
      throw new __RESPONSE.BadRequestError({
         message: "Voucher not found !",
         suggestion: "Please check your request",
         request: req,
      });
   }

   const voucher = await db.Voucher.destroy({
      where: {
         voucher_id: Id,
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
