"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class PaymentMethod extends Model {
      static associate(models) {
         PaymentMethod.belongsTo(models.PaymentType, {
            foreignKey: "payment_type_id",
            as: "paymentMethod_belongto_paymentType",
         });
         PaymentMethod.hasMany(models.BookingTicket, {
            foreignKey: "payment_method_id",
            as: "paymentMethod_to_bookingTicket",
         });
         PaymentMethod.hasOne(models.PaymentConfig, {
            foreignKey: "payment_method_id",
            as: "paymentMethod_onetoOne_paymentConfig",
         });
      }
   }

   PaymentMethod.init(
      {
         payment_method_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         payment_method_code: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
         },
         payment_method_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
         },
         payment_method_avatar_url: DataTypes.TEXT,
         payment_method_avatar_public_id: DataTypes.TEXT,
         is_locked: {
            type: DataTypes.TINYINT(1),
            defaultValue: 0,
            validate: {
               isIn: [[0, 1]],
            },
         },
         last_lock_at: {
            type: DataTypes.DATE(6),
            allowNull: true,
         },
         payment_method_description: {
            type: DataTypes.TEXT,
            allowNull: true,
         },
         payment_type_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
               model: "PaymentType",
               key: "payment_type_id",
            },
         },
      },
      {
         sequelize,
         modelName: "PaymentMethod",
         tableName: "payment_methods",
         underscored: true,
         timestamps: true,
         paranoid: true,
         freezeTableName: true,
         indexes: [
            {
               unique: true,
               fields: ["payment_method_id", "payment_method_code", "payment_method_name"],
            },
         ],
         createdAt: "created_at",
         updatedAt: "updated_at",
         deletedAt: "deleted_at",
         charset: "utf8mb4",
         collate: "utf8mb4_unicode_ci",
      }
   );

   return PaymentMethod;
};
