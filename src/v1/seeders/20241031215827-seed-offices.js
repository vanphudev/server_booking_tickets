"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy danh sách ward_id từ bảng wards
      const wards = await queryInterface.sequelize.query(`SELECT ward_id FROM wards LIMIT 30;`);
      const wardRows = wards[0];

      const officesData = [
         {
            office_name: "Văn phòng Hà Nội - Cầu Giấy",
            office_address: "48 Dương Khuê, Cầu Giấy, Hà Nội",
            office_phone: "024-3768-9012",
            office_fax: "024-3768-9013",
            office_description: "Văn phòng chính khu vực Cầu Giấy",
            office_latitude: 21.0357,
            office_longitude: 105.7905,
            office_map_url: "http://maps.google.com/?q=21.0357,105.7905",
            ward_id: wardRows[0].ward_id,
         },
         {
            office_name: "Văn phòng HCM - Quận 1",
            office_address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
            office_phone: "028-3823-4567",
            office_fax: "028-3823-4568",
            office_description: "Văn phòng trung tâm Sài Gòn",
            office_latitude: 10.7731,
            office_longitude: 106.7031,
            office_map_url: "http://maps.google.com/?q=10.7731,106.7031",
            ward_id: wardRows[1].ward_id,
         },
         {
            office_name: "Văn phòng Đà Nẵng - Hải Châu",
            office_address: "56 Bạch Đằng, Hải Châu, Đà Nẵng",
            office_phone: "0236-3891-234",
            office_fax: "0236-3891-235",
            office_description: "Văn phòng chính Đà Nẵng",
            office_latitude: 16.0717,
            office_longitude: 108.2243,
            office_map_url: "http://maps.google.com/?q=16.0717,108.2243",
            ward_id: wardRows[2].ward_id,
         },
         {
            office_name: "Văn phòng Nha Trang - Trung tâm",
            office_address: "42 Trần Phú, Lộc Thọ, Nha Trang",
            office_phone: "0258-3522-345",
            office_fax: "0258-3522-346",
            office_description: "Văn phòng trung tâm Nha Trang",
            office_latitude: 12.2388,
            office_longitude: 109.1967,
            office_map_url: "http://maps.google.com/?q=12.2388,109.1967",
            ward_id: wardRows[3].ward_id,
         },
         {
            office_name: "Văn phòng Cần Thơ - Ninh Kiều",
            office_address: "98 Hòa Bình, Ninh Kiều, Cần Thơ",
            office_phone: "0292-3765-432",
            office_fax: "0292-3765-433",
            office_description: "Văn phòng chính Cần Thơ",
            office_latitude: 10.0452,
            office_longitude: 105.7469,
            office_map_url: "http://maps.google.com/?q=10.0452,105.7469",
            ward_id: wardRows[4].ward_id,
         },
      ];

      return queryInterface.bulkInsert("offices", officesData, {});
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("offices", null, {});
   },
};
