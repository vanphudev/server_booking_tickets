"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class VoucherCondition extends Model {
      static associate(models) {
         VoucherCondition.belongsTo(models.Voucher, {
            foreignKey: "voucher_id",
            as: "voucherCondition_belongto_voucher",
         });
      }
   }

   VoucherCondition.init(
      {
         condition_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         voucher_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: "Voucher",
               key: "voucher_id",
            },
         },
         condition_key: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
         },
         condition_value: {
            type: DataTypes.STRING(255),
            allowNull: false,
         },
      },
      {
         sequelize,
         modelName: "VoucherCondition",
         tableName: "voucher_conditions",
         underscored: true,
         timestamps: true,
         paranoid: true,
         freezeTableName: true,
         indexes: [
            {
               unique: true,
               fields: ["condition_id", "condition_key"],
            },
         ],
         createdAt: "created_at",
         updatedAt: "updated_at",
         deletedAt: "deleted_at",
         charset: "utf8mb4",
         collate: "utf8mb4_unicode_ci",
      }
   );

   return VoucherCondition;
};
