"use strict";

const __RESPONSE = require("../../core/");
const db = require("../../models");

const getProvincesAll = async () => {
   const listProvince = await db.Province.findAll();
   if (!listProvince) {
      throw new Error("No province found !");
   }
   return {
      listProvince,
      total: listProvince.length,
   };
};

module.exports = {
   getProvincesAll,
};
