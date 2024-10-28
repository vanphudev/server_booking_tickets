"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable(
         "payment_configs",
         {
            payment_config_id: {
               type: Sequelize.INTEGER,
               autoIncrement: true,
               primaryKey: true,
            },
            api_key: {
               type: Sequelize.TEXT,
               allowNull: false,
            },
            secret_key: {
               type: Sequelize.TEXT,
               allowNull: false,
            },
            public_key: {
               type: Sequelize.TEXT,
               allowNull: false,
            },
            payment_endpoint_url: {
               type: Sequelize.TEXT,
               allowNull: false,
            },
            transaction_timeout: {
               type: Sequelize.INTEGER,
               allowNull: false,
            },
            environment: {
               type: Sequelize.STRING(255),
               allowNull: false,
               validate: {
                  isIn: [["production", "development"]],
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
            payment_method_id: {
               type: Sequelize.INTEGER,
               allowNull: false,
               unique: true,
               references: {
                  model: {
                     tableName: "payment_methods",
                  },
                  key: "payment_method_id",
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
      await queryInterface.dropTable("payment_configs");
   },
};
