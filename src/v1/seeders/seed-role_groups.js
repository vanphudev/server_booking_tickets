"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy role_id từ bảng roles
      const roles = await queryInterface.sequelize.query(`SELECT role_id FROM roles LIMIT 30;`);
      const roleRows = roles[0];

      // Lấy group_id từ bảng groups
      const groups = await queryInterface.sequelize.query(`SELECT group_id FROM groups LIMIT 30;`);
      const groupRows = groups[0];

      return queryInterface.bulkInsert(
         "role_groups",
         [
            // Nhóm Admin - Full quyền
            {
               role_id: roleRows[0].role_id,
               group_id: groupRows[0].group_id,
            },
            {
               role_id: roleRows[1].role_id,
               group_id: groupRows[0].group_id,
            },
            // Nhóm Quản lý
            {
               role_id: roleRows[1].role_id,
               group_id: groupRows[1].group_id,
            },
            {
               role_id: roleRows[2].role_id,
               group_id: groupRows[1].group_id,
            },
            // Nhóm Nhân viên bán vé
            {
               role_id: roleRows[2].role_id,
               group_id: groupRows[2].group_id,
            },
            // Nhóm Nhân viên hỗ trợ
            {
               role_id: roleRows[3].role_id,
               group_id: groupRows[3].group_id,
            },
            // Nhóm Tài xế
            {
               role_id: roleRows[4].role_id,
               group_id: groupRows[4].group_id,
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("role_groups", null, {});
   },
};
