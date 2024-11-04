"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy trip_id từ bảng trips
      const trips = await queryInterface.sequelize.query(`SELECT trip_id FROM trips LIMIT 30;`);
      const tripRows = trips[0];

      // Lấy employee_id từ bảng employees
      const employees = await queryInterface.sequelize.query(`SELECT employee_id FROM employees LIMIT 10;`);
      const employeeRows = employees[0];

      return queryInterface.bulkInsert(
         "trip_employees",
         [
            // Chuyến 1: 1 tài xế chính, 1 phụ xe
            {
               trip_id: tripRows[0].trip_id,
               employee_id: employeeRows[0].employee_id, // Tài xế chính
            },
            {
               trip_id: tripRows[0].trip_id,
               employee_id: employeeRows[1].employee_id, // Phụ xe
            },
            // Chuyến 2: 2 tài xế (đường dài), 1 tiếp viên
            {
               trip_id: tripRows[1].trip_id,
               employee_id: employeeRows[2].employee_id, // Tài xế 1
            },
            {
               trip_id: tripRows[1].trip_id,
               employee_id: employeeRows[3].employee_id, // Tài xế 2
            },
            {
               trip_id: tripRows[1].trip_id,
               employee_id: employeeRows[4].employee_id, // Tiếp viên
            },
            // Chuyến 3: 1 tài xế (đường ngắn)
            {
               trip_id: tripRows[2].trip_id,
               employee_id: employeeRows[5].employee_id, // Tài xế
            },
            // Chuyến 4: 1 tài xế chính, 1 phụ xe, 1 tiếp viên
            {
               trip_id: tripRows[3].trip_id,
               employee_id: employeeRows[6].employee_id, // Tài xế chính
            },
            {
               trip_id: tripRows[3].trip_id,
               employee_id: employeeRows[7].employee_id, // Phụ xe
            },
            {
               trip_id: tripRows[3].trip_id,
               employee_id: employeeRows[8].employee_id, // Tiếp viên
            },
            // Chuyến 5: 2 tài xế (đường dài)
            {
               trip_id: tripRows[4].trip_id,
               employee_id: employeeRows[9].employee_id, // Tài xế 1
            },
            {
               trip_id: tripRows[4].trip_id,
               employee_id: employeeRows[0].employee_id, // Tài xế 2
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("trip_employees", null, {});
   },
};
