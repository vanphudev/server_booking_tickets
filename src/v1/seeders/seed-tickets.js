"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy trip_id từ bảng trips
      const trips = await queryInterface.sequelize.query(`SELECT trip_id FROM trips LIMIT 30;`);
      const tripRows = trips[0];

      // Lấy booking_seat_id từ bảng booking_seats
      const bookingSeats = await queryInterface.sequelize.query(`SELECT booking_seat_id FROM booking_seats LIMIT 10;`);
      const seatRows = bookingSeats[0];

      return queryInterface.bulkInsert(
         "tickets",
         [
            // Vé giường nằm - Sài Gòn đi Đà Lạt
            {
               trip_id: tripRows[0].trip_id,
               booking_seat_id: seatRows[0].booking_seat_id,
               ticket_name_chair: "G01",
               is_export_ticket: 1,
               ticket_amount: 450000,
            },
            // Vé giường nằm VIP - Sài Gòn đi Đà Lạt
            {
               trip_id: tripRows[0].trip_id,
               booking_seat_id: seatRows[1].booking_seat_id,
               ticket_name_chair: "G02",
               is_export_ticket: 1,
               ticket_amount: 500000,
            },
            // Vé limousine - Sài Gòn đi Nha Trang
            {
               trip_id: tripRows[1].trip_id,
               booking_seat_id: seatRows[2].booking_seat_id,
               ticket_name_chair: "L01",
               is_export_ticket: 1,
               ticket_amount: 350000,
            },
            // Vé thường - Sài Gòn đi Vũng Tàu
            {
               trip_id: tripRows[2].trip_id,
               booking_seat_id: seatRows[3].booking_seat_id,
               ticket_name_chair: "A01",
               is_export_ticket: 0,
               ticket_amount: 150000,
            },
            // Vé thường - Sài Gòn đi Vũng Tàu
            {
               trip_id: tripRows[2].trip_id,
               booking_seat_id: seatRows[4].booking_seat_id,
               ticket_name_chair: "A02",
               is_export_ticket: 1,
               ticket_amount: 150000,
            },
            // Vé giường đôi - Sài Gòn đi Cần Thơ
            {
               trip_id: tripRows[3].trip_id,
               booking_seat_id: seatRows[5].booking_seat_id,
               ticket_name_chair: "D01",
               is_export_ticket: 1,
               ticket_amount: 250000,
            },
            // Vé limousine - Sài Gòn đi Đà Nẵng
            {
               trip_id: tripRows[4].trip_id,
               booking_seat_id: seatRows[6].booking_seat_id,
               ticket_name_chair: "L02",
               is_export_ticket: 0,
               ticket_amount: 850000,
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("tickets", null, {});
   },
};
