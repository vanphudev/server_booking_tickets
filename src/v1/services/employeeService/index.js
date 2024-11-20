"use strict";

const __RESPONSE = require("../../core");
const db = require("../../models");
const { validationResult } = require("express-validator");  
const bcrypt = require("bcrypt");
const getInfoEmployee = require("../../utils/getInforEmployee");

const getAllEmployee = async () => {
   try {
      const employees = await db.Employee.findAll({
         include: [
            {
               model: db.EmployeeType,
               as: "employee_belongto_employeeType",
               attributes: ["employee_type_id", "employee_type_name", "employee_type_description"],
            },
            {
               model: db.Office,
               as: "employee_belongto_office",
               attributes: ["office_id"],
            },
         ],
         attributes: [
            "employee_id",
            "employee_full_name",
            "employee_email",
            "employee_phone",
            "employee_username",
            "employee_birthday",
            "employee_password",
            "employee_profile_image",
            "employee_profile_image_public_id",
            "employee_gender",
            "is_first_activation",
            "is_locked",
            "last_lock_at",
            "office_id",
            "employee_type_id",
         ],
         nest: true,
         raw: true,
      });
      if (!employees) {
         throw new __RESPONSE.NotFoundError({
            message: "Không tìm thấy nhân viên nào!",
            suggestion: "Vui lòng kiểm tra lại",
         });
      }
      return {
         employees,
         total: employees.length,
      };
   } catch (error) {
      throw error;
   }
};

const getEmployeeByIdE = async (req) => {
   try {
      const { employeeId } = req.query;
      
      const employee = await db.Employee.findOne({
         where: { employee_id: employeeId },
         include: [
            {
               model: db.EmployeeType,
               as: "employee_belongto_employeeType",
               attributes: ["employee_type_id", "employee_type_name", "employee_type_description"],
            },
            {
               model: db.Office,
               as: "employee_belongto_office",
               attributes: ["office_id"],
            },
         ],
         attributes: [
            "employee_id",
            "employee_full_name",
            "employee_email",
            "employee_phone",
            "employee_username",
            "employee_birthday",
            "employee_profile_image",
            "employee_profile_image_public_id",
            "employee_gender",
            "is_first_activation",
            "is_locked",
            "last_lock_at",
            "office_id",
            "employee_type_id",
         ],
         nest: true,
         raw: true,
      });

      if (!employee) {
         throw new __RESPONSE.NotFoundError({
            message: "Không tìm thấy nhân viên!",
            suggestion: "Vui lòng kiểm tra lại ID nhân viên",
            request: req,
         });
      }

      return { employee };
   } catch (error) {
      throw error;
   }
};
const createEmployee = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed " + errors.array()[0]?.msg,
            suggestion: "Vui lòng kiểm tra lại thông tin",
            request: req,
         });
      }

      const {
         employee_full_name,
         employee_email,
         employee_phone,
         employee_username,
         employee_birthday,
         employee_password,
         employee_gender,
         office_id,
         employee_type_id,
      } = req.body;

      // Kiểm tra email đã tồn tại
      const existingEmail = await db.Employee.findOne({
         where: { employee_email },
      });
      if (existingEmail) {
         throw new __RESPONSE.BadRequestError({
            message: "Email đã được sử dụng!",
            suggestion: "Vui lòng sử dụng email khác",
            request: req,
         });
      }

      // Kiểm tra username đã tồn tại
      const existingUsername = await db.Employee.findOne({
         where: { employee_username },
      });
      if (existingUsername) {
         throw new __RESPONSE.BadRequestError({
            message: "Tên đăng nhập đã được sử dụng!",
            suggestion: "Vui lòng sử dụng tên đăng nhập khác",
            request: req,
         });
      }

      // Kiểm tra số điện thoại đã tồn tại
      const existingPhone = await db.Employee.findOne({
         where: { employee_phone },
      });
      if (existingPhone) {
         throw new __RESPONSE.BadRequestError({
            message: "Số điện thoại đã được sử dụng!",
            suggestion: "Vui lòng sử dụng số điện thoại khác",
            request: req,
         });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(employee_password, 10);

      const employee = await db.Employee.create({
         employee_full_name,
         employee_email,
         employee_phone,
         employee_username,
         employee_birthday: new Date(employee_birthday),
         employee_password: hashedPassword,
         employee_gender: parseInt(employee_gender),
         office_id: parseInt(office_id),
         employee_type_id: parseInt(employee_type_id),
         is_first_activation: 1,
         is_locked: 0,
         employee_profile_image: null,
         employee_profile_image_public_id: null,
         last_lock_at: null
      });

      // Trả về response đúng format
      return {
         employee: getInfoEmployee({
            fileds: [
               "employee_id",
               "employee_email",
               "employee_phone",
               "employee_birthday",
               "employee_username",
               "employee_profile_image",
               "employee_gender",
               "employee_full_name",
               "office_id",
               "employee_type_id"
            ],
            object: employee,
         })
      };

   } catch (error) {
      console.error('Service error:', error);
      throw error;
   }
};
const updateEmployee = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed " + errors.array()[0]?.msg,
            suggestion: "Vui lòng kiểm tra lại thông tin",
            request: req,
         });
      }

      const { employeeId } = req.params;
      const {
         employee_full_name,
         employee_email,
         employee_phone,
         employee_username,
         employee_birthday,
         employee_password,
         employee_gender,
         office_id,
         employee_type_id,
         is_locked,
         employee_profile_image,
         employee_profile_image_public_id
      } = req.body;

      const employee = await db.Employee.findByPk(employeeId);
      if (!employee) {
         throw new __RESPONSE.NotFoundError({
            message: "Không tìm thấy nhân viên!",
            suggestion: "Vui lòng kiểm tra lại ID nhân viên",
            request: req,
         });
      }

      // Kiểm tra email mới có bị trùng không
      if (employee_email) {
         const existingEmail = await db.Employee.findOne({
            where: { 
               employee_email,
               employee_id: { [db.Sequelize.Op.ne]: employeeId }
            },
         });
         if (existingEmail) {
            throw new __RESPONSE.BadRequestError({
               message: "Email đã được sử dụng!",
               suggestion: "Vui lòng sử dụng email khác",
               request: req,
            });
         }
      }

      // Kiểm tra username mới có bị trùng không
      if (employee_username) {
         const existingUsername = await db.Employee.findOne({
            where: { 
               employee_username,
               employee_id: { [db.Sequelize.Op.ne]: employeeId }
            },
         });
         if (existingUsername) {
            throw new __RESPONSE.BadRequestError({
               message: "Tên đăng nhập đã được sử dụng!",
               suggestion: "Vui lòng sử dụng tên đăng nhập khác",
               request: req,
            });
         }
      }

      // Kiểm tra số điện thoại mới có bị trùng không
      if (employee_phone) {
         const existingPhone = await db.Employee.findOne({
            where: { 
               employee_phone,
               employee_id: { [db.Sequelize.Op.ne]: employeeId }
            },
         });
         if (existingPhone) {
            throw new __RESPONSE.BadRequestError({
               message: "Số điện thoại đã được sử dụng!",
               suggestion: "Vui lòng sử dụng số điện thoại khác",
               request: req,
            });
         }
      }

      // Chuẩn bị dữ liệu cập nhật
      const updateData = {
         ...(employee_full_name && { employee_full_name }),
         ...(employee_email && { employee_email }),
         ...(employee_phone && { employee_phone }),
         ...(employee_username && { employee_username }),
         ...(employee_birthday && { employee_birthday: new Date(employee_birthday) }),
         ...(employee_password && { employee_password: await bcrypt.hash(employee_password, 10) }),
         ...(employee_gender !== undefined && { employee_gender: parseInt(employee_gender) }),
         ...(office_id && { office_id: parseInt(office_id) }),
         ...(employee_type_id && { employee_type_id: parseInt(employee_type_id) }),
         ...(is_locked !== undefined && { is_locked: parseInt(is_locked) }),
         ...(employee_profile_image && { employee_profile_image }),
         ...(employee_profile_image_public_id && { employee_profile_image_public_id }),
         ...(is_locked === 1 && { last_lock_at: new Date() })
      };

      await employee.update(updateData);

      return {
         employee: getInfoEmployee({
            fileds: [
               "employee_id",
               "employee_email",
               "employee_phone",
               "employee_birthday",
               "employee_username",
               "employee_profile_image",
               "employee_gender",
               "employee_full_name",
               "office_id",
               "employee_type_id",
               "is_locked",
               "last_lock_at"
            ],
            object: employee,
         })
      };
   } catch (error) {
      console.error('Update Employee Error:', error);
      throw error;
   }
};
const deleteEmployee = async (req) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         throw new __RESPONSE.BadRequestError({
            message: "Validation failed " + errors.array()[0]?.msg,
            suggestion: "Vui lòng kiểm tra lại thông tin",
            request: req,
         });
      }

      const { employeeId } = req.body;

      if (!employeeId) {
         throw new __RESPONSE.BadRequestError({
            message: "ID nhân viên không được để trống",
            suggestion: "Vui lòng cung cấp ID nhân viên",
            request: req,
         });
      }

      const employee = await db.Employee.findByPk(employeeId);
      if (!employee) {
         throw new __RESPONSE.NotFoundError({
            message: "Không tìm thấy nhân viên!",
            suggestion: "Vui lòng kiểm tra lại ID nhân viên",
            request: req,
         });
      }

      // Lưu thông tin nhân viên trước khi xóa
      const employeeInfo = getInfoEmployee({
         fileds: [
            "employee_id",
            "employee_email",
            "employee_phone",
            "employee_username",
            "employee_full_name",
            "office_id",
            "employee_type_id"
         ],
         object: employee,
      });

      await employee.destroy();

      return {
         employee: employeeInfo
      };
   } catch (error) {
      console.error('Delete Employee Error:', error);
      throw error;
   }
};

module.exports = {
   getAllEmployee,
   getEmployeeByIdE,
   createEmployee,
   updateEmployee,
   deleteEmployee
};