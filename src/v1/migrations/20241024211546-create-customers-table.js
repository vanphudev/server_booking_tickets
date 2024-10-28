"use strict";
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable(
         "customers",
         {
            customer_id: {
               type: Sequelize.INTEGER,
               autoIncrement: true,
               primaryKey: true,
            },
            customer_full_name: {
               type: Sequelize.STRING(255),
            },
            customer_phone: {
               type: Sequelize.STRING(20),
               unique: true,
            },
            customer_email: {
               type: Sequelize.STRING(500),
               unique: true,
            },
            customer_gender: {
               type: Sequelize.TINYINT,
               validate: {isIn: [[0, 1, -1]]},
            },
            customer_birthday: {
               type: Sequelize.DATEONLY,
               validate: {isAfter: "1900-01-01", isBefore: "2100-12-31"},
            },
            customer_avatar_url: {
               type: Sequelize.TEXT,
            },
            customer_destination_address: {
               type: Sequelize.JSON,
               defaultValue: '{"province": "value_province", "district": "value_district", "wards": "value_wards"}',
            },
            customer_password: {
               type: Sequelize.STRING(500),
            },
            is_disabled: {
               type: Sequelize.TINYINT,
               defaultValue: 0,
               validate: {isIn: [[0, 1]]},
            },
            last_login_at: {
               type: Sequelize.DATE,
               defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            access_token: {
               type: Sequelize.TEXT,
            },
            refresh_token: {
               type: Sequelize.TEXT,
            },
            last_refresh_token: {
               type: Sequelize.DATE,
               defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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
            customer_type_id: {
               type: Sequelize.INTEGER,
               references: {
                  model: {
                     tableName: "customer_types",
                  },
                  key: "customer_type_id",
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
      await queryInterface.dropTable("customers");
   },
};
