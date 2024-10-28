"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class ReviewImage extends Model {
      static associate(models) {
         ReviewImage.belongsTo(models.Review, {
            foreignKey: "review_id",
            as: "reviewImage_belongto_review",
         });
      }
   }

   ReviewImage.init(
      {
         review_image_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         review_id: {
            type: DataTypes.INTEGER,
            references: {
               model: "Review",
               key: "review_id",
            },
         },
         review_image_url: {
            type: DataTypes.TEXT,
            allowNull: false,
         },
         review_image_type: {
            type: DataTypes.STRING(50),
            allowNull: true,
         },
      },
      {
         sequelize,
         modelName: "ReviewImage",
         tableName: "review_images",
         underscored: true,
         timestamps: true,
         paranoid: true,
         freezeTableName: true,
         indexes: [
            {
               unique: true,
               fields: ["review_image_id"],
            },
         ],
         createdAt: "created_at",
         updatedAt: "updated_at",
         deletedAt: "deleted_at",
         charset: "utf8mb4",
         collate: "utf8mb4_unicode_ci",
      }
   );

   return ReviewImage;
};
