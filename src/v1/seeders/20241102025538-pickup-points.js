"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      const offices = await queryInterface.sequelize.query(`SELECT office_id from offices;`);
      const officeRows = offices[0];
      const ways = await queryInterface.sequelize.query(`SELECT way_id from ways;`);
      const wayRows = ways[0];
      return queryInterface.bulkInsert(
         "pickup_points",
         [
            // Tuyến 1: Office 1 - Office 2
            {
               pickup_point_way_id: wayRows[0].way_id,
               pickup_point_office_id: officeRows[0].office_id,
               pickup_point_name: "Điểm xuất phát Main Office 1",
               pickup_point_time: 25200000,
               pickup_point_kind: 0,
               pickup_point_description: "Điểm xuất phát đầu tuyến tại Main Office 1",
               point_kind_name: "Điểm xuất phát",
            },
            {
               pickup_point_way_id: wayRows[0].way_id,
               pickup_point_office_id: officeRows[1].office_id,
               pickup_point_name: "Điểm trả Main Office 2",
               pickup_point_time: 28800000,
               pickup_point_kind: 1,
               pickup_point_description: "Điểm trả cuối tuyến tại Main Office 2",
               point_kind_name: "Điểm trả",
            },

            // Tuyến 2: Office 2 - Office 3
            {
               pickup_point_way_id: wayRows[1].way_id,
               pickup_point_office_id: officeRows[1].office_id,
               pickup_point_name: "Điểm đón Main Office 2",
               pickup_point_time: 30600000,
               pickup_point_kind: 0,
               pickup_point_description: "Điểm đón đầu tuyến tại Main Office 2",
               point_kind_name: "Điểm đón",
            },
            {
               pickup_point_way_id: wayRows[1].way_id,
               pickup_point_office_id: officeRows[2].office_id,
               pickup_point_name: "Điểm trả Main Office 3",
               pickup_point_time: 34200000,
               pickup_point_kind: 1,
               pickup_point_description: "Điểm trả cuối tuyến tại Main Office 3",
               point_kind_name: "Điểm trả",
            },

            // Tuyến 3: Office 3 - Office 4
            {
               pickup_point_way_id: wayRows[2].way_id,
               pickup_point_office_id: officeRows[2].office_id,
               pickup_point_name: "Điểm đón Main Office 3",
               pickup_point_time: 36000000,
               pickup_point_kind: 0,
               pickup_point_description: "Điểm đón đầu tuyến tại Main Office 3",
               point_kind_name: "Điểm đón",
            },
            {
               pickup_point_way_id: wayRows[2].way_id,
               pickup_point_office_id: officeRows[3].office_id,
               pickup_point_name: "Điểm trả Main Office 4",
               pickup_point_time: 39600000,
               pickup_point_kind: 1,
               pickup_point_description: "Điểm trả cuối tuyến tại Main Office 4",
               point_kind_name: "Điểm trả",
            },

            // Tuyến 4: Office 4 - Office 5
            {
               pickup_point_way_id: wayRows[3].way_id,
               pickup_point_office_id: officeRows[3].office_id,
               pickup_point_name: "Điểm đón Main Office 4",
               pickup_point_time: 46800000,
               pickup_point_kind: 0,
               pickup_point_description: "Điểm đón đầu tuyến tại Main Office 4",
               point_kind_name: "Điểm đón",
            },
            {
               pickup_point_way_id: wayRows[3].way_id,
               pickup_point_office_id: officeRows[4].office_id,
               pickup_point_name: "Điểm trả Main Office 5",
               pickup_point_time: 50400000,
               pickup_point_kind: 1,
               pickup_point_description: "Điểm trả cuối tuyến tại Main Office 5",
               point_kind_name: "Điểm trả",
            },

            // Tuyến 5: Office 5 - Office 6
            {
               pickup_point_way_id: wayRows[4].way_id,
               pickup_point_office_id: officeRows[4].office_id,
               pickup_point_name: "Điểm đón Main Office 5",
               pickup_point_time: 54000000,
               pickup_point_kind: 0,
               pickup_point_description: "Điểm đón đầu tuyến tại Main Office 5",
               point_kind_name: "Điểm đón",
            },
            {
               pickup_point_way_id: wayRows[4].way_id,
               pickup_point_office_id: officeRows[5].office_id,
               pickup_point_name: "Điểm đến Main Office 6",
               pickup_point_time: 57600000,
               pickup_point_kind: -1,
               pickup_point_description: "Điểm đến cuối tuyến tại Main Office 6",
               point_kind_name: "Điểm đến",
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("pickup_points", null, {});
   },
};
