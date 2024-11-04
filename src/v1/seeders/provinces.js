"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
         "provinces",
         [
            {
               province_name: "Hà Nội",
               province_grade: "Thành phố trực thuộc trung ương",
               province_description: "Thủ đô của Việt Nam",
            },
            {
               province_name: "TP Hồ Chí Minh",
               province_grade: "Thành phố trực thuộc trung ương",
               province_description: "Thành phố lớn nhất Việt Nam về dân số và kinh tế",
            },
            {
               province_name: "Đà Nẵng",
               province_grade: "Thành phố trực thuộc trung ương",
               province_description: "Trung tâm kinh tế và du lịch miền Trung",
            },
            {
               province_name: "Cần Thơ",
               province_grade: "Thành phố trực thuộc trung ương",
               province_description: "Trung tâm kinh tế và văn hóa của miền Tây Nam Bộ",
            },
            {
               province_name: "Hải Phòng",
               province_grade: "Thành phố trực thuộc trung ương",
               province_description: "Thành phố cảng lớn nhất miền Bắc Việt Nam",
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("provinces", null, {});
   },
};
