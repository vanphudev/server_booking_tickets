"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy province_id từ bảng provinces
      const provinces = await queryInterface.sequelize.query(`SELECT province_id FROM provinces LIMIT 10;`);
      const provinceRows = provinces[0];
      return queryInterface.bulkInsert(
         "districts",
         [
            {
               district_name: "Quận Ba Đình",
               district_description:
                  "Một trong những quận trung tâm của thủ đô Hà Nội, nơi tập trung nhiều di tích lịch sử và cơ quan hành chính quan trọng",
               district_grade: "Quận",
               province_id: provinceRows[0].province_id,
            },
            {
               district_name: "Quận 1",
               district_description:
                  "Trung tâm kinh tế, văn hóa và du lịch của TP Hồ Chí Minh, nơi có nhiều công trình kiến trúc nổi tiếng",
               district_grade: "Quận",
               province_id: provinceRows[1].province_id,
            },
            {
               district_name: "Quận Hải Châu",
               district_description:
                  "Quận trung tâm của thành phố Đà Nẵng, tập trung nhiều trung tâm thương mại và địa điểm du lịch",
               district_grade: "Quận",
               province_id: provinceRows[2].province_id,
            },
            {
               district_name: "Quận Ninh Kiều",
               district_description:
                  "Trung tâm hành chính, kinh tế và văn hóa của thành phố Cần Thơ, nổi tiếng với bến Ninh Kiều và chợ nổi",
               district_grade: "Quận",
               province_id: provinceRows[3].province_id,
            },
            {
               district_name: "Quận Ngô Quyền",
               district_description:
                  "Quận trung tâm của thành phố Hải Phòng, là khu vực phát triển thương mại và dịch vụ quan trọng",
               district_grade: "Quận",
               province_id: provinceRows[4].province_id,
            },
            {
               district_name: "Quận Hoàn Kiếm",
               district_description: "Trung tâm lịch sử và văn hóa của Hà Nội, nơi có Hồ Hoàn Kiếm và phố cổ",
               district_grade: "Quận",
               province_id: provinceRows[0].province_id,
            },
            {
               district_name: "Quận 3",
               district_description:
                  "Một trong những quận trung tâm của TP HCM, nổi tiếng với nhiều công trình kiến trúc Pháp",
               district_grade: "Quận",
               province_id: provinceRows[1].province_id,
            },
            {
               district_name: "Quận Sơn Trà",
               district_description: "Quận ven biển của Đà Nẵng, có bán đảo Sơn Trà và nhiều bãi biển đẹp",
               district_grade: "Quận",
               province_id: provinceRows[2].province_id,
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("districts", null, {});
   },
};
