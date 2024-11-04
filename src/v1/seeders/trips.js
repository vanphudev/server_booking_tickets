"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy route_id từ bảng routes
      const routes = await queryInterface.sequelize.query(`SELECT route_id FROM routes LIMIT 30;`);
      const routeRows = routes[0];

      // Lấy vehicle_id từ bảng vehicles
      const vehicles = await queryInterface.sequelize.query(`SELECT vehicle_id FROM vehicles LIMIT 30;`);
      const vehicleRows = vehicles[0];

      return queryInterface.bulkInsert(
         "trips",
         [
            // Sài Gòn - Đà Lạt (Xe giường nằm)
            {
               trip_arrival_time: "2024-02-15 14:00:00",
               trip_departure_time: "2024-02-15 08:00:00",
               trip_date: "2024-02-15",
               trip_price: 450000,
               trip_discount: 0,
               trip_shuttle_enable: 1,
               allow_online_booking: 1,
               trip_holiday: 0,
               route_id: routeRows[0].route_id,
               vehicle_id: vehicleRows[0].vehicle_id,
            },
            // Sài Gòn - Nha Trang (Xe limousine)
            {
               trip_arrival_time: "2024-02-15 16:30:00",
               trip_departure_time: "2024-02-15 09:00:00",
               trip_date: "2024-02-15",
               trip_price: 350000,
               trip_discount: 10,
               trip_shuttle_enable: 1,
               allow_online_booking: 1,
               trip_holiday: 0,
               route_id: routeRows[1].route_id,
               vehicle_id: vehicleRows[1].vehicle_id,
            },
            // Sài Gòn - Vũng Tàu (Xe thường)
            {
               trip_arrival_time: "2024-02-15 09:30:00",
               trip_departure_time: "2024-02-15 07:00:00",
               trip_date: "2024-02-15",
               trip_price: 150000,
               trip_discount: 0,
               trip_shuttle_enable: 0,
               allow_online_booking: 1,
               trip_holiday: 0,
               route_id: routeRows[2].route_id,
               vehicle_id: vehicleRows[2].vehicle_id,
            },
            // Sài Gòn - Cần Thơ (Xe giường đôi)
            {
               trip_arrival_time: "2024-02-15 12:00:00",
               trip_departure_time: "2024-02-15 08:00:00",
               trip_date: "2024-02-15",
               trip_price: 250000,
               trip_discount: 15,
               trip_shuttle_enable: 1,
               allow_online_booking: 1,
               trip_holiday: 0,
               route_id: routeRows[3].route_id,
               vehicle_id: vehicleRows[3].vehicle_id,
            },
            // Sài Gòn - Đà Nẵng (Xe limousine cao cấp)
            {
               trip_arrival_time: "2024-02-16 08:00:00",
               trip_departure_time: "2024-02-15 14:00:00",
               trip_date: "2024-02-15",
               trip_price: 850000,
               trip_discount: 5,
               trip_shuttle_enable: 1,
               allow_online_booking: 1,
               trip_holiday: 0,
               route_id: routeRows[4].route_id,
               vehicle_id: vehicleRows[4].vehicle_id,
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("trips", null, {});
   },
};
