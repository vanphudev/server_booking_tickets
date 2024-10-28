"use strict";

const __RESPONSE = require("../../core");
const db = require("../../models");

const getDistrictsByIdProvince = async (req) => {
   const {province_id} = req.query;
   if (!province_id) {
      throw new __RESPONSE.BadRequestError({
         message: "Province ID is required",
         suggestion: "Please check your request",
         request: req,
      });
   }
   try {
      const districts = await db.District.findAll({
         where: {
            province_id,
         },
      });
      if (!districts) {
         throw new __RESPONSE.NotFoundError({
            message: "Districts not found",
            suggestion: "Please check your request",
            request: req,
         });
      }
      return {
         districts,
         total: districts.length,
      };
   } catch (error) {
      throw new __RESPONSE.BadRequestError({
         message: error.message,
         suggestion: "Please check your request",
      });
   }
};

const getDistrictsAll = async (req) => {
   try {
      const districts = await db.District.findAll();
      if (!districts) {
         throw new __RESPONSE.NotFoundError({
            message: "Districts not found",
            suggestion: "Please check your request",
            request: req,
         });
      }
      return {
         districts,
         total: districts.length,
      };
   } catch (error) {
      throw new __RESPONSE.BadRequestError({
         message: error.message,
         suggestion: "Please check your request",
      });
   }
};

module.exports = {
   getDistrictsAll,
   getDistrictsByIdProvince,
};
