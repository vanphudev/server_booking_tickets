"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable(
         "payment_methods",
         {
            payment_method_id: {
               type: Sequelize.INTEGER,
               autoIncrement: true,
               primaryKey: true,
            },
            payment_method_code: {
               type: Sequelize.STRING(255),
               allowNull: false,
               unique: true,
            },
            payment_method_name: {
               type: Sequelize.STRING(255),
               allowNull: false,
               unique: true,
            },
            is_locked: {
               type: Sequelize.TINYINT(1),
               defaultValue: 0,
               validate: {
                  isIn: [[0, 1]],
               },
            },
            payment_method_avatar_url: {
               type: Sequelize.TEXT,
            },
            payment_method_avatar_public_id: {
               type: Sequelize.TEXT,
            },
            last_lock_at: {
               type: Sequelize.DATE,
               allowNull: true,
            },
            payment_method_description: {
               type: Sequelize.TEXT,
               allowNull: true,
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
            payment_type_id: {
               type: Sequelize.INTEGER,
               allowNull: true,
               references: {
                  model: {
                     tableName: "payment_types",
                  },
                  key: "payment_type_id",
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
      await queryInterface.dropTable("payment_methods");
   },
};
