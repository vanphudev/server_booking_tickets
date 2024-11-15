"use strict";
const __RESPONSE = require("../../core");
const db = require("../../models");
const { validationResult } = require("express-validator");  
// Get all employee types
const getAllTypeEmployee = async () => {
   try {
      const employeeTypes = await db.EmployeeType.findAll({
         attributes: [
            "employee_type_id",
            "employee_type_name",
            "employee_type_description",
         ],
         nest: true,
         raw: true,
      });
      
      return {
         employeeTypes,
         total: employeeTypes.length,
      };
   } catch (error) {
      console.error('Get All Employee Types Error:', error);
      throw error;
   }
};
// Create new employee type
const createEmployeeType = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed " + errors.array()[0]?.msg,
            suggestion: "Vui lòng kiểm tra lại thông tin",
            request: req,
         });
      }
      const { employee_type_name, employee_type_description } = req.body;
      // Kiểm tra tên loại nhân viên đã tồn tại
      const existingType = await db.EmployeeType.findOne({
         where: { employee_type_name }
      });
      
      if (existingType) {
         throw new __RESPONSE.BadRequestError({
            message: "Tên loại nhân viên đã tồn tại!",
            suggestion: "Vui lòng sử dụng tên khác",
            request: req,
         });
      }
      const employeeType = await db.EmployeeType.create({
         employee_type_name,
         employee_type_description
      });
      return {
         employeeType
      };
   } catch (error) {
      console.error('Create Employee Type Error:', error);
      throw error;
   }
};
// Update employee type
const updateEmployeeType = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed " + errors.array()[0]?.msg,
            suggestion: "Vui lòng kiểm tra lại thông tin",
            request: req,
         });
      }
      const { employee_type_id, employee_type_name, employee_type_description } = req.body;
      const employeeType = await db.EmployeeType.findByPk(employee_type_id);
      if (!employeeType) {
         throw new __RESPONSE.NotFoundError({
            message: "Không tìm thấy loại nhân viên!",
            suggestion: "Vui lòng kiểm tra lại ID",
            request: req,
         });
      }
      // Kiểm tra tên mới có bị trùng không
      if (employee_type_name) {
         const existingType = await db.EmployeeType.findOne({
            where: { 
               employee_type_name,
               employee_type_id: { [db.Sequelize.Op.ne]: employee_type_id }
            }
         });
         
         if (existingType) {
            throw new __RESPONSE.BadRequestError({
               message: "Tên loại nhân viên đã tồn tại!",
               suggestion: "Vui lòng sử dụng tên khác",
               request: req,
            });
         }
      }
      await employeeType.update({
         ...(employee_type_name && { employee_type_name }),
         ...(employee_type_description && { employee_type_description })
      });
      return {
         employeeType
      };
   } catch (error) {
      console.error('Update Employee Type Error:', error);
      throw error;
   }
};
// Delete employee type
const deleteEmployeeType = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed " + errors.array()[0]?.msg,
            suggestion: "Vui lòng kiểm tra lại thông tin",
            request: req,
         });
      }
      const { employee_type_id } = req.body;
      const employeeType = await db.EmployeeType.findByPk(employee_type_id);
      if (!employeeType) {
         throw new __RESPONSE.NotFoundError({
            message: "Không tìm thấy loại nhân viên!",
            suggestion: "Vui lòng kiểm tra lại ID",
            request: req,
         });
      }
      // Kiểm tra xem có nhân viên nào đang sử dụng loại này không
      const employeeCount = await db.Employee.count({
         where: { employee_type_id }
      });
      if (employeeCount > 0) {
         throw new __RESPONSE.BadRequestError({
            message: "Không thể xóa loại nhân viên này!",
            suggestion: "Vẫn còn nhân viên thuộc loại này",
            request: req,
         });
      }
      await employeeType.destroy();
      return {
         employeeType
      };
   } catch (error) {
      console.error('Delete Employee Type Error:', error);
      throw error;
   }
};
module.exports = {
   getAllTypeEmployee,
   createEmployeeType,
   updateEmployeeType,
   deleteEmployeeType
};