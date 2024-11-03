"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable(
         "vehicle_images",
         {
            vehicle_image_id: {
               type: Sequelize.INTEGER,
               autoIncrement: true,
               primaryKey: true,
            },
            vehicle_image_url: {
               type: Sequelize.TEXT,
            },
            vehicle_image_description: {
               type: Sequelize.STRING(500),
            },
            vehicle_image_public_id: {
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
            vehicle_id: {
               type: Sequelize.INTEGER,
               references: {
                  model: {
                     tableName: "vehicles",
                  },
                  key: "vehicle_id",
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
      await queryInterface.dropTable("vehicle_images");
   },
};
