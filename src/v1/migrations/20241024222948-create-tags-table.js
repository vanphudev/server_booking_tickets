"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable(
         "tags",
         {
            tag_id: {
               type: Sequelize.INTEGER,
               autoIncrement: true,
               primaryKey: true,
            },
            tag_name: {
               type: Sequelize.STRING(255),
               allowNull: false,
            },
            tag_description: {
               type: Sequelize.STRING(500),
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
      await queryInterface.dropTable("tags");
   },
};
