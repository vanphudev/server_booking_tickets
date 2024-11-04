"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy article_id từ bảng articles
      const articles = await queryInterface.sequelize.query(`SELECT article_id FROM articles LIMIT 10;`);
      const articleRows = articles[0];

      // Lấy tag_id từ bảng tags
      const tags = await queryInterface.sequelize.query(`SELECT tag_id FROM tags LIMIT 10;`);
      const tagRows = tags[0];

      return queryInterface.bulkInsert(
         "article_tags",
         [
            // Bài viết 1 có nhiều tag
            {
               article_id: articleRows[0].article_id,
               tag_id: tagRows[0].tag_id,
            },
            {
               article_id: articleRows[0].article_id,
               tag_id: tagRows[1].tag_id,
            },
            {
               article_id: articleRows[0].article_id,
               tag_id: tagRows[2].tag_id,
            },
            // Bài viết 2 có nhiều tag
            {
               article_id: articleRows[1].article_id,
               tag_id: tagRows[1].tag_id,
            },
            {
               article_id: articleRows[1].article_id,
               tag_id: tagRows[3].tag_id,
            },
            // Bài viết 3 có nhiều tag
            {
               article_id: articleRows[2].article_id,
               tag_id: tagRows[2].tag_id,
            },
            {
               article_id: articleRows[2].article_id,
               tag_id: tagRows[4].tag_id,
            },
            // Bài viết 4 có nhiều tag
            {
               article_id: articleRows[3].article_id,
               tag_id: tagRows[0].tag_id,
            },
            {
               article_id: articleRows[3].article_id,
               tag_id: tagRows[3].tag_id,
            },
            // Bài viết 5 có nhiều tag
            {
               article_id: articleRows[4].article_id,
               tag_id: tagRows[1].tag_id,
            },
            {
               article_id: articleRows[4].article_id,
               tag_id: tagRows[4].tag_id,
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("article_tags", null, {});
   },
};
