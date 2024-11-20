"use strict";

module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable(
         "article_tags",
         {
            article_id: {
               type: Sequelize.INTEGER,
               allowNull: false,
               primaryKey: true,
               references: {
                  model: {
                     tableName: "articles",
                  },
                  key: "article_id",
               },
            },
            tag_id: {
               type: Sequelize.INTEGER,
               allowNull: false,
               primaryKey: true,
               references: {
                  model: {
                     tableName: "tags",
                  },
                  key: "tag_id",
               },
            },
            created_at: {
               type: Sequelize.DATE,
               defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updated_at: {
               type: Sequelize.DATE,
               defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
               onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            deleted_at: {
               type: Sequelize.DATE,
               defaultValue: null,
            },
         },
         {
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
         }
      );
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("article_tags");
   },
};
