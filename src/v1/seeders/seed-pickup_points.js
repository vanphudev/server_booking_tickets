"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy way_id từ bảng ways
      const ways = await queryInterface.sequelize.query(`SELECT way_id FROM ways;`);
      const wayRows = ways[0];

      // Lấy office_id từ bảng offices
      const offices = await queryInterface.sequelize.query(`SELECT office_id FROM offices;`);
      const officeRows = offices[0];

      return queryInterface.bulkInsert(
         "pickup_points",
         [
            {
               pickup_point_way_id: wayRows[0].way_id,
               pickup_point_office_id: officeRows[0].office_id,
               pickup_point_name: "Bến xe Miền Đông",
               pickup_point_time: 0, // Điểm xuất phát
               pickup_point_kind: 1, // Điểm cố định
               pickup_point_description: "Cổng số 1, Bến xe Miền Đông mới",
               point_kind_name: "Điểm đón cố định",
            },
            {
               pickup_point_way_id: wayRows[0].way_id,
               pickup_point_office_id: officeRows[1].office_id,
               pickup_point_name: "Ngã tư Thủ Đức",
               pickup_point_time: 15, // 15 phút sau xuất phát
               pickup_point_kind: 1,
               pickup_point_description: "Trạm xăng đối diện Đại học Sư phạm Kỹ thuật",
               point_kind_name: "Điểm đón cố định",
            },
            {
               pickup_point_way_id: wayRows[1].way_id,
               pickup_point_office_id: officeRows[2].office_id,
               pickup_point_name: "Chợ Dầu Giây",
               pickup_point_time: 45,
               pickup_point_kind: 0, // Điểm dọc đường
               pickup_point_description: "Trạm dừng chân Dầu Giây",
               point_kind_name: "Điểm đón dọc đường",
            },
            {
               pickup_point_way_id: wayRows[1].way_id,
               pickup_point_office_id: officeRows[3].office_id,
               pickup_point_name: "Ngã ba Đại Ninh",
               pickup_point_time: 180,
               pickup_point_kind: 0,
               pickup_point_description: "Quán cà phê đối diện trạm xăng",
               point_kind_name: "Điểm đón dọc đường",
            },
            {
               pickup_point_way_id: wayRows[2].way_id,
               pickup_point_office_id: officeRows[4].office_id,
               pickup_point_name: "Văn phòng Đà Lạt",
               pickup_point_time: 300,
               pickup_point_kind: 1,
               pickup_point_description: "Số 1 Nguyễn Chí Thanh, Đà Lạt",
               point_kind_name: "Điểm đón cố định",
            },
            {
               pickup_point_way_id: wayRows[2].way_id,
               pickup_point_office_id: officeRows[0].office_id,
               pickup_point_name: "Chợ Đà Lạt",
               pickup_point_time: 310,
               pickup_point_kind: 1,
               pickup_point_description: "Cổng chợ Đà Lạt, đường Nguyễn Thị Minh Khai",
               point_kind_name: "Điểm đón cố định",
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("pickup_points", null, {});
   },
};
