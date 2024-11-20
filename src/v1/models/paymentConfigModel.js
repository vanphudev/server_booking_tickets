"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class PaymentConfig extends Model {
      static associate(models) {
         PaymentConfig.belongsTo(models.PaymentMethod, {
            foreignKey: "payment_method_id",
            as: "paymentConfig_onetoOne_paymentMethod",
         });
      }
   }

   PaymentConfig.init(
      {
         payment_config_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         api_key: {
            type: DataTypes.TEXT,
            allowNull: false,
         },
         secret_key: {
            type: DataTypes.TEXT,
            allowNull: false,
         },
         public_key: {
            type: DataTypes.TEXT,
            allowNull: false,
         },
         payment_endpoint_url: {
            type: DataTypes.TEXT,
            allowNull: false,
         },
         transaction_timeout: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         environment: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
               isIn: [["development", "production"]],
            },
         },
         payment_method_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: true,
            references: {
               model: "PaymentMethod",
               key: "payment_method_id",
            },
         },
      },
      {
         sequelize,
         modelName: "PaymentConfig",
         tableName: "payment_configs",
         underscored: true,
         timestamps: true,
         paranoid: true,
         freezeTableName: true,
         indexes: [
            {
               unique: true,
               fields: ["payment_config_id"],
            },
         ],
         createdAt: "created_at",
         updatedAt: "updated_at",
         deletedAt: "deleted_at",
         charset: "utf8mb4",
         collate: "utf8mb4_unicode_ci",
      }
   );

   return PaymentConfig;
};
