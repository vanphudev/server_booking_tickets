"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy voucher_id từ bảng vouchers
      const vouchers = await queryInterface.sequelize.query(`SELECT voucher_id FROM vouchers;`);
      const voucherRows = vouchers[0];

      return queryInterface.bulkInsert(
         "voucher_conditions",
         [
            // Điều kiện cho voucher TETHOLIDAY
            {
               voucher_id: voucherRows[0].voucher_id,
               condition_type: "min_order_value",
               condition_value: "1000000", // Đơn tối thiểu 1 triệu
            },
            {
               voucher_id: voucherRows[0].voucher_id,
               condition_type: "route_type",
               condition_value: "long_distance", // Chỉ áp dụng cho tuyến đường dài
            },

            // Điều kiện cho voucher SUMMER2024
            {
               voucher_id: voucherRows[1].voucher_id,
               condition_type: "min_order_value",
               condition_value: "500000", // Đơn tối thiểu 500k
            },
            {
               voucher_id: voucherRows[1].voucher_id,
               condition_type: "booking_time",
               condition_value: "advance_7days", // Đặt trước 7 ngày
            },

            // Điều kiện cho voucher NEWUSER
            {
               voucher_id: voucherRows[2].voucher_id,
               condition_type: "user_type",
               condition_value: "new_user", // Chỉ cho khách hàng mới
            },
            {
               voucher_id: voucherRows[2].voucher_id,
               condition_type: "min_order_value",
               condition_value: "300000", // Đơn tối thiểu 300k
            },

            // Điều kiện cho voucher WEEKEND
            {
               voucher_id: voucherRows[3].voucher_id,
               condition_type: "booking_day",
               condition_value: "weekend", // Chỉ áp dụng cuối tuần
            },
            {
               voucher_id: voucherRows[3].voucher_id,
               condition_type: "vehicle_type",
               condition_value: "limousine", // Chỉ áp dụng cho xe Limousine
            },

            // Điều kiện cho voucher STUDENT
            {
               voucher_id: voucherRows[4].voucher_id,
               condition_type: "user_category",
               condition_value: "student", // Chỉ áp dụng cho sinh viên
            },
            {
               voucher_id: voucherRows[4].voucher_id,
               condition_type: "route_type",
               condition_value: "intercity", // Áp dụng cho tuyến liên tỉnh
            },

            // Điều kiện cho voucher EARLYBIRD
            {
               voucher_id: voucherRows[5].voucher_id,
               condition_type: "booking_time",
               condition_value: "before_6am", // Đặt vé trước 6h sáng
            },
            {
               voucher_id: voucherRows[5].voucher_id,
               condition_type: "min_order_value",
               condition_value: "400000", // Đơn tối thiểu 400k
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("voucher_conditions", null, {});
   },
};
