"use strict";

const __RESPONSE = require("../../core/");
const {getProvincesAll} = require("../../services/provinceService");

const __PROVINCE_CONTROLLER = {
   getProvinces: async (req, res, next) => {
      new __RESPONSE.GET({
         message: "List of all provinces",
         metadata: await getProvincesAll(req),
         redirectTo: "",
         suggestion: [],
         request: req,
      }).send(res);
   },
};

module.exports = __PROVINCE_CONTROLLER;
