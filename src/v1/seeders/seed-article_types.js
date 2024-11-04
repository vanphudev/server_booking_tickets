"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
         "article_types",
         [
            {
                article_title: "Tin tức 1",
                article_field: "Khám phá những điều thú vị trong ngành dịch vụ.",
                is_highlight: 1, 
            },
            {
                article_title: "Tin tức 2",
                article_field: "Cập nhật xu hướng mới nhất trong năm.",
                is_highlight: 0, 
            },
            {
                article_title: "Tin tức 3",
                article_field: "Phân tích chi tiết về thị trường hiện tại.",
                is_highlight: 1,
            },
            {
                article_title: "Tin tức 4",
                article_field: "Lời khuyên từ các chuyên gia hàng đầu.",
                is_highlight: 1,
            },
            {
                article_title: "Tin tức 5",
                article_field: "Sự kiện sắp tới mà bạn không nên bỏ lỡ.",
                is_highlight: 0,
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("article_types", null, {});
   },
};
