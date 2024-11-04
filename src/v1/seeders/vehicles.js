"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy các ID cần thiết
      const layouts = await queryInterface.sequelize.query(`SELECT map_vehicle_layout_id FROM map_vehicle_layouts;`);
      const layoutRows = layouts[0];

      const offices = await queryInterface.sequelize.query(`SELECT office_id FROM offices;`);
      const officeRows = offices[0];

      const types = await queryInterface.sequelize.query(`SELECT vehicle_type_id FROM vehicle_types;`);
      const typeRows = types[0];

      return queryInterface.bulkInsert(
         "vehicles",
         [
            // Xe Limousine 9 chỗ cao cấp
            {
               vehicle_license_plate: "51B-888.88",
               vehicle_model: "Solati Limousine",
               vehicle_brand: "Hyundai",
               vehicle_capacity: 9,
               vehicle_manufacture_year: 2023,
               vehicle_color: "Đen bóng",
               vehicle_description:
                  "Xe Limousine 9 chỗ cao cấp, trang bị ghế massage, màn hình giải trí, tủ lạnh, wifi 4G tốc độ cao",
               map_vehicle_layout_id: layoutRows[0].map_vehicle_layout_id,
               office_id: officeRows[0].office_id,
               vehicle_type_id: typeRows[0].vehicle_type_id,
               is_active: 1,
            },
            // Xe giường nằm 40 chỗ
            {
               vehicle_license_plate: "51B-666.66",
               vehicle_model: "Universe Noble",
               vehicle_brand: "Hyundai",
               vehicle_capacity: 40,
               vehicle_manufacture_year: 2023,
               vehicle_color: "Trắng - Xanh",
               vehicle_description:
                  "Xe giường nằm cao cấp 40 chỗ, trang bị toilet, wifi, ổ cắm điện, màn hình LCD, điều hòa",
               map_vehicle_layout_id: layoutRows[1].map_vehicle_layout_id,
               office_id: officeRows[1].office_id,
               vehicle_type_id: typeRows[1].vehicle_type_id,
               is_active: 1,
            },
            // Xe Limousine phòng riêng
            {
               vehicle_license_plate: "51B-999.99",
               vehicle_model: "Dcar President",
               vehicle_brand: "Ford",
               vehicle_capacity: 12,
               vehicle_manufacture_year: 2024,
               vehicle_color: "Đen - Vàng",
               vehicle_description:
                  "Xe Limousine phòng riêng hạng thương gia, trang bị giường nằm cao cấp, TV 42 inch, tủ lạnh, toilet riêng",
               map_vehicle_layout_id: layoutRows[2].map_vehicle_layout_id,
               office_id: officeRows[2].office_id,
               vehicle_type_id: typeRows[2].vehicle_type_id,
               is_active: 1,
            },
            // Xe ghế ngồi 45 chỗ
            {
               vehicle_license_plate: "51B-555.55",
               vehicle_model: "Thaco Town TB85S",
               vehicle_brand: "Thaco",
               vehicle_capacity: 45,
               vehicle_manufacture_year: 2023,
               vehicle_color: "Trắng",
               vehicle_description:
                  "Xe ghế ngồi 45 chỗ chất lượng cao, ghế bọc da, điều hòa công suất lớn, wifi miễn phí",
               map_vehicle_layout_id: layoutRows[3].map_vehicle_layout_id,
               office_id: officeRows[3].office_id,
               vehicle_type_id: typeRows[3].vehicle_type_id,
               is_active: 1,
            },
            // Xe VIP 12 chỗ
            {
               vehicle_license_plate: "51B-777.77",
               vehicle_model: "Solati Pro",
               vehicle_brand: "Hyundai",
               vehicle_capacity: 12,
               vehicle_manufacture_year: 2024,
               vehicle_color: "Bạc",
               vehicle_description:
                  "Xe VIP 12 chỗ cao cấp, ghế da công nghệ mới, hệ thống giải trí đa phương tiện, wifi 5G",
               map_vehicle_layout_id: layoutRows[4].map_vehicle_layout_id,
               office_id: officeRows[4].office_id,
               vehicle_type_id: typeRows[4].vehicle_type_id,
               is_active: 1,
            },
            // Xe Fuso 22 chỗ
            {
               vehicle_license_plate: "51B-333.33",
               vehicle_model: "Rosa",
               vehicle_brand: "Fuso",
               vehicle_capacity: 22,
               vehicle_manufacture_year: 2023,
               vehicle_color: "Trắng - Đỏ",
               vehicle_description: "Xe 22 chỗ chất lượng cao, phù hợp cho đường đèo dốc, trang bị đầy đủ tiện nghi",
               map_vehicle_layout_id: layoutRows[5].map_vehicle_layout_id,
               office_id: officeRows[5].office_id,
               vehicle_type_id: typeRows[5].vehicle_type_id,
               is_active: 1,
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("vehicles", null, {});
   },
};
