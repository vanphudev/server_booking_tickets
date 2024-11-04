"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy group_id từ bảng groups
      const groups = await queryInterface.sequelize.query(`SELECT group_id FROM groups LIMIT 5;`);
      const groupRows = groups[0];

      // Lấy employee_id từ bảng employees
      const employees = await queryInterface.sequelize.query(`SELECT employee_id FROM employees LIMIT 10;`);
      const employeeRows = employees[0];

      return queryInterface.bulkInsert(
         "group_employees",
         [
            // Nhóm 1 với 3 nhân viên
            {
               group_id: groupRows[0].group_id,
               employee_id: employeeRows[0].employee_id,
            },
            {
               group_id: groupRows[0].group_id,
               employee_id: employeeRows[1].employee_id,
            },
            {
               group_id: groupRows[0].group_id,
               employee_id: employeeRows[2].employee_id,
            },
            // Nhóm 2 với 2 nhân viên
            {
               group_id: groupRows[1].group_id,
               employee_id: employeeRows[3].employee_id,
            },
            {
               group_id: groupRows[1].group_id,
               employee_id: employeeRows[4].employee_id,
            },
            // Nhóm 3 với 2 nhân viên
            {
               group_id: groupRows[2].group_id,
               employee_id: employeeRows[5].employee_id,
            },
            {
               group_id: groupRows[2].group_id,
               employee_id: employeeRows[6].employee_id,
            },
            // Nhóm 4 với 1 nhân viên
            {
               group_id: groupRows[3].group_id,
               employee_id: employeeRows[7].employee_id,
            },
            // Nhóm 5 với 2 nhân viên
            {
               group_id: groupRows[4].group_id,
               employee_id: employeeRows[8].employee_id,
            },
            {
               group_id: groupRows[4].group_id,
               employee_id: employeeRows[9].employee_id,
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("group_employees", null, {});
   },
};
