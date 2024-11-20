"use strict";
const __RESPONSE = require("../../core");
const db = require("../../models");
const bycrypt = require("bcrypt");
const {validationResult} = require("express-validator");
const crypto = require("crypto");
const {createTokenPair, verifyToken} = require("../../middlewares/Auth/authUtils");

const {
   createKeyToken,
   findTokenByEmployeeId,
   removeKeyByEmployeeId,
   findRefreshTokenUsed,
} = require("../keyTokenService/keyTokenService");
const getInfoEmployee = require("../../utils/getInforEmployee");

const handlerRefreshToken = async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }
   const {refreshToken, employeeId} = req.body;
   const foundKeyTokenUsed = await findRefreshTokenUsed(refreshToken);
   if (foundKeyTokenUsed) {
      const foundKeyToken = await db.KeyStoreEmployee.findOne({
         where: {key_store_employee_id: foundKeyTokenUsed.key_store_employee_id},
      });
      const {userId} = verifyToken(refreshToken, foundKeyToken.private_key_employee);
      await removeKeyByEmployeeId(userId);
      throw new __RESPONSE.UnauthorizedError({
         message: "Token đã được sử dụng! Vui lòng đăng nhập lại!",
         suggestion: "Please check again your request",
         request: req,
      });
   }
   const foundKeyToken = await findTokenByEmployeeId(employeeId);
   if (foundKeyToken) {
      const {userId} = verifyToken(refreshToken, foundKeyToken.private_key_employee);
      const employee = await db.Employee.findOne({where: {employee_id: userId}});
      if (!employee) {
         throw new __RESPONSE.UnauthorizedError({
            message: "Token không tồn tại! - Đăng nhập lại!",
            suggestion: "Please check again your request",
            request: req,
         });
      }
      if (!employee.employee_id || employee.employee_id != employeeId) {
         throw new __RESPONSE.UnauthorizedError({
            message: "Token không tồn tại! - Đăng nhập lại!",
            suggestion: "Please check again your request",
            request: req,
         });
      }
      const tokens = await createTokenPair(
         {
            userId: employee.employee_id,
            email: employee.employee_email,
            phone: employee.employee_phone,
            fullName: employee.employee_full_name,
            gender: employee.employee_gender,
            birthday: employee.employee_birthday,
            username: employee.employee_username,
            profileImage: employee.employee_profile_image,
         },
         foundKeyToken.public_key_employee,
         foundKeyToken.private_key_employee
      );

      await foundKeyToken
         .update(
            {
               refresh_token_key_employee: tokens.refreshToken,
            },
            {where: {employee_id: employee.employee_id}}
         )
         .then((keyToken) => {
            if (!keyToken) {
               throw new __RESPONSE.UnauthorizedError({
                  message: "Lỗi cập nhật token - Error updating token",
                  suggestion: "Please check again your request",
               });
            }
         });

      await db.RefreshKeyUsedEmployee.create({
         key_store_employee_id: foundKeyToken.key_store_employee_id,
         refreshkey_used_employee_key: refreshToken,
      }).then((refreshKeyUsed) => {
         if (!refreshKeyUsed) {
            throw new __RESPONSE.UnauthorizedError({
               message: "Lỗi thêm token vào danh sách đã sử dụng - Error adding token to used list",
               suggestion: "Please check again your request",
            });
         }
      });

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
            ],
            object: employee,
         }),
         tokens,
      };
   } else {
      throw new __RESPONSE.UnauthorizedError({
         message: "Token không tồn tại! - Đăng nhập lại!",
         suggestion: "Please check again your request",
         request: req,
      });
   }
};

const logOut = async ({keyStore}) => {
   if (!keyStore) {
      throw new __RESPONSE.NotFoundError({
         message: "Không tìm thấy token - Token not found",
         suggestion: "Please check again your request",
      });
   }
   const keyToken = await removeKeyByEmployeeId(keyStore.employee_id);
   if (!keyToken) {
      throw new __RESPONSE.BadRequestError({
         message: "Lỗi xóa token - Error deleting token",
         suggestion: "Please check again your request",
      });
   }
   return {keyToken};
};

const signIn = async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }
   const {username, password} = req.body;
   const employee = await db.Employee.findOne({where: {employee_username: username}});
   if (!employee) {
      throw new __RESPONSE.NotFoundError({
         message: "Không tìm thấy nhân viên - Employee not found",
         suggestion: "Please check again your request",
      });
   }

   const isPasswordValid = await bycrypt.compare(password, employee.employee_password);
   if (!isPasswordValid) {
      throw new __RESPONSE.BadRequestError({
         message: "Mật khẩu không đúng - Invalid password",
         suggestion: "Please check again your request",
      });
   }

   const privateKey = crypto.randomBytes(64).toString("hex");
   const publicKey = crypto.randomBytes(64).toString("hex");

   const tokens = await createTokenPair(
      {
         userId: employee.employee_id,
         email: employee.employee_email,
         phone: employee.employee_phone,
         fullName: employee.employee_full_name,
         gender: employee.employee_gender,
         birthday: employee.employee_birthday,
         username: employee.employee_username,
         profileImage: employee.employee_profile_image,
      },
      publicKey,
      privateKey
   );

   await createKeyToken({userId: employee.employee_id, publicKey, privateKey, refreshToken: tokens.refreshToken})
      .then((keyToken) => {
         if (!keyToken) {
            throw new __RESPONSE.BadRequestError({
               message: "Lỗi tạo token - Error creating token",
               suggestion: "Please check again your request",
            });
         }
      })
      .catch((error) => {
         if (error instanceof __RESPONSE.BadRequestError) {
            throw error;
         }
         throw new __RESPONSE.BadRequestError({
            message: "Lỗi tạo token - Error creating token",
            suggestion: "Please check again your request",
         });
      });
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
         ],
         object: employee,
      }),
      tokens,
   };
};

const getEmployeeById = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }
   const {employeeId} = req.params;
   const employee = await db.Employee.findOne({where: {employee_id: employeeId}});
   if (!employee) {
      throw new __RESPONSE.UnauthorizedError({
         message: "Không tìm thấy nhân viên - Employee not found",
         suggestion: "Please check again your request",
      });
   }
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
         ],
         object: employee,
      }),
   };
};

module.exports = {logOut, signIn, handlerRefreshToken, getEmployeeById};
