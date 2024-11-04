"use strict";
const __RESPONSE = require("../../core");
const db = require("../../models");
const validator = require("validator");

// Phương thức lấy tất cả Payment Types
const getAllPaymentTypes = async () => {
    const paymentTypes = await db.PaymentType.findAll();
    return paymentTypes;
};

// Phương thức lấy Payment Type theo ID
const getPaymentTypeById = async (id) => {
    const paymentType = await db.PaymentType.findByPk(id);
    if (!paymentType) {
        throw new __RESPONSE.NotFoundError({
            message: "Payment Type not found",
            request: req,
        })
    }
    return paymentType;
};

const createPaymentType = async (req) => {
    const {name} = req.body;

    const paymentType = await db.PaymentType.create({
        payment_type_name: name,
          
    });
    
    return {
       id: paymentType.payment_type_id,
       name: paymentType.payment_type_name,
    };
 };
 
 const updatePaymentType = async (req) => {
    const { id } = req.params; 
    const { name} = req.body;

    const paymentType = await db.PaymentType.findByPk(id);
    if (!paymentType) {
        throw new __RESPONSE.NotFoundError({
            message: "Payment Type not found",
            request: req,
        })
    }

    // Cập nhật thông tin
    paymentType.payment_type_name = name;
   
    await paymentType.save();

    return {
        id: paymentType.payment_type_id,
        name: paymentType.payment_type_name,
        
    };
};

  
 const deletePaymentType = async (req) => {
     const {id} = req.params;
 
     const paymentType = await db.PaymentType.findByPk(id);
     if (!paymentType) {
        throw new __RESPONSE.NotFoundError({
            message: "Payment Type not found",
            request: req,
        })
     }
 
     await paymentType.destroy();
     return { message: "Payment Type deleted successfully" };
 };
 
 module.exports = {
    getAllPaymentTypes,
    getPaymentTypeById,
     createPaymentType,
     updatePaymentType,
     deletePaymentType,
 };