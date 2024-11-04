"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy review_id từ bảng reviews
      const reviews = await queryInterface.sequelize.query(`SELECT review_id FROM reviews LIMIT 30;`);
      const reviewRows = reviews[0];

      return queryInterface.bulkInsert(
         "review_images",
         [
            {
               review_id: reviewRows[0].review_id,
               review_image_url: "https://storage.googleapis.com/vex-config/reviews/xe-limousine-review1.webp",
               review_image_type: "webp",
            },
            {
               review_id: reviewRows[0].review_id,
               review_image_url: "https://storage.googleapis.com/vex-config/reviews/xe-limousine-review2.webp",
               review_image_type: "webp",
            },
            {
               review_id: reviewRows[1].review_id,
               review_image_url: "https://storage.googleapis.com/vex-config/reviews/xe-giuong-nam-review1.webp",
               review_image_type: "webp",
            },
            {
               review_id: reviewRows[2].review_id,
               review_image_url: "https://storage.googleapis.com/vex-config/reviews/dich-vu-review1.webp",
               review_image_type: "webp",
            },
            {
               review_id: reviewRows[2].review_id,
               review_image_url: "https://storage.googleapis.com/vex-config/reviews/dich-vu-review2.webp",
               review_image_type: "webp",
            },
            {
               review_id: reviewRows[3].review_id,
               review_image_url: "https://storage.googleapis.com/vex-config/reviews/nhan-vien-review1.webp",
               review_image_type: "webp",
            },
            {
               review_id: reviewRows[4].review_id,
               review_image_url: "https://storage.googleapis.com/vex-config/reviews/van-phong-review1.webp",
               review_image_type: "webp",
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("review_images", null, {});
   },
};
