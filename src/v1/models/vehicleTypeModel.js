"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class VehicleType extends Model {
      static associate(models) {
         VehicleType.hasMany(models.Vehicle, {
            foreignKey: "vehicle_type_id",
            as: "vehicleType_to_vehicle",
         });
      }
   }

   VehicleType.init(
      {
         vehicle_type_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         vehicle_type_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
         },
         vehicle_type_description: DataTypes.STRING(500),
      },
      {
         sequelize,
         modelName: "VehicleType",
         tableName: "vehicle_types",
         underscored: true,
         timestamps: true,
         paranoid: true,
         freezeTableName: true,
         indexes: [
            {
               unique: true,
               fields: ["vehicle_type_id", "vehicle_type_name"],
            },
         ],
         createdAt: "created_at",
         updatedAt: "updated_at",
         deletedAt: "deleted_at",
         charset: "utf8mb4",
         collate: "utf8mb4_unicode_ci",
      }
   );

   return VehicleType;
};
