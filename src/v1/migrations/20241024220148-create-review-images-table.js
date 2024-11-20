"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable(
         "review_images",
         {
            review_image_id: {
               type: Sequelize.INTEGER,
               autoIncrement: true,
               primaryKey: true,
            },
            review_id: {
               type: Sequelize.INTEGER,
               references: {
                  model: {
                     tableName: "reviews",
                  },
                  key: "review_id",
               },
            },
            review_image_url: {
               type: Sequelize.TEXT,
               allowNull: false,
            },
            review_image_public_id: {
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
         },
         {
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
         }
      );
   },

   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("review_images");
   },
};
