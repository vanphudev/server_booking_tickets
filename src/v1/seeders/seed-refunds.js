"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy các ID cần thiết từ các bảng liên quan
      const bookings = await queryInterface.sequelize.query(`SELECT booking_id FROM booking_tickets LIMIT 20;`);
      const bookingRows = bookings[0];

      const tickets = await queryInterface.sequelize.query(`SELECT ticket_id FROM tickets LIMIT 5;`);
      const ticketRows = tickets[0];

      const employees = await queryInterface.sequelize.query(`SELECT employee_id FROM employees LIMIT 5;`);
      const employeeRows = employees[0];

      const offices = await queryInterface.sequelize.query(`SELECT office_id FROM offices LIMIT 5;`);
      const officeRows = offices[0];

      return queryInterface.bulkInsert(
         "refunds",
         [
            {
               booking_id: bookingRows[0].booking_id,
               ticket_id: ticketRows[0].ticket_id,
               refund_amount: 450000,
               refund_description: "Hoàn tiền 100% do chuyến xe bị hủy",
               refund_percentage: 100.0,
               employee_id: employeeRows[0].employee_id,
               office_id: officeRows[0].office_id,
               is_refunded: 1,
               refund_method: "online",
               is_approved: 1,
            },
            {
               booking_id: bookingRows[1].booking_id,
               ticket_id: ticketRows[1].ticket_id,
               refund_amount: 125000,
               refund_description: "Hoàn tiền 50% do hủy vé trước 24h",
               refund_percentage: 50.0,
               employee_id: employeeRows[1].employee_id,
               office_id: officeRows[1].office_id,
               is_refunded: 1,
               refund_method: "in_office",
               is_approved: 1,
            },
            {
               booking_id: bookingRows[2].booking_id,
               ticket_id: ticketRows[2].ticket_id,
               refund_amount: 300000,
               refund_description: "Hoàn tiền 75% do sự cố kỹ thuật xe",
               refund_percentage: 75.0,
               employee_id: employeeRows[2].employee_id,
               office_id: officeRows[2].office_id,
               is_refunded: 0,
               refund_method: "online",
               is_approved: 1,
            },
            {
               booking_id: bookingRows[3].booking_id,
               ticket_id: ticketRows[3].ticket_id,
               refund_amount: 60000,
               refund_description: "Hoàn tiền 30% do khách hàng đổi lịch",
               refund_percentage: 30.0,
               employee_id: employeeRows[3].employee_id,
               office_id: officeRows[3].office_id,
               is_refunded: 0,
               refund_method: "in_office",
               is_approved: 0,
            },
            {
               booking_id: bookingRows[4].booking_id,
               ticket_id: ticketRows[4].ticket_id,
               refund_amount: 90000,
               refund_description: "Hoàn tiền 20% do hủy vé gấp",
               refund_percentage: 20.0,
               employee_id: employeeRows[4].employee_id,
               office_id: officeRows[4].office_id,
               is_refunded: 1,
               refund_method: "online",
               is_approved: 1,
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("refunds", null, {});
   },
};
