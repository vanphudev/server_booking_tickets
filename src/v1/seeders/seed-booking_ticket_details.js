"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy booking_id từ bảng bookings
      const bookings = await queryInterface.sequelize.query(
         `SELECT booking_id FROM bookings LIMIT 10;`
      );
      const bookingRows = bookings[0];

      // Lấy ticket_id từ bảng tickets
      const tickets = await queryInterface.sequelize.query(
         `SELECT ticket_id FROM tickets LIMIT 10;`
      );
      const ticketRows = tickets[0];

      return queryInterface.bulkInsert(
         "booking_ticket_details",
         [
            {
               booking_id: bookingRows[0].booking_id,
               ticket_id: ticketRows[0].ticket_id,
               price: 250000,
            },
            {
               booking_id: bookingRows[1].booking_id,
               ticket_id: ticketRows[1].ticket_id,
               price: 450000,
            },
            {
               booking_id: bookingRows[2].booking_id,
               ticket_id: ticketRows[2].ticket_id,
               price: 400000,
            },
            {
               booking_id: bookingRows[3].booking_id,
               ticket_id: ticketRows[3].ticket_id,
               price: 150000,
            },
            {
               booking_id: bookingRows[4].booking_id,
               ticket_id: ticketRows[4].ticket_id,
               price: 300000,
            },
            {
               booking_id: bookingRows[5].booking_id,
               ticket_id: ticketRows[5].ticket_id,
               price: 350000,
            },
            {
               booking_id: bookingRows[6].booking_id,
               ticket_id: ticketRows[6].ticket_id,
               price: 200000,
            }
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("booking_ticket_details", null, {});
   },
};