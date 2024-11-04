"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy group_id từ bảng groups
      const groups = await queryInterface.sequelize.query(`SELECT group_id FROM groups LIMIT 5;`);
      const groupRows = groups[0];

      // Lấy customer_id từ bảng customers
      const customers = await queryInterface.sequelize.query(`SELECT customer_id FROM customers LIMIT 10;`);
      const customerRows = customers[0];

      return queryInterface.bulkInsert(
         "group_customers",
         [
            // Nhóm 1 với 3 khách hàng
            {
               group_id: groupRows[0].group_id,
               customer_id: customerRows[0].customer_id,
            },
            {
               group_id: groupRows[0].group_id,
               customer_id: customerRows[1].customer_id,
            },
            {
               group_id: groupRows[0].group_id,
               customer_id: customerRows[2].customer_id,
            },
            // Nhóm 2 với 2 khách hàng
            {
               group_id: groupRows[1].group_id,
               customer_id: customerRows[3].customer_id,
            },
            {
               group_id: groupRows[1].group_id,
               customer_id: customerRows[4].customer_id,
            },
            // Nhóm 3 với 2 khách hàng
            {
               group_id: groupRows[2].group_id,
               customer_id: customerRows[5].customer_id,
            },
            {
               group_id: groupRows[2].group_id,
               customer_id: customerRows[6].customer_id,
            },
            // Nhóm 4 với 1 khách hàng
            {
               group_id: groupRows[3].group_id,
               customer_id: customerRows[7].customer_id,
            },
            // Nhóm 5 với 2 khách hàng
            {
               group_id: groupRows[4].group_id,
               customer_id: customerRows[8].customer_id,
            },
            {
               group_id: groupRows[4].group_id,
               customer_id: customerRows[9].customer_id,
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("group_customers", null, {});
   },
};
