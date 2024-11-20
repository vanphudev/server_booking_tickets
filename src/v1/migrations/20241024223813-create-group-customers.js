"use strict";

module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable(
         "group_customers",
         {
            group_id: {
               type: Sequelize.INTEGER,
               allowNull: false,
               references: {
                  model: {
                     tableName: "groups",
                  },
                  key: "group_id",
               },
               primaryKey: true,
            },
            customer_id: {
               type: Sequelize.INTEGER,
               allowNull: false,
               references: {
                  model: {
                     tableName: "customers",
                  },
                  key: "customer_id",
               },
               primaryKey: true,
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
      await queryInterface.dropTable("group_customers");
   },
};