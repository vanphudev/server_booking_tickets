"use strict";

const __RESPONSE = require("../../core/");
const db = require("../../models");

const getAllWards = async (req) => {
   try {
      const wards = await db.Ward.findAll();
      if (!wards) {
         throw new __RESPONSE.NotFoundError({
            message: "Wards not found",
            suggestion: "Please check your request",
            request: req,
         });
      }
      return {
         wards,
         total: wards.length,
      };
   } catch (error) {
      throw new __RESPONSE.BadRequestError({
         message: error.message,
         suggestion: "Please check your request",
      });
   }
};

const getWardsByIdDistrict = async (req) => {
   const {district_id} = req.query;
   if (!district_id) {
      throw new __RESPONSE.BadRequestError({
         message: "District ID is required",
         suggestion: "Please check your request",
         request: req,
      });
   }
   try {
      const wards = await db.Ward.findAll({
         where: {
            district_id,
         },
      });
      if (!wards) {
         throw new __RESPONSE.NotFoundError({
            message: "Wards not found",
            suggestion: "Please check your request",
            request: req,
         });
      }
      return {
         wards,
         total: wards.length,
      };
   } catch (error) {
      throw new __RESPONSE.BadRequestError({
         message: error.message,
         suggestion: "Please check your request",
      });
   }
};

module.exports = {
   getAllWards,
   getWardsByIdDistrict,
};
