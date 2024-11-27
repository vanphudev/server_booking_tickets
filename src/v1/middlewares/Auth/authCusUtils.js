"use strict";
const jwt = require("jsonwebtoken");
const asyncHandler = require("../handleError");
const __RESPONSE = require("../../core");
const db = require("../../models");

const EXPIRES_IN_ACCESS_TOKEN = "20m";
const EXPIRES_IN_REFRESH_TOKEN = "20d";

const createTokenPair = async (payload, publicKey, privateKey) => {
   try {
      const accessToken = jwt.sign(payload, publicKey, {expiresIn: EXPIRES_IN_ACCESS_TOKEN});
      const refreshToken = jwt.sign(payload, privateKey, {expiresIn: EXPIRES_IN_REFRESH_TOKEN});
      return {accessToken, refreshToken};
   } catch (error) {
      throw new __RESPONSE.BadRequestError({
         message: "Lỗi tạo token - Error creating token - " + error.message,
         suggestion: "Please check again your request",
         request: req,
      });
   }
};

const authentication = asyncHandler(async (req, res, next) => {
   if (!req.headers || Object.keys(req.headers).length === 0) {
      throw new __RESPONSE.UnauthorizedError({
         message: "Không tìm thấy headers - Headers not found - Customer",
         suggestion: "Please check again your request",
         request: req,
      });
   }
   if (!req.headers.client_id || !req.headers.authorization) {
      throw new __RESPONSE.UnauthorizedError({
         message: "Tham số client_id và authorization là bắt buộc - client_id and authorization are required Customer",
         suggestion: "Please check again your request",
         request: req,
      });
   }
   const client_id = req.headers.client_id;
   if (!client_id) {
      throw new __RESPONSE.UnauthorizedError({
         message: "Client id is required - client_id is required - Customer",
         suggestion: "Please check again your request",
         request: req,
      });
   }
   const keyStore = await db.KeyStoreCustomer.findOne({
      where: {
         customer_id: client_id,
      },
   });
   if (!keyStore) {
      throw new __RESPONSE.UnauthorizedError({
         message: "Không tìm thấy người dùng trong Token - User not found in Token - Customer",
         suggestion: "Please check again your request",
         request: req,
      });
   }
   const accessToken = req.headers.authorization;
   if (!accessToken) {
      throw new __RESPONSE.UnauthorizedError({
         message: "Access token is required - Access token is required - Customer",
         suggestion: "Please check again your request",
         request: req,
      });
   }
   jwt.verify(accessToken, keyStore.public_key_customer, (error, decoded) => {
      if (error) {
         if (error instanceof jwt.TokenExpiredError) {
            throw new __RESPONSE.RefreshToken({
               message: "Access token hết hạn - Access token expired - Customer",
               suggestion: "Please check again your request",
               request: req,
            });
         }
         if (error instanceof jwt.JsonWebTokenError) {
            throw new __RESPONSE.UnauthorizedError({
               message: "Access token giải mã không hợp lệ - Access token is invalid - Customer - " + error.message,
               suggestion: "Please check again your request",
               request: req,
            });
         }
      }
      if (decoded.user_id != client_id) {
         throw new __RESPONSE.UnauthorizedError({
            message: "User không hợp lệ với token - User is invalid with token - client_id # userId - Customer",
            suggestion: "Please check again your request",
            request: req,
         });
      }
      req.keyStore = keyStore;
      return next();
   });
});

const verifyToken = (token, keySecret) => {
   return jwt.verify(token, keySecret, (err, decoded) => {
      if (err) {
         throw new Error("Token không hợp lệ" + err.message);
      }
      return decoded;
   });
};

module.exports = {
   createTokenPair,
   authentication,
   verifyToken,
};
