"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy ward_id từ bảng wards
      const wards = await queryInterface.sequelize.query(`SELECT ward_id FROM wards;`);
      const wardRows = wards[0];

      return queryInterface.bulkInsert(
         "offices",
         [
            {
               office_name: "Văn phòng Sài Gòn - Bến xe Miền Đông",
               office_address: "292 Đinh Bộ Lĩnh, Phường 26, Bình Thạnh, TP.HCM",
               office_phone: "02838991234",
               office_fax: "02838991235",
               office_description: "Văn phòng chính tại Sài Gòn, phục vụ các tuyến Đông Nam Bộ và miền Trung",
               office_latitude: "10.8156",
               office_longitude: "106.7096",
               office_map_url: "https://maps.google.com/?q=10.8156,106.7096",
               is_locked: 0,
               ward_id: wardRows[0].ward_id,
            },
            {
               office_name: "Văn phòng Đà Lạt",
               office_address: "01 Nguyễn Chí Thanh, Phường 1, TP. Đà Lạt",
               office_phone: "02633555666",
               office_fax: "02633555667",
               office_description: "Văn phòng tại Đà Lạt, phục vụ các tuyến từ Đà Lạt đi các tỉnh",
               office_latitude: "11.9404",
               office_longitude: "108.4259",
               office_map_url: "https://maps.google.com/?q=11.9404,108.4259",
               is_locked: 0,
               ward_id: wardRows[1].ward_id,
            },
            {
               office_name: "Văn phòng Nha Trang",
               office_address: "23 Tô Hiến Thành, Phường Lộc Thọ, TP. Nha Trang",
               office_phone: "02583822345",
               office_fax: "02583822346",
               office_description: "Văn phòng tại Nha Trang, phục vụ các tuyến dọc miền Trung",
               office_latitude: "12.2388",
               office_longitude: "109.1967",
               office_map_url: "https://maps.google.com/?q=12.2388,109.1967",
               is_locked: 0,
               ward_id: wardRows[2].ward_id,
            },
            {
               office_name: "Văn phòng Cần Thơ",
               office_address: "55 Đường 3/2, Phường Xuân Khánh, Quận Ninh Kiều",
               office_phone: "02923839123",
               office_fax: "02923839124",
               office_description: "Văn phòng tại Cần Thơ, phục vụ các tuyến miền Tây",
               office_latitude: "10.0333",
               office_longitude: "105.7833",
               office_map_url: "https://maps.google.com/?q=10.0333,105.7833",
               is_locked: 0,
               ward_id: wardRows[3].ward_id,
            },
            {
               office_name: "Văn phòng Đà Nẵng",
               office_address: "201 Tôn Đức Thắng, Phường Hòa Minh, Quận Liên Chiểu",
               office_phone: "02363721234",
               office_fax: "02363721235",
               office_description: "Văn phòng tại Đà Nẵng, phục vụ các tuyến miền Trung",
               office_latitude: "16.0544",
               office_longitude: "108.2022",
               office_map_url: "https://maps.google.com/?q=16.0544,108.2022",
               is_locked: 0,
               ward_id: wardRows[4].ward_id,
            },
            {
               office_name: "Văn phòng Hà Nội",
               office_address: "789 Giải Phóng, Quận Hoàng Mai",
               office_phone: "02438776543",
               office_fax: "02438776544",
               office_description: "Văn phòng tại Hà Nội, phục vụ các tuyến phía Bắc",
               office_latitude: "21.0245",
               office_longitude: "105.8412",
               office_map_url: "https://maps.google.com/?q=21.0245,105.8412",
               is_locked: 0,
               ward_id: wardRows[5].ward_id,
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("offices", null, {});
   },
};
