"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy employee_id từ bảng employees để làm voucher_created_by
      const employees = await queryInterface.sequelize.query(`SELECT employee_id FROM employees LIMIT 30;`);
      const employeeRows = employees[0];

      return queryInterface.bulkInsert(
         "vouchers",
         [
            {
               voucher_code: "TETHOLIDAY",
               voucher_discount_percentage: 15.0,
               voucher_discount_max_amount: 200000,
               voucher_usage_limit: 100,
               voucher_valid_from: "2024-01-20",
               voucher_valid_to: "2024-02-20",
               voucher_created_by: employeeRows[0].employee_id,
            },
            {
               voucher_code: "SUMMER2024",
               voucher_discount_percentage: 10.0,
               voucher_discount_max_amount: 150000,
               voucher_usage_limit: 200,
               voucher_valid_from: "2024-06-01",
               voucher_valid_to: "2024-08-31",
               voucher_created_by: employeeRows[1].employee_id,
            },
            {
               voucher_code: "NEWUSER",
               voucher_discount_percentage: 20.0,
               voucher_discount_max_amount: 100000,
               voucher_usage_limit: 1000,
               voucher_valid_from: "2024-01-01",
               voucher_valid_to: "2024-12-31",
               voucher_created_by: employeeRows[2].employee_id,
            },
            {
               voucher_code: "WEEKEND",
               voucher_discount_percentage: 8.0,
               voucher_discount_max_amount: 120000,
               voucher_usage_limit: 50,
               voucher_valid_from: "2024-02-01",
               voucher_valid_to: "2024-02-29",
               voucher_created_by: employeeRows[3].employee_id,
            },
            {
               voucher_code: "STUDENT",
               voucher_discount_percentage: 25.0,
               voucher_discount_max_amount: 180000,
               voucher_usage_limit: 500,
               voucher_valid_from: "2024-01-01",
               voucher_valid_to: "2024-12-31",
               voucher_created_by: employeeRows[4].employee_id,
            },
            {
               voucher_code: "EARLYBIRD",
               voucher_discount_percentage: 12.0,
               voucher_discount_max_amount: 160000,
               voucher_usage_limit: 300,
               voucher_valid_from: "2024-03-01",
               voucher_valid_to: "2024-03-31",
               voucher_created_by: employeeRows[0].employee_id,
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("vouchers", null, {});
   },
};
