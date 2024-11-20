"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable(
         "image_articles",
         {
            image_article_id: {
               type: Sequelize.INTEGER,
               autoIncrement: true,
               primaryKey: true,
            },
            image_article_name: {
               type: Sequelize.TEXT,
            },
            image_article_url: {
               type: Sequelize.TEXT,
               allowNull: false,
            },
            image_article_public_id: {
               type: Sequelize.TEXT,
               allowNull: false,
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
            article_id: {
               type: Sequelize.INTEGER,
               allowNull: true,
               references: {
                  model: {
                     tableName: "articles",
                  },
                  key: "article_id",
               },
            },
         },
         {
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
         }
      );
   },

   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("image_articles");
   },
};
