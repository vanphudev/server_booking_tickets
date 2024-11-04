"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy payment_type_id từ bảng payment_types
      const paymentTypes = await queryInterface.sequelize.query(`SELECT payment_type_id FROM payment_types LIMIT 10;`);
      const typeRows = paymentTypes[0];

      return queryInterface.bulkInsert(
         "payment_methods",
         [
            {
               payment_method_code: "VNPAY",
               payment_method_name: "Thanh toán qua VNPay",
               payment_method_description:
                  "Thanh toán trực tuyến qua cổng VNPay, hỗ trợ hầu hết các ngân hàng tại Việt Nam",
               payment_type_id: typeRows[0].payment_type_id,
               is_active: 1,
            },
            {
               payment_method_code: "MOMO",
               payment_method_name: "Ví MoMo",
               payment_method_description: "Thanh toán qua ví điện tử MoMo, nhanh chóng và tiện lợi",
               payment_type_id: typeRows[1].payment_type_id,
               is_active: 1,
            },
            {
               payment_method_code: "ZALOPAY",
               payment_method_name: "Ví ZaloPay",
               payment_method_description: "Thanh toán qua ví điện tử ZaloPay, liên kết với tài khoản Zalo",
               payment_type_id: typeRows[1].payment_type_id,
               is_active: 1,
            },
            {
               payment_method_code: "PAYPAL",
               payment_method_name: "PayPal",
               payment_method_description: "Thanh toán quốc tế qua PayPal, an toàn và bảo mật",
               payment_type_id: typeRows[2].payment_type_id,
               is_active: 1,
            },
            {
               payment_method_code: "STRIPE",
               payment_method_name: "Stripe",
               payment_method_description: "Thanh toán qua cổng Stripe, hỗ trợ đa dạng thẻ quốc tế",
               payment_type_id: typeRows[3].payment_type_id,
               is_active: 1,
            },
            {
               payment_method_code: "CASH",
               payment_method_name: "Tiền mặt",
               payment_method_description: "Thanh toán bằng tiền mặt tại quầy hoặc khi nhận vé",
               payment_type_id: typeRows[4].payment_type_id,
               is_active: 1,
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("payment_methods", null, {});
   },
};
