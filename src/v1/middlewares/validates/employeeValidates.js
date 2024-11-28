const { body, param } = require("express-validator");

// Validate cho route get employee by id
const validateEmployee = [
   param("employeeId")
      .notEmpty().withMessage("ID nhân viên không được để trống")
      .isInt().withMessage("ID nhân viên phải là số")
];


// Validate cho việc tạo mới employee
const validateCreateEmployee = [
   body("employee_full_name")
   .notEmpty().withMessage("Họ tên nhân viên không được để trống")
   .isLength({ min: 2, max: 500 }).withMessage("Họ tên phải từ 2-500 ký tự"),

body("employee_email")
   .optional()
   .isEmail().withMessage("Email không hợp lệ")
   .isLength({ max: 500 }).withMessage("Email không được vượt quá 500 ký tự"),

body("employee_username")
   .optional()
   .isLength({ min: 3, max: 255 }).withMessage("Tên đăng nhập phải từ 3-255 ký tự"),

body("employee_phone")
   .optional()
   .isMobilePhone("vi-VN").withMessage("Số điện thoại không hợp lệ")
   .isLength({ max: 20 }).withMessage("Số điện thoại không được vượt quá 20 ký tự"),

   body("employee_birthday")
      .optional()
      .isDate().withMessage("Ngày sinh không hợp lệ"),
   
   body("employee_password")
      .notEmpty().withMessage("Mật khẩu không được để trống")
      .isLength({ min: 6 }).withMessage("Mật khẩu phải có ít nhất 6 ký tự"),
   
   body("employee_gender")
      .optional()
      .isIn([-1, 0, 1]).withMessage("Giới tính không hợp lệ"),
   
   body("office_id")
      .optional()
      .isInt().withMessage("ID văn phòng phải là số"),
   
   body("employee_type_id")
      .optional()
      .isInt().withMessage("ID loại nhân viên phải là số")
];

// Validate cho việc cập nhật employee
const validateUpdateEmployee = [
   param("employeeId")
      .notEmpty().withMessage("ID nhân viên không được để trống")
      .isInt().withMessage("ID nhân viên phải là số"),
   
   body("employee_full_name")
      .optional()
      .isLength({ min: 2, max: 500 }).withMessage("Họ tên phải từ 2-500 ký tự"),
   
   body("employee_email")
      .optional()
      .isEmail().withMessage("Email không hợp lệ")
      .isLength({ max: 500 }).withMessage("Email không được vượt quá 500 ký tự"),
   
   body("employee_phone")
      .optional()
      .isMobilePhone("vi-VN").withMessage("Số điện thoại không hợp lệ")
      .isLength({ max: 20 }).withMessage("Số điện thoại không được vượt quá 20 ký tự"),
   
   body("employee_username")
      .optional()
      .isLength({ min: 3, max: 255 }).withMessage("Tên đăng nhập phải từ 3-255 ký tự"),
   
   body("employee_birthday")
      .optional()
      .isDate().withMessage("Ngày sinh không hợp lệ")
      .custom((value) => {
         if (value < "1900-01-01" || value > "2100-12-31") {
            throw new Error("Ngày sinh phải nằm trong khoảng 1900-01-01 đến 2100-12-31");
         }
         return true;
      }),
   
   body("employee_password")
      .optional()
      .isLength({ min: 6 }).withMessage("Mật khẩu phải có ít nhất 6 ký tự"),
   
   body("employee_gender")
      .optional()
      .isIn([-1, 0, 1]).withMessage("Giới tính không hợp lệ"),
   
   body("office_id")
      .optional()
      .isInt().withMessage("ID văn phòng phải là số"),
   
   body("employee_type_id")
      .optional()
      .isInt().withMessage("ID loại nhân viên phải là số"),
   
   body("is_locked")
      .optional()
      .isIn([0, 1]).withMessage("Trạng thái khóa không hợp lệ")
];
const validateDeleteEmployee = [
   param("employeeId")
      .notEmpty().withMessage("ID nhân viên không được để trống")
      .isInt().withMessage("ID nhân viên phải là số"),
];
module.exports = {
   validateEmployee,
   validateCreateEmployee,
   validateUpdateEmployee,
   validateDeleteEmployee,
};