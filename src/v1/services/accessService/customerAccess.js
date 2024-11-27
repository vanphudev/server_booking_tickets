"use strict";
const __RESPONSE = require("../../core");
const db = require("../../models");
const bycrypt = require("bcrypt");
const crypto = require("crypto");
const {createTokenPair, verifyToken} = require("../../middlewares/Auth/authCusUtils");
const {validationResult} = require("express-validator");
const {
   createKeyToken,
   findTokenByCustomerId,
   removeKeyByCustomerId,
   findRefreshTokenUsed,
} = require("../keyTokenService/keyTokenCusService");
const getInfoCustomer = require("../../utils/getInforCustomer");

const validatePassword = (password) => {
   const errors = [];
   const minLength = 6;
   if (password.length < minLength) {
      errors.push(`Mật khẩu phải có ít nhất ${minLength} ký tự. \n`);
   }
   if (!/[A-Z]/.test(password)) {
      errors.push("Mật khẩu phải có ít nhất 1 chữ hoa. \n");
   }
   if (!/[a-z]/.test(password)) {
      errors.push("Mật khẩu phải có ít nhất 1 chữ thường. \n");
   }
   if (!/[0-9]/.test(password)) {
      errors.push("Mật khẩu phải có ít nhất 1 số. \n");
   }
   if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Mật khẩu phải có ít nhất 1 ký tự đặc biệt. \n");
   }
   return errors;
};

const handlerRefreshTokenCustomer = async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }
   const {refreshToken, customerId} = req.body;
   const foundKeyTokenUsed = await findRefreshTokenUsed(refreshToken, customerId);
   if (foundKeyTokenUsed) {
      const keyToken = await removeKeyByCustomerId(customerId);
      if (keyToken.deletedCount === 0) {
         throw new __RESPONSE.BadRequestError({
            message: "Token not found - Token không tồn tại !",
            suggestion: "Please check again your request",
            request: req,
         });
      }
      throw new __RESPONSE.UnauthorizedError({
         message: "Token đã được sử dụng! Vui lòng đăng nhập lại!",
         suggestion: "Please check again your request",
         request: req,
      });
   }

   const keyToken = await findTokenByCustomerId(customerId);
   if (!keyToken) {
      throw new __RESPONSE.UnauthorizedError({
         message: "Token không tồn tại! - Đăng nhập lại!",
         suggestion: "Please check again your request",
         request: req,
      });
   }

   console.log("refreshToken", refreshToken);
   console.log("keyToken.private_key_customer", keyToken.private_key_customer);
   console.log("keyToken.refresh_token_key_customer", keyToken.refresh_token_key_customer);

   const {user_id} = verifyToken(refreshToken, keyToken.private_key_customer);

   if (user_id !== customerId) {
      throw new __RESPONSE.UnauthorizedError({
         message: "Token không hợp lệ! - Đăng nhập lại!",
         suggestion: "Please check again your request",
         request: req,
      });
   }

   const customer = await db.Customer.findOne({
      where: {customer_id: user_id},
   });

   if (!customer) {
      throw new __RESPONSE.BadRequestError({
         message: "Customer not found with id " + user_id,
         suggestion: "Please try again with correct id",
         request: req,
      });
   }

   const payLoad = {
      user_id: customer.customer_id,
      phone: customer.customer_phone,
      name: customer.customer_full_name,
      gender: customer.customer_gender,
      avatar: customer.customer_avatar_url,
      destination_address: customer.customer_destination_address,
      birthday: customer.customer_birthday,
   };

   const tokens = await createTokenPair(payLoad, keyToken.public_key_customer, keyToken.private_key_customer);
   await keyToken
      .update(
         {
            refresh_token_key_customer: tokens.refreshToken,
         },
         {where: {customer_id: customer.customer_id}}
      )
      .then((keyToken) => {
         if (!keyToken) {
            throw new __RESPONSE.BadRequestError({
               message: "Update token failed",
               suggestion: "Please try again",
            });
         }
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Update token failed " + error.message,
            suggestion: "Please try again " + error.message,
         });
      });

   await db.RefreshKeyUsedCustomer.create({
      refreshkey_used_customer_key: refreshToken,
      key_store_customer_id: keyToken.key_store_customer_id,
   })
      .then((refreshTokenUsed) => {
         if (!refreshTokenUsed) {
            throw new __RESPONSE.BadRequestError({
               message: "Create refresh token used failed",
               suggestion: "Please try again",
            });
         }
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Create refresh token used failed " + error.message,
            suggestion: "Please try again " + error.message,
         });
      });

   return {
      tokens,
      customer: getInfoCustomer({
         fileds: [
            "customer_id",
            "customer_full_name",
            "customer_email",
            "customer_gender",
            "customer_birthday",
            "customer_avatar_url",
            "customer_destination_address",
         ],
         object: customer,
      }),
   };
};

const logOutCustomer = async ({keyStore}) => {
   if (!keyStore) {
      throw new __RESPONSE.NotFoundError({
         message: "Không tìm thấy token - Token not found",
         suggestion: "Please check again your request",
      });
   }
   try {
      const keyToken = await removeKeyByCustomerId(keyStore.customer_id);
      if (!keyToken) {
         throw new __RESPONSE.BadRequestError({
            message: "Logout failed",
            suggestion: "Please try again",
         });
      }
      return {
         message: "Logout success",
         suggestion: "Please login again",
      };
   } catch (error) {
      throw new __RESPONSE.BadRequestError({
         message: "Logout failed " + error.message,
         suggestion: "Please try again " + error.message,
      });
   }
};

const signInCustomer = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }
   const {phone, password} = req.body;
   const customer = await db.Customer.findOne({
      where: {customer_phone: phone},
   });

   if (!customer) {
      throw new __RESPONSE.BadRequestError({
         message: "Customer not found with phone " + phone,
         suggestion: "Please try again with correct phone",
         request: req,
      });
   }
   const isPasswordMatch = await bycrypt.compare(password, customer.customer_password);
   if (!isPasswordMatch) {
      throw new __RESPONSE.BadRequestError({
         message: "Password not match with phone " + phone,
         suggestion: "Please try again with correct password",
         request: req,
      });
   }
   const privateKey = crypto.randomBytes(64).toString("hex");
   const publicKey = crypto.randomBytes(64).toString("hex");

   const payLoad = {
      user_id: customer.customer_id,
      phone: customer.customer_phone,
      name: customer.customer_full_name,
      gender: customer.customer_gender,
      avatar: customer.customer_avatar_url,
      destination_address: customer.customer_destination_address,
      birthday: customer.customer_birthday,
   };

   const tokens = await createTokenPair(payLoad, publicKey, privateKey);
   const keyToken = await createKeyToken({
      userId: customer.customer_id,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken,
   });

   if (!keyToken) {
      throw new __RESPONSE.BadRequestError({
         message: "Create key token failed",
         suggestion: "Please try again",
         request: req,
      });
   }

   return {
      tokens,
      customer: getInfoCustomer({
         fileds: [
            "customer_id",
            "customer_full_name",
            "customer_email",
            "customer_phone",
            "customer_gender",
            "customer_birthday",
            "customer_avatar_url",
            "customer_destination_address",
         ],
         object: customer,
      }),
   };
};

const signUpCustomer = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }

   const {password, name, phone, gender, email} = req.body;
   const errorsPassword = validatePassword(password);
   if (errorsPassword.length > 0) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errorsPassword.join(" ") + " !",
         suggestion: errorsPassword,
         request: req,
      });
   }

   const customerGender = parseInt(gender, 10);
   if (![0, 1, -1].includes(customerGender)) {
      throw new __RESPONSE.BadRequestError({
         message: "Invalid gender value!",
         suggestion: "Gender must be 0, 1, or -1.",
         request: req,
      });
   }
   const hashPassword = await bycrypt.hash(password, 10);
   return await db.Customer.create({
      customer_full_name: name,
      customer_phone: phone,
      customer_email: email,
      customer_password: hashPassword,
      customer_gender: customerGender,
   })
      .then((customer) => {
         if (!customer) {
            throw new __RESPONSE.BadRequestError({
               message: "Create Account customer failed !",
               suggestion: "Please try again with correct data",
               request: req,
            });
         }
         return {
            customer: getInfoCustomer({
               fileds: [
                  "customer_id",
                  "customer_full_name",
                  "customer_email",
                  "customer_phone",
                  "customer_gender",
                  "customer_birthday",
                  "customer_avatar_url",
                  "customer_destination_address",
               ],
               object: customer,
            }),
         };
      })
      .catch((error) => {
         console.log(error);
         throw new __RESPONSE.BadRequestError({
            message: "Create Account customer failed " + error.message,
            suggestion: "Please try again with correct data " + error.message,
            request: req,
         });
      });
};

const getCustomerById = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }
   const {customerId} = req.body;
   return await db.Customer.findOne({
      where: {customer_id: customerId},
   })
      .then((customer) => {
         if (!customer) {
            throw new __RESPONSE.NotFoundError({
               message: "Customer not found with id " + customerId,
               suggestion: "Please try again with correct id",
               request: req,
            });
         }
         return {
            customer: getInfoCustomer({
               fileds: [
                  "customer_id",
                  "customer_full_name",
                  "customer_email",
                  "customer_phone",
                  "customer_gender",
                  "customer_birthday",
                  "customer_avatar_url",
                  "customer_destination_address",
               ],
               object: customer,
            }),
         };
      })
      .catch((error) => {
         if (error instanceof __RESPONSE.NotFoundError) {
            throw error;
         }
         throw new __RESPONSE.BadRequestError({
            message: "Get customer failed " + error.message,
            suggestion: "Please try again with correct id " + error.message,
            request: req,
         });
      });
};

module.exports = {
   logOutCustomer,
   signInCustomer,
   signUpCustomer,
   handlerRefreshTokenCustomer,
   getCustomerById,
};
