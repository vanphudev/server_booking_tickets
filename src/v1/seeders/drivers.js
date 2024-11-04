"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy employee_id từ bảng employees
      const employees = await queryInterface.sequelize.query(
         `SELECT employee_id FROM employees WHERE employee_position = 'Tài xế' LIMIT 10;`
      );
      const employeeRows = employees[0];

      return queryInterface.bulkInsert(
         "drivers",
         [
            {
               driver_license_number: "79B1234567",
               driver_license_class: "B2",
               driver_experience_years: 10,
               driver_health_cert_number: "HC001/2024",
               employee_id: employeeRows[0].employee_id,
            },
            {
               driver_license_number: "79C2345678",
               driver_license_class: "C",
               driver_experience_years: 5,
               driver_health_cert_number: "HC002/2024",
               employee_id: employeeRows[1].employee_id,
            },
            {
               driver_license_number: "79D3456789",
               driver_license_class: "D",
               driver_experience_years: 8,
               driver_health_cert_number: "HC003/2024",
               employee_id: employeeRows[2].employee_id,
            },
            {
               driver_license_number: "79E4567890",
               driver_license_class: "E",
               driver_experience_years: 15,
               driver_health_cert_number: "HC004/2024",
               employee_id: employeeRows[3].employee_id,
            },
            {
               driver_license_number: "79F5678901",
               driver_license_class: "FC",
               driver_experience_years: 12,
               driver_health_cert_number: "HC005/2024",
               employee_id: employeeRows[4].employee_id,
            },
            {
               driver_license_number: "79G6789012",
               driver_license_class: "D",
               driver_experience_years: 7,
               driver_health_cert_number: "HC006/2024",
               employee_id: employeeRows[5].employee_id,
            },
            {
               driver_license_number: "79H7890123",
               driver_license_class: "E",
               driver_experience_years: 9,
               driver_health_cert_number: "HC007/2024",
               employee_id: employeeRows[6].employee_id,
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("drivers", null, {});
   },
};
