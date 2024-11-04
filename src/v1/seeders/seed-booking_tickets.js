"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy các ID cần thiết từ các bảng liên quan
      const customers = await queryInterface.sequelize.query(
         `SELECT customer_id FROM customers LIMIT 5;`
      );
      const customerRows = customers[0];

      const offices = await queryInterface.sequelize.query(
         `SELECT office_id FROM offices LIMIT 10;`
      );
      const officeRows = offices[0];

      const payments = await queryInterface.sequelize.query(
         `SELECT payment_method_id FROM payment_methods LIMIT 5;`
      );
      const paymentRows = payments[0];

      const vouchers = await queryInterface.sequelize.query(
         `SELECT voucher_id FROM vouchers LIMIT 5;`
      );
      const voucherRows = vouchers[0];

      return queryInterface.bulkInsert(
         "booking_tickets",
         [
            {
               booking_code: "BK24050001",
               booking_status: "pending",
               booking_channel: "web_channel",
               booking_number_of_ticket: 2,
               booking_total_price: 500000,
               discount_amount: 0,
               booking_note: "Đón tại văn phòng",
               booking_session: "WEB_2024050001",
               customer_id: customerRows[0].customer_id,
               office_pickup_id: officeRows[0].office_id,
               office_dropoff_id: officeRows[1].office_id,
               transfer_point_name: "Bến xe miền Đông",
               return_point_name: "Bến xe Đà Lạt",
               payment_method_id: paymentRows[0].payment_method_id,
               payment_status: "completed",
               payment_reference_code: "PAY24050001",
               payment_user_code: "USR24050001",
               payment_amount: 500000,
               voucher_id: null,
            },
            {
               booking_code: "BK24050002",
               booking_status: "confirmed",
               booking_channel: "mobile_app",
               booking_number_of_ticket: 3,
               booking_total_price: 1350000,
               discount_amount: 135000,
               booking_note: "Đón tại nhà, địa chỉ: 123 Nguyễn Văn Linh",
               booking_session: "APP_2024050002",
               customer_id: customerRows[1].customer_id,
               office_pickup_id: officeRows[2].office_id,
               office_dropoff_id: officeRows[3].office_id,
               transfer_point_name: "Văn phòng Quận 7",
               return_point_name: "Bến xe Nha Trang",
               payment_method_id: paymentRows[1].payment_method_id,
               payment_status: "pending",
               payment_reference_code: "PAY24050002",
               payment_user_code: "USR24050002",
               payment_amount: 1215000,
               voucher_id: voucherRows[0].voucher_id,
            },
            {
               booking_code: "BK24050003",
               booking_status: "completed",
               booking_channel: "office",
               booking_number_of_ticket: 1,
               booking_total_price: 250000,
               discount_amount: 50000,
               booking_note: "Khách hàng VIP",
               booking_session: "OFF_2024050003",
               customer_id: customerRows[2].customer_id,
               office_pickup_id: officeRows[4].office_id,
               office_dropoff_id: officeRows[5].office_id,
               transfer_point_name: "Văn phòng Quận 1",
               return_point_name: "Bến xe Vũng Tàu",
               payment_method_id: paymentRows[2].payment_method_id,
               payment_status: "completed",
               payment_reference_code: "PAY24050003",
               payment_user_code: "USR24050003",
               payment_amount: 200000,
               voucher_id: voucherRows[1].voucher_id,
            },
            {
               booking_code: "BK24050004",
               booking_status: "cancelled",
               booking_channel: "web_channel",
               booking_number_of_ticket: 2,
               booking_total_price: 800000,
               discount_amount: 80000,
               booking_note: "Hủy do thay đổi lịch trình",
               booking_session: "WEB_2024050004",
               customer_id: customerRows[3].customer_id,
               office_pickup_id: officeRows[6].office_id,
               office_dropoff_id: officeRows[7].office_id,
               transfer_point_name: "Bến xe miền Tây",
               return_point_name: "Bến xe Cần Thơ",
               payment_method_id: paymentRows[3].payment_method_id,
               payment_status: "refunded",
               payment_reference_code: "PAY24050004",
               payment_user_code: "USR24050004",
               payment_amount: 720000,
               voucher_id: null,
            },
            {
               booking_code: "BK24050005",
               booking_status: "pending",
               booking_channel: "hotline",
               booking_number_of_ticket: 4,
               booking_total_price: 1000000,
               discount_amount: 200000,
               booking_note: "Đặt qua tổng đài",
               booking_session: "HOT_2024050005",
               customer_id: customerRows[4].customer_id,
               office_pickup_id: officeRows[8].office_id,
               office_dropoff_id: officeRows[9].office_id,
               transfer_point_name: "Văn phòng Tân Bình",
               return_point_name: "Bến xe Phan Thiết",
               payment_method_id: paymentRows[4].payment_method_id,
               payment_status: "pending",
               payment_reference_code: "PAY24050005",
               payment_user_code: "USR24050005",
               payment_amount: 800000,
               voucher_id: voucherRows[2].voucher_id,
            }
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("booking_tickets", null, {});
   },
};