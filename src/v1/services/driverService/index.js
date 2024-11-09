"use strict";
const __RESPONSE = require("../../core");
const {validationResult} = require("express-validator");
const db = require("../../models");

const getAllDrivers = async () => {
   try {
      const drivers = await db.Driver.findAll({
         attributes: [
            "driver_id",
            "driver_license_number",
            "driver_experience_years",
            "employee_id",
            "created_at",
            "updated_at"
         ],
         include: [
            {
               model: db.Employee,
               as: "driver_onetoOne_employee",
               attributes: [
                  "employee_id",
                  "employee_full_name",
                  "employee_email",
                  "employee_phone",
                  "employee_profile_image",
                  "employee_gender"
               ],
               where: {
                  deleted_at: null
               }
            },
         ],
         where: {
            deleted_at: null
         },
         order: [["driver_id", "ASC"]],
      });

      return {drivers, total: drivers.length};
   } catch (error) {
      console.error("getAllDrivers Error:", error);
      throw new __RESPONSE.BadRequestError({
         message: "Error in finding all drivers",
         suggestion: "Please check database connection",
         details: error.message,
      });
   }
};

const getDriverById = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed: " + errors.array()[0]?.msg,
            suggestion: "Please provide the correct data",
         });
      }

      const {driverId} = req.query;
      const driver = await db.Driver.findOne({
         where: {
            driver_id: driverId,
            deleted_at: null
         },
         attributes: [
            "driver_id",
            "driver_license_number",
            "driver_experience_years",
            "employee_id",
            "created_at",
            "updated_at"
         ],
         include: [
            {
               model: db.Employee,
               as: "driver_onetoOne_employee",
               attributes: [
                  "employee_id",
                  "employee_full_name",
                  "employee_email",
                  "employee_phone",
                  "employee_profile_image",
                  "employee_gender"
               ],
               where: {
                  deleted_at: null
               }
            },
         ],
      });

      if (!driver) {
         throw new __RESPONSE.NotFoundError({
            message: "Driver not found",
            suggestion: "Please check the driver ID",
         });
      }

      return {driver};
   } catch (error) {
      console.error("getDriverById Error:", error);
      if (error instanceof __RESPONSE.NotFoundError) throw error;
      throw new __RESPONSE.BadRequestError({
         message: "Error in finding driver",
         suggestion: "Please check your request",
         details: error.message,
      });
   }
};

const createDriver = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed: " + errors.array()[0]?.msg,
            suggestion: "Please provide the correct data",
         });
      }

      const {license_number, experience_years, employee_id} = req.body;

      // Kiểm tra employee tồn tại
      const employee = await db.Employee.findOne({
         where: {
            employee_id: employee_id,
            deleted_at: null
         }
      });
      
      if (!employee) {
         throw new __RESPONSE.NotFoundError({
            message: "Employee not found",
            suggestion: "Please check the employee ID",
         });
      }

      const driver = await db.Driver.create({
         driver_license_number: license_number,
         driver_experience_years: experience_years,
         employee_id: employee_id,
      });

      const newDriver = await db.Driver.findOne({
         where: {driver_id: driver.driver_id},
         attributes: [
            "driver_id",
            "driver_license_number",
            "driver_experience_years",
            "employee_id",
            "created_at",
            "updated_at"
         ],
         include: [
            {
               model: db.Employee,
               as: "driver_onetoOne_employee",
               attributes: [
                  "employee_id",
                  "employee_full_name",
                  "employee_email",
                  "employee_phone",
                  "employee_profile_image",
                  "employee_gender"
               ]
            },
         ],
      });

      return {driver: newDriver};
   } catch (error) {
      console.error("createDriver Error:", error);
      if (error.name === "SequelizeUniqueConstraintError") {
         throw new __RESPONSE.BadRequestError({
            message: "Employee ID already exists for another driver",
            suggestion: "Please use different employee ID",
         });
      }
      throw new __RESPONSE.BadRequestError({
         message: "Error in creating driver",
         suggestion: "Please check your request",
         details: error.message,
      });
   }
};

const updateDriver = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed: " + errors.array()[0]?.msg,
            suggestion: "Please provide the correct data",
         });
      }

      const id = parseInt(req.params.id);
      const {license_number, experience_years, employee_id} = req.body;

      const driver = await db.Driver.findOne({
         where: {
            driver_id: id,
            deleted_at: null
         },
      });

      if (!driver) {
         throw new __RESPONSE.NotFoundError({
            message: "Driver not found",
            suggestion: "Please check the driver ID",
         });
      }

      if (employee_id) {
         const employee = await db.Employee.findOne({
            where: {
               employee_id: employee_id,
               deleted_at: null
            }
         });
         if (!employee) {
            throw new __RESPONSE.NotFoundError({
               message: "Employee not found",
               suggestion: "Please check the employee ID",
            });
         }
      }

      await driver.update({
         driver_license_number: license_number || driver.driver_license_number,
         driver_experience_years: experience_years || driver.driver_experience_years,
         employee_id: employee_id || driver.employee_id,
      });

      const updatedDriver = await db.Driver.findOne({
         where: {driver_id: id},
         attributes: [
            "driver_id",
            "driver_license_number",
            "driver_experience_years",
            "employee_id",
            "created_at",
            "updated_at"
         ],
         include: [
            {
               model: db.Employee,
               as: "driver_onetoOne_employee",
               attributes: [
                  "employee_id",
                  "employee_full_name",
                  "employee_email",
                  "employee_phone",
                  "employee_profile_image",
                  "employee_gender"
               ]
            },
         ],
      });

      return {driver: updatedDriver};
   } catch (error) {
      console.error("updateDriver Error:", error);
      if (error.name === "SequelizeUniqueConstraintError") {
         throw new __RESPONSE.BadRequestError({
            message: "Employee ID already exists for another driver",
            suggestion: "Please use different employee ID",
         });
      }
      throw new __RESPONSE.BadRequestError({
         message: "Error in updating driver",
         suggestion: "Please check your request",
         details: error.message,
      });
   }
};

const deleteDriver = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed: " + errors.array()[0]?.msg,
            suggestion: "Please provide the correct data",
         });
      }

      const id = parseInt(req.params.id);
      const driver = await db.Driver.findOne({
         where: {
            driver_id: id,
            deleted_at: null
         },
      });

      if (!driver) {
         throw new __RESPONSE.NotFoundError({
            message: "Driver not found",
            suggestion: "Please check the driver ID",
         });
      }

      await driver.destroy();
      return {message: "Driver deleted successfully"};
   } catch (error) {
      console.error("deleteDriver Error:", error);
      throw new __RESPONSE.BadRequestError({
         message: "Error in deleting driver",
         suggestion: "Please check your request",
         details: error.message,
      });
   }
};

module.exports = {
   getAllDrivers,
   getDriverById,
   createDriver,
   updateDriver,
   deleteDriver,
};