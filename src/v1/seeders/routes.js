"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy danh sách ward_id từ bảng wards
      const wards = await queryInterface.sequelize.query(`SELECT ward_id FROM wards LIMIT 30;`);
      const wardRows = wards[0];

      const routesData = [
         {
            route_name: "Tuyến xe Hà Nội - Đà Nẵng",
            route_duration: 840,
            route_distance: 763,
            route_url_gps: "http://maps.google.com/?q=21.0285,105.8542to16.0544,108.2022",
            origin_office_id: wardRows[0].ward_id,
            destination_office_id: wardRows[1].ward_id,
            route_price: 450000.0,
            way_id: wardRows[0].ward_id,
         },
         {
            route_name: "Tuyến xe Hà Nội - HCM",
            route_duration: 1680,
            route_distance: 1709,
            route_url_gps: "http://maps.google.com/?q=21.0285,105.8542to10.7769,106.7009",
            origin_office_id: wardRows[2].ward_id,
            destination_office_id: wardRows[3].ward_id,
            route_price: 950000.0,
            way_id: wardRows[2].ward_id,
         },
         {
            route_name: "Tuyến xe Đà Nẵng - Nha Trang",
            route_duration: 600,
            route_distance: 520,
            route_url_gps: "http://maps.google.com/?q=16.0544,108.2022to12.2388,109.1967",
            origin_office_id: wardRows[4].ward_id,
            destination_office_id: wardRows[5].ward_id,
            route_price: 350000.0,
            way_id: wardRows[4].ward_id,
         },
         {
            route_name: "Tuyến xe HCM - Cần Thơ",
            route_duration: 240, // 4 giờ
            route_distance: 169,
            route_url_gps: "http://maps.google.com/?q=10.7769,106.7009to10.0452,105.7469",
            origin_office_id: wardRows[6].ward_id,
            destination_office_id: wardRows[7].ward_id,
            route_price: 180000.0,
            way_id: wardRows[6].ward_id,
         },
         {
            route_name: "Tuyến xe Nha Trang - Đà Lạt",
            route_duration: 420, // 7 giờ
            route_distance: 214,
            route_url_gps: "http://maps.google.com/?q=12.2388,109.1967to11.9404,108.4583",
            origin_office_id: wardRows[8].ward_id,
            destination_office_id: wardRows[9].ward_id,
            route_price: 220000.0,
            way_id: wardRows[8].ward_id,
         },
         {
            route_name: "Tuyến xe Huế - Đà Nẵng",
            route_duration: 180, // 3 giờ
            route_distance: 108,
            route_url_gps: "http://maps.google.com/?q=16.4637,107.5909to16.0544,108.2022",
            origin_office_id: wardRows[10].ward_id,
            destination_office_id: wardRows[11].ward_id,
            route_price: 120000.0,
            way_id: wardRows[10].ward_id,
         },
      ];

      return queryInterface.bulkInsert("routes", routesData, {});
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("routes", null, {});
   },
};
