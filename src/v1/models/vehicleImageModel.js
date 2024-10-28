"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class VehicleImage extends Model {
      static associate(models) {
         VehicleImage.belongsTo(models.Vehicle, {
            foreignKey: "vehicle_id",
            as: "vehicleImage_belongto_vehicle",
         });
      }
   }

   VehicleImage.init(
      {
         vehicle_image_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         vehicle_image_url: {
            type: DataTypes.TEXT,
         },
         vehicle_image_description: {
            type: DataTypes.STRING(500),
         },
         vehicle_image_type: {
            type: DataTypes.STRING(50),
         },
         vehicle_id: {
            type: DataTypes.INTEGER,
            references: {
               model: "Vehicle",
               key: "vehicle_id",
            },
         },
      },
      {
         sequelize,
         modelName: "VehicleImage",
         tableName: "vehicle_images",
         underscored: true,
         timestamps: true,
         paranoid: true,
         freezeTableName: true,
         indexes: [
            {
               unique: true,
               fields: ["vehicle_image_id"],
            },
         ],
         createdAt: "created_at",
         updatedAt: "updated_at",
         deletedAt: "deleted_at",
         charset: "utf8mb4",
         collate: "utf8mb4_unicode_ci",
      }
   );

   return VehicleImage;
};
