"use strict";
const { floor } = require("lodash");
const __RESPONSE = require("../../core");
const db = require("../../models");
const validator = require("validator");

const getAllPaymentMethod = async () => {
   const paymentMethod = await db.PaymentMethod.findAll();
   return paymentMethod;
};

// Phương thức lấy theo ID
const getPaymentMethodById = async (id) => {
   const paymentMethod = await db.PaymentMethod.findByPk(id);
   if (!paymentMethod) {
       throw new __RESPONSE.NotFoundError({
        message: "Payment Method not found",
        request: req,
    })
   }
   return paymentMethod;
};

const createPaymentMethod = async (req) => {
   const { code, name, islocked, lock_at, description, paymenttypeid } = req.body;

   if (!code || !name || islocked === undefined || !lock_at || !description || paymenttypeid === undefined) {
       console.error("Missing required fields:", req.body);  // Log dữ liệu yêu cầu
       throw new Error("Missing required fields");
   }

   try {
       const paymentMethod = await db.PaymentMethod.create({
           payment_method_code: code,
           payment_method_name: name,
           is_locked: islocked,
           last_lock_at: lock_at,
           payment_method_description: description,
           payment_type_id: paymenttypeid,
       });
       return {
           id: paymentMethod.payment_method_id,
           code: paymentMethod.payment_method_code,
           name: paymentMethod.payment_method_name,
           islocked: paymentMethod.is_locked,
           lock_at: paymentMethod.last_lock_at,
           description: paymentMethod.payment_method_description,
           paymenttypeid: paymentMethod.payment_type_id,
       };
   } catch (error) {
       console.error("Error creating PaymentMethod:", error);  // Log lỗi chi tiết
       throw error;
   }
};
const updatePaymentMethod = async (req) => {
    const { id } = req.params;
    const { code, name, islocked, lock_at, description, paymenttypeid } = req.body;

    try {
        // Tìm PaymentMethod theo ID
        const paymentMethod = await db.PaymentMethod.findByPk(id);
        if (!paymentMethod) {
            console.error(`Payment Method with ID ${id} not found`);
            throw new __RESPONSE.NotFoundError({
                message: "Payment Method not found",
                request: req,
            });
        }

        // Cập nhật thông tin
        paymentMethod.payment_method_code = code;
        paymentMethod.payment_method_name = name;
        paymentMethod.is_locked = islocked;
        paymentMethod.last_lock_at = lock_at;
        paymentMethod.payment_method_description = description;
        paymentMethod.payment_type_id = paymenttypeid;

        // Lưu thay đổi vào cơ sở dữ liệu
        await paymentMethod.save();

        // Trả về thông tin cập nhật
        return {
            id: paymentMethod.payment_method_id,
            code: paymentMethod.payment_method_code,
            name: paymentMethod.payment_method_name,
            islocked: paymentMethod.is_locked,
            lock_at: paymentMethod.last_lock_at,
            description: paymentMethod.payment_method_description,
            paymenttypeid: paymentMethod.payment_type_id,
        };
    } catch (error) {
        console.error("Error in updatePaymentMethod:", error); // Log lỗi chi tiết
        throw error; // Ném lỗi ra ngoài để controller xử lý
    }
};

const deletePaymentMethod = async (req) => {
   const {id} = req.params;

   const paymentMethod = await db.PaymentMethod.findByPk(id);
   if (!paymentMethod) {
    throw new __RESPONSE.NotFoundError({
        message: "Payment Method not found",
        request: req,
    })
   }

   await paymentMethod.destroy();
   return { message: "Payment Method deleted successfully" };
};

module.exports = {
   getAllPaymentMethod,
   getPaymentMethodById,
   createPaymentMethod,
   updatePaymentMethod,
   deletePaymentMethod,
};
