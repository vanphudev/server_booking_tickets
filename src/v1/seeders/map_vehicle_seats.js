"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy map_vehicle_layout_id từ bảng map_vehicle_layouts
      const layouts = await queryInterface.sequelize.query(
         `SELECT map_vehicle_layout_id FROM map_vehicle_layouts LIMIT 5;`
      );
      const layoutRows = layouts[0];

      return queryInterface.bulkInsert(
         "map_vehicle_seats",
         [
            // Layout 1 - Xe 16 chỗ
            {
               map_vehicle_seat_code: "A01",
               map_vehicle_seat_row_no: 1,
               map_vehicle_seat_column_no: 1,
               map_vehicle_seat_floor_no: 1,
               map_vehicle_seat_type: "Ghế ngồi",
               map_vehicle_seat_status: "available",
               map_vehicle_layout_id: layoutRows[0].map_vehicle_layout_id,
            },
            {
               map_vehicle_seat_code: "A02",
               map_vehicle_seat_row_no: 1,
               map_vehicle_seat_column_no: 2,
               map_vehicle_seat_floor_no: 1,
               map_vehicle_seat_type: "Ghế ngồi",
               map_vehicle_seat_status: "available",
               map_vehicle_layout_id: layoutRows[0].map_vehicle_layout_id,
            },
            // Layout 2 - Xe 29 chỗ
            {
               map_vehicle_seat_code: "B01",
               map_vehicle_seat_row_no: 1,
               map_vehicle_seat_column_no: 1,
               map_vehicle_seat_floor_no: 1,
               map_vehicle_seat_type: "Ghế nằm",
               map_vehicle_seat_status: "available",
               map_vehicle_layout_id: layoutRows[1].map_vehicle_layout_id,
            },
            {
               map_vehicle_seat_code: "B02",
               map_vehicle_seat_row_no: 1,
               map_vehicle_seat_column_no: 2,
               map_vehicle_seat_floor_no: 1,
               map_vehicle_seat_type: "Ghế nằm",
               map_vehicle_seat_status: "available",
               map_vehicle_layout_id: layoutRows[1].map_vehicle_layout_id,
            },
            // Layout 3 - Xe giường nằm
            {
               map_vehicle_seat_code: "C01",
               map_vehicle_seat_row_no: 1,
               map_vehicle_seat_column_no: 1,
               map_vehicle_seat_floor_no: 2,
               map_vehicle_seat_type: "Giường nằm",
               map_vehicle_seat_status: "available",
               map_vehicle_layout_id: layoutRows[2].map_vehicle_layout_id,
            },
            {
               map_vehicle_seat_code: "C02",
               map_vehicle_seat_row_no: 1,
               map_vehicle_seat_column_no: 2,
               map_vehicle_seat_floor_no: 2,
               map_vehicle_seat_type: "Giường nằm",
               map_vehicle_seat_status: "available",
               map_vehicle_layout_id: layoutRows[2].map_vehicle_layout_id,
            },
            // Layout 4 - Xe limousine
            {
               map_vehicle_seat_code: "D01",
               map_vehicle_seat_row_no: 1,
               map_vehicle_seat_column_no: 1,
               map_vehicle_seat_floor_no: 1,
               map_vehicle_seat_type: "Ghế VIP",
               map_vehicle_seat_status: "available",
               map_vehicle_layout_id: layoutRows[3].map_vehicle_layout_id,
            },
            {
               map_vehicle_seat_code: "D02",
               map_vehicle_seat_row_no: 1,
               map_vehicle_seat_column_no: 2,
               map_vehicle_seat_floor_no: 1,
               map_vehicle_seat_type: "Ghế VIP",
               map_vehicle_seat_status: "available",
               map_vehicle_layout_id: layoutRows[3].map_vehicle_layout_id,
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("map_vehicle_seats", null, {});
   },
};
