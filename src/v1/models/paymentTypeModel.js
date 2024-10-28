"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class PaymentType extends Model {
      static associate(models) {
         PaymentType.hasMany(models.PaymentMethod, {
            foreignKey: "payment_type_id",
            as: "paymentType_to_payment",
         });
      }
   }

   PaymentType.init(
      {
         payment_type_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         payment_type_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
         },
      },
      {
         sequelize,
         modelName: "PaymentType",
         tableName: "payment_types",
         underscored: true,
         timestamps: true,
         paranoid: true,
         freezeTableName: true,
         indexes: [
            {
               unique: true,
               fields: ["payment_type_name", "payment_type_id"],
            },
         ],
         createdAt: "created_at",
         updatedAt: "updated_at",
         deletedAt: "deleted_at",
         charset: "utf8mb4",
         collate: "utf8mb4_unicode_ci",
      }
   );

   return PaymentType;
};
