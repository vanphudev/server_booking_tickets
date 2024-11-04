"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy trip_id từ bảng trips
      const trips = await queryInterface.sequelize.query(
         `SELECT trip_id FROM trips LIMIT 5;`
      );
      const tripRows = trips[0];

      // Lấy map_vehicle_seat_id từ bảng map_vehicle_seats
      const seats = await queryInterface.sequelize.query(
         `SELECT map_vehicle_seat_id FROM map_vehicle_seats LIMIT 20;`
      );
      const seatRows = seats[0];

      return queryInterface.bulkInsert(
         "booking_seats",
         [
            // Chuyến 1 - Ghế đã đặt
            {
                trip_id: tripRows[0].trip_id,
                map_vehicle_seat_id: seatRows[0].map_vehicle_seat_id,
                booking_seat_status: 'booked',
                booking_seat_price: 250000,
          
            },
            {
                trip_id: tripRows[0].trip_id,
                map_vehicle_seat_id: seatRows[1].map_vehicle_seat_id,
                booking_seat_status: 'available',
                booking_seat_price: 250000,         
            },
            // Chuyến 2 - Ghế đã đặt và còn trống
            {
                trip_id: tripRows[1].trip_id,
                map_vehicle_seat_id: seatRows[2].map_vehicle_seat_id,
                booking_seat_status: 'booked',
                booking_seat_price: 300000,          
            },
            {
                trip_id: tripRows[1].trip_id,
                map_vehicle_seat_id: seatRows[3].map_vehicle_seat_id,
                booking_seat_status: 'locked',
                booking_seat_price: 300000,       
            },
            // Chuyến 3 - Ghế VIP
            {
                trip_id: tripRows[2].trip_id,
                map_vehicle_seat_id: seatRows[4].map_vehicle_seat_id,
                booking_seat_status: 'available',
                booking_seat_price: 450000,         
            },
            {
                trip_id: tripRows[2].trip_id,
                map_vehicle_seat_id: seatRows[5].map_vehicle_seat_id,
                booking_seat_status: 'booked',
                booking_seat_price: 450000,         
            },
            // Chuyến 4 - Ghế giường nằm
            {
                trip_id: tripRows[3].trip_id,
                map_vehicle_seat_id: seatRows[6].map_vehicle_seat_id,
                booking_seat_status: 'booked',
                booking_seat_price: 400000,        
            },
            {
                trip_id: tripRows[3].trip_id,
                map_vehicle_seat_id: seatRows[7].map_vehicle_seat_id,
                booking_seat_status: 'available',
                booking_seat_price: 400000,        
            },
            // Chuyến 5 - Ghế thường
            {
                trip_id: tripRows[4].trip_id,
                map_vehicle_seat_id: seatRows[8].map_vehicle_seat_id,
                booking_seat_status: 'booked',
                booking_seat_price: 200000,         
            },
            {
                trip_id: tripRows[4].trip_id,
                map_vehicle_seat_id: seatRows[9].map_vehicle_seat_id,
                booking_seat_status: 'available',
                booking_seat_price: 200000,
        
            }
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("booking_seats", null, {});
   },
};