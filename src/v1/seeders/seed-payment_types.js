"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
         "payment_types",
         [
            {
               payment_type_name: "Thẻ ghi nợ",
            },
            {
               payment_type_name: "Thẻ tín dụng",
            },
            {
               payment_type_name: "Ví điện tử ",
            },
            {
               payment_type_name: "Chuyển khoản ngân hàng ",
            },
            {
               payment_type_name: "Tiền mặt",
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("payment_types", null, {});
   },
};
