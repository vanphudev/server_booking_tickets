"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy office_id từ bảng offices
      const offices = await queryInterface.sequelize.query(`SELECT office_id FROM offices;`);
      const officeRows = offices[0];

      return queryInterface.bulkInsert(
         "office_images",
         [
            // Hình ảnh Văn phòng Sài Gòn
            {
               office_image_url: "https://storage.googleapis.com/vex-config/offices/saigon-office-front.webp",
               office_image_description: "Mặt tiền văn phòng Sài Gòn tại Bến xe Miền Đông",
               office_image_type: "webp",
               office_id: officeRows[0].office_id,
            },
            {
               office_image_url: "https://storage.googleapis.com/vex-config/offices/saigon-office-lobby.webp",
               office_image_description: "Sảnh chờ rộng rãi tại văn phòng Sài Gòn",
               office_image_type: "webp",
               office_id: officeRows[0].office_id,
            },

            // Hình ảnh Văn phòng Đà Lạt
            {
               office_image_url: "https://storage.googleapis.com/vex-config/offices/dalat-office-exterior.webp",
               office_image_description: "Không gian ngoại thất văn phòng Đà Lạt",
               office_image_type: "webp",
               office_id: officeRows[1].office_id,
            },
            {
               office_image_url: "https://storage.googleapis.com/vex-config/offices/dalat-office-counter.webp",
               office_image_description: "Quầy vé và khu vực tiếp tân văn phòng Đà Lạt",
               office_image_type: "webp",
               office_id: officeRows[1].office_id,
            },

            // Hình ảnh Văn phòng Nha Trang
            {
               office_image_url: "https://storage.googleapis.com/vex-config/offices/nhatrang-office-view.webp",
               office_image_description: "Tầm nhìn từ văn phòng Nha Trang ra biển",
               office_image_type: "webp",
               office_id: officeRows[2].office_id,
            },
            {
               office_image_url: "https://storage.googleapis.com/vex-config/offices/nhatrang-office-waiting.webp",
               office_image_description: "Khu vực chờ máy lạnh tại văn phòng Nha Trang",
               office_image_type: "webp",
               office_id: officeRows[2].office_id,
            },

            // Hình ảnh Văn phòng Cần Thơ
            {
               office_image_url: "https://storage.googleapis.com/vex-config/offices/cantho-office-building.webp",
               office_image_description: "Tòa nhà văn phòng Cần Thơ",
               office_image_type: "webp",
               office_id: officeRows[3].office_id,
            },
            {
               office_image_url: "https://storage.googleapis.com/vex-config/offices/cantho-office-interior.webp",
               office_image_description: "Nội thất hiện đại của văn phòng Cần Thơ",
               office_image_type: "webp",
               office_id: officeRows[3].office_id,
            },

            // Hình ảnh Văn phòng Đà Nẵng
            {
               office_image_url: "https://storage.googleapis.com/vex-config/offices/danang-office-facade.webp",
               office_image_description: "Mặt tiền văn phòng Đà Nẵng",
               office_image_type: "webp",
               office_id: officeRows[4].office_id,
            },
            {
               office_image_url: "https://storage.googleapis.com/vex-config/offices/danang-office-reception.webp",
               office_image_description: "Khu vực lễ tân văn phòng Đà Nẵng",
               office_image_type: "webp",
               office_id: officeRows[4].office_id,
            },

            // Hình ảnh Văn phòng Hà Nội
            {
               office_image_url: "https://storage.googleapis.com/vex-config/offices/hanoi-office-entrance.webp",
               office_image_description: "Lối vào văn phòng Hà Nội",
               office_image_type: "webp",
               office_id: officeRows[5].office_id,
            },
            {
               office_image_url: "https://storage.googleapis.com/vex-config/offices/hanoi-office-workspace.webp",
               office_image_description: "Không gian làm việc tại văn phòng Hà Nội",
               office_image_type: "webp",
               office_id: officeRows[5].office_id,
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("office_images", null, {});
   },
};
