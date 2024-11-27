"use strict";
const __RESPONSE = require("../../core");
const {
   logOutCustomer,
   signInCustomer,
   signUpCustomer,
   handlerRefreshTokenCustomer,
   getCustomerById,
} = require("../../services/accessService/customerAccess");

const __CUSTOMER_CONTROLLER = {
   logOut: async (req, res, next) => {
      new __RESPONSE.DELETE({
         message: "Logout successfully !",
         metadata: await logOutCustomer(req),
         request: req,
      }).send(res);
   },
   signIn: async (req, res, next) => {
      new __RESPONSE.CREATED({
         message: "Login successfully !",
         metadata: await signInCustomer(req),
         request: req,
      }).send(res);
   },
   signUp: async (req, res, next) => {
      new __RESPONSE.CREATED({
         message: "Sign up successfully !",
         metadata: await signUpCustomer(req),
         request: req,
      }).send(res);
   },
   handlerRefreshToken: async (req, res, next) => {
      new __RESPONSE.CREATED({
         message: "Refresh token successfully !",
         metadata: await handlerRefreshTokenCustomer(req),
         request: req,
      }).send(res);
   },
   getCustomerById: async (req, res, next) => {
      new __RESPONSE.GET({
         message: "Get customer successfully !",
         metadata: await getCustomerById(req),
         request: req,
      }).send(res);
   },
};

module.exports = __CUSTOMER_CONTROLLER;
