"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy article_id từ bảng articles
      const articles = await queryInterface.sequelize.query(`SELECT article_id FROM articles LIMIT 5;`);
      const articleRows = articles[0];

      return queryInterface.bulkInsert(
         "image_articles",
         [
            {
               image_article_name: "xe-giuong-nam-cao-cap.webp",
               image_article_url:
                  "https://storage.googleapis.com/vex-config/cms-tool/post/img/xe-giuong-nam-cao-cap.webp",
               image_article_type: "webp",
               article_id: articleRows[0].article_id,
            },
            {
               image_article_name: "khuyen-mai-tet-2024.webp",
               image_article_url:
                  "https://storage.googleapis.com/vex-config/cms-tool/post/img/khuyen-mai-tet-2024.webp",
               image_article_type: "webp",
               article_id: articleRows[0].article_id,
            },
            {
               image_article_name: "tuyen-duong-moi.webp",
               image_article_url: "https://storage.googleapis.com/vex-config/cms-tool/post/img/tuyen-duong-moi.webp",
               image_article_type: "webp",
               article_id: articleRows[1].article_id,
            },
            {
               image_article_name: "dich-vu-dua-don.webp",
               image_article_url: "https://storage.googleapis.com/vex-config/cms-tool/post/img/dich-vu-dua-don.webp",
               image_article_type: "webp",
               article_id: articleRows[2].article_id,
            },
            {
               image_article_name: "trai-nghiem-limousine.webp",
               image_article_url:
                  "https://storage.googleapis.com/vex-config/cms-tool/post/img/trai-nghiem-limousine.webp",
               image_article_type: "webp",
               article_id: articleRows[2].article_id,
            },
            {
               image_article_name: "uu-dai-sinh-vien.webp",
               image_article_url: "https://storage.googleapis.com/vex-config/cms-tool/post/img/uu-dai-sinh-vien.webp",
               image_article_type: "webp",
               article_id: articleRows[3].article_id,
            },
            {
               image_article_name: "huong-dan-dat-ve.webp",
               image_article_url: "https://storage.googleapis.com/vex-config/cms-tool/post/img/huong-dan-dat-ve.webp",
               image_article_type: "webp",
               article_id: articleRows[4].article_id,
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("image_articles", null, {});
   },
};
