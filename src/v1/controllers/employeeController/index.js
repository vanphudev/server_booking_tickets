"use strict";

const __RESPONSE = require("../../core");
const {logOut, signIn, handlerRefreshToken, getEmployeeById} = require("../../services/accessService/employeeAccess");

const __EMPLOYEE_CONTROLLER = {
   logOut: async (req, res, next) => {
      new __RESPONSE.DELETE({
         message: "Logout successfully !",
         metadata: await logOut(req),
         request: req,
      }).send(res);
   },
   signIn: async (req, res, next) => {
      new __RESPONSE.CREATED({
         message: "Login successfully !",
         metadata: await signIn(req),
         request: req,
      }).send(res);
   },
   handlerRefreshToken: async (req, res, next) => {
      new __RESPONSE.CREATED({
         message: "Refresh token successfully !",
         metadata: await handlerRefreshToken(req),
         request: req,
      }).send(res);
   },
   getEmployeeById: async (req, res, next) => {
      new __RESPONSE.GET({
         message: "Get employee successfully !",
         metadata: await getEmployeeById(req),
         request: req,
      }).send(res);
   },
};

module.exports = __EMPLOYEE_CONTROLLER;
