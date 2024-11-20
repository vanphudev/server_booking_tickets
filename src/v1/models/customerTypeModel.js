"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class CustomerType extends Model {
      static associate(models) {
         CustomerType.hasMany(models.Customer, {
            foreignKey: "customer_type_id",
            as: "customerType_to_customer",
         });
      }
   }
   CustomerType.init(
      {
         customer_type_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         customer_type_name: {
            type: DataTypes.STRING(255),
            unique: true,
         },
         customer_type_description: DataTypes.STRING(500),
      },
      {
         sequelize,
         modelName: "CustomerType",
         tableName: "customer_types",
         underscored: true,
         timestamps: true,
         paranoid: true,
         freezeTableName: true,
         indexes: [
            {
               unique: true,
               fields: ["customer_type_name", "customer_type_id"],
            },
         ],
         createdAt: "created_at",
         updatedAt: "updated_at",
         deletedAt: "deleted_at",
         charset: "utf8mb4",
         collate: "utf8mb4_unicode_ci",
      }
   );
   return CustomerType;
};
