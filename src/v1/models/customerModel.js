"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Customer extends Model {
      static associate(models) {
         Customer.belongsTo(models.CustomerType, {
            foreignKey: "customer_type_id",
            as: "customer_belongto_customerType",
         });
         Customer.hasMany(models.BookingTicket, {
            foreignKey: "customer_id",
            as: "customer_to_bookingTicket",
         });
         Customer.belongsToMany(models.Group, {
            through: models.GroupCustomer,
            foreignKey: "customer_id",
            otherKey: "group_id",
            as: "customer_to_group",
         });
         Customer.hasMany(models.GroupCustomer, {
            foreignKey: "customer_id",
            as: "customer_to_groupCustomer",
         });
         Customer.hasMany(models.Review, {
            foreignKey: "customer_id",
            as: "customer_to_review",
         });
         Customer.hasOne(models.KeyStoreCustomer, {
            foreignKey: "customer_id",
            as: "customer_to_keyStoreCustomer",
         });
      }
   }
   Customer.init(
      {
         customer_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         customer_full_name: DataTypes.STRING(255),
         customer_phone: {
            type: DataTypes.STRING(20),
            unique: true,
         },
         customer_email: {
            type: DataTypes.STRING(500),
            unique: true,
         },
         customer_gender: {
            type: DataTypes.TINYINT,
            validate: {isIn: [[0, 1, -1]]},
         },
         customer_birthday: {
            type: DataTypes.DATEONLY,
            validate: {isAfter: "1900-01-01", isBefore: "2100-12-31"},
         },
         customer_avatar_url: DataTypes.TEXT,
         customer_destination_address: {
            type: DataTypes.JSON,
            defaultValue: '{"province": "value_province", "district": "value_district", "wards": "value_wards"}',
         },
         customer_password: DataTypes.STRING(500),
         is_disabled: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
            validate: {isIn: [[0, 1]]},
         },
         last_login_at: {
            type: DataTypes.DATE(6),
            allowNull: true,
         },
         access_token: DataTypes.TEXT,
         refresh_token: DataTypes.TEXT,
         last_refresh_token: {
            type: DataTypes.DATE(6),
            allowNull: true,
         },
         customer_type_id: {
            type: DataTypes.INTEGER,
            references: {
               model: "CustomerType",
               key: "customer_type_id",
            },
         },
      },
      {
         sequelize,
         modelName: "Customer",
         tableName: "customers",
         underscored: true,
         timestamps: true,
         paranoid: true,
         freezeTableName: true,
         indexes: [
            {
               unique: true,
               fields: ["customer_email", "customer_phone"],
            },
         ],
         createdAt: "created_at",
         updatedAt: "updated_at",
         deletedAt: "deleted_at",
         charset: "utf8mb4",
         collate: "utf8mb4_unicode_ci",
      }
   );
   return Customer;
};
