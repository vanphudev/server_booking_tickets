"use strict";
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable(
         "customer_types",
         {
            customer_type_id: {
               type: Sequelize.INTEGER,
               autoIncrement: true,
               primaryKey: true,
            },
            customer_type_name: {
               type: Sequelize.STRING(255),
               unique: true,
            },
            customer_type_description: {
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
      await queryInterface.dropTable("customer_types");
   },
};
