"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy vehicle_id từ bảng vehicles
      const vehicles = await queryInterface.sequelize.query(`SELECT vehicle_id FROM vehicles;`);
      const vehicleRows = vehicles[0];

      return queryInterface.bulkInsert(
         "vehicle_images",
         [
            // Xe Limousine 9 chỗ
            {
               vehicle_image_url: "https://storage.googleapis.com/vex-config/vehicles/limousine-9-ngoai-that.webp",
               vehicle_image_description: "Ngoại thất xe Limousine 9 chỗ cao cấp",
               vehicle_image_type: "webp",
               vehicle_id: vehicleRows[0].vehicle_id,
            },
            {
               vehicle_image_url: "https://storage.googleapis.com/vex-config/vehicles/limousine-9-noi-that.webp",
               vehicle_image_description: "Nội thất xe Limousine 9 chỗ sang trọng",
               vehicle_image_type: "webp",
               vehicle_id: vehicleRows[0].vehicle_id,
            },
            {
               vehicle_image_url: "https://storage.googleapis.com/vex-config/vehicles/limousine-9-ghe.webp",
               vehicle_image_description: "Ghế massage cao cấp trên xe Limousine",
               vehicle_image_type: "webp",
               vehicle_id: vehicleRows[0].vehicle_id,
            },

            // Xe giường nằm 40 chỗ
            {
               vehicle_image_url: "https://storage.googleapis.com/vex-config/vehicles/giuong-nam-ngoai-that.webp",
               vehicle_image_description: "Ngoại thất xe giường nằm 40 chỗ",
               vehicle_image_type: "webp",
               vehicle_id: vehicleRows[1].vehicle_id,
            },
            {
               vehicle_image_url: "https://storage.googleapis.com/vex-config/vehicles/giuong-nam-noi-that.webp",
               vehicle_image_description: "Nội thất xe giường nằm rộng rãi",
               vehicle_image_type: "webp",
               vehicle_id: vehicleRows[1].vehicle_id,
            },
            {
               vehicle_image_url: "https://storage.googleapis.com/vex-config/vehicles/giuong-nam-toilet.webp",
               vehicle_image_description: "Toilet trên xe giường nằm",
               vehicle_image_type: "webp",
               vehicle_id: vehicleRows[1].vehicle_id,
            },

            // Xe Limousine phòng riêng
            {
               vehicle_image_url: "https://storage.googleapis.com/vex-config/vehicles/limousine-phong-ngoai-that.webp",
               vehicle_image_description: "Ngoại thất xe Limousine phòng riêng",
               vehicle_image_type: "webp",
               vehicle_id: vehicleRows[2].vehicle_id,
            },
            {
               vehicle_image_url: "https://storage.googleapis.com/vex-config/vehicles/limousine-phong-noi-that.webp",
               vehicle_image_description: "Nội thất phòng riêng trên xe",
               vehicle_image_type: "webp",
               vehicle_id: vehicleRows[2].vehicle_id,
            },
            {
               vehicle_image_url: "https://storage.googleapis.com/vex-config/vehicles/limousine-phong-tien-nghi.webp",
               vehicle_image_description: "Tiện nghi phòng riêng cao cấp",
               vehicle_image_type: "webp",
               vehicle_id: vehicleRows[2].vehicle_id,
            },

            // Xe ghế ngồi 45 chỗ
            {
               vehicle_image_url: "https://storage.googleapis.com/vex-config/vehicles/xe-ghe-ngoai-that.webp",
               vehicle_image_description: "Ngoại thất xe ghế ngồi 45 chỗ",
               vehicle_image_type: "webp",
               vehicle_id: vehicleRows[3].vehicle_id,
            },
            {
               vehicle_image_url: "https://storage.googleapis.com/vex-config/vehicles/xe-ghe-noi-that.webp",
               vehicle_image_description: "Nội thất xe ghế ngồi",
               vehicle_image_type: "webp",
               vehicle_id: vehicleRows[3].vehicle_id,
            },

            // Xe VIP 12 chỗ
            {
               vehicle_image_url: "https://storage.googleapis.com/vex-config/vehicles/vip-12-ngoai-that.webp",
               vehicle_image_description: "Ngoại thất xe VIP 12 chỗ",
               vehicle_image_type: "webp",
               vehicle_id: vehicleRows[4].vehicle_id,
            },
            {
               vehicle_image_url: "https://storage.googleapis.com/vex-config/vehicles/vip-12-noi-that.webp",
               vehicle_image_description: "Nội thất xe VIP sang trọng",
               vehicle_image_type: "webp",
               vehicle_id: vehicleRows[4].vehicle_id,
            },
            {
               vehicle_image_url: "https://storage.googleapis.com/vex-config/vehicles/vip-12-tien-nghi.webp",
               vehicle_image_description: "Tiện nghi giải trí trên xe VIP",
               vehicle_image_type: "webp",
               vehicle_id: vehicleRows[4].vehicle_id,
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("vehicle_images", null, {});
   },
};
