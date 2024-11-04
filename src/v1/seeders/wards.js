"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy district_id từ bảng districts
      const districts = await queryInterface.sequelize.query(`SELECT district_id FROM districts;`);
      const districtRows = districts[0];

      return queryInterface.bulkInsert(
         "wards",
         [
            // Các phường thuộc Quận 1, TP.HCM
            {
               ward_name: "Phường Bến Nghé",
               ward_description: "Phường trung tâm Quận 1, tập trung nhiều công trình văn hóa lịch sử",
               ward_grade: "Phường",
               district_id: districtRows[0].district_id,
            },
            {
               ward_name: "Phường Bến Thành",
               ward_description: "Phường trung tâm Quận 1, khu vực chợ Bến Thành",
               ward_grade: "Phường",
               district_id: districtRows[0].district_id,
            },
            // Các phường thuộc Quận Hoàn Kiếm, Hà Nội
            {
               ward_name: "Phường Hàng Bông",
               ward_description: "Phường thuộc phố cổ Hà Nội, khu phố thương mại sầm uất",
               ward_grade: "Phường",
               district_id: districtRows[1].district_id,
            },
            {
               ward_name: "Phường Hàng Gai",
               ward_description: "Phường thuộc khu phố cổ, tập trung nhiều di tích lịch sử",
               ward_grade: "Phường",
               district_id: districtRows[1].district_id,
            },
            // Các phường thuộc Quận Hải Châu, Đà Nẵng
            {
               ward_name: "Phường Hải Châu 1",
               ward_description: "Phường trung tâm hành chính Quận Hải Châu",
               ward_grade: "Phường",
               district_id: districtRows[2].district_id,
            },
            {
               ward_name: "Phường Thạch Thang",
               ward_description: "Phường ven sông Hàn, khu vực phát triển du lịch",
               ward_grade: "Phường",
               district_id: districtRows[2].district_id,
            },
            // Các xã thuộc Huyện Hóc Môn, TP.HCM
            {
               ward_name: "Xã Xuân Thới Thượng",
               ward_description: "Xã nông nghiệp, vùng ven đô thị hóa",
               ward_grade: "Xã",
               district_id: districtRows[3].district_id,
            },
            {
               ward_name: "Xã Tân Hiệp",
               ward_description: "Xã phát triển công nghiệp và dịch vụ",
               ward_grade: "Xã",
               district_id: districtRows[3].district_id,
            },
            // Các phường thuộc Quận Ninh Kiều, Cần Thơ
            {
               ward_name: "Phường Cái Khế",
               ward_description: "Phường trung tâm hành chính Quận Ninh Kiều",
               ward_grade: "Phường",
               district_id: districtRows[4].district_id,
            },
            {
               ward_name: "Phường An Hòa",
               ward_description: "Phường phát triển thương mại dịch vụ",
               ward_grade: "Phường",
               district_id: districtRows[4].district_id,
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("wards", null, {});
   },
};
