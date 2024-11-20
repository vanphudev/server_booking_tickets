"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable(
         "voucher_conditions",
         {
            condition_id: {
               type: Sequelize.INTEGER,
               autoIncrement: true,
               primaryKey: true,
            },
            voucher_id: {
               type: Sequelize.INTEGER,
               allowNull: false,
               references: {
                  model: {
                     tableName: "vouchers",
                  },
                  key: "voucher_id",
               },
            },
            condition_key: {
               type: Sequelize.STRING(255),
               allowNull: false,
               unique: true,
            },
            condition_value: {
               type: Sequelize.STRING(255),
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
      await queryInterface.dropTable("voucher_conditions");
   },
};
