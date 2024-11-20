"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class Review extends Model {
      static associate(models) {
         Review.belongsTo(models.Route, {
            foreignKey: "route_id",
            as: "review_belongto_route",
         });
         Review.belongsTo(models.Customer, {
            foreignKey: "customer_id",
            as: "review_belongto_customer",
         });
         Review.hasMany(models.ReviewImage, {
            foreignKey: "review_id",
            as: "review_to_reviewImage",
         });
      }
   }

   Review.init(
      {
         review_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         review_rating: {
            type: DataTypes.INTEGER,
            defaultValue: 5,
            allowNull: false,
            validate: {
               min: 1,
               max: 5,
            },
         },
         review_date: {
            type: DataTypes.DATE(6),
            defaultValue: DataTypes.NOW,
         },
         review_comment: {
            type: DataTypes.TEXT,
         },
         is_locked: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
            validate: {
               isIn: [[0, 1]],
            },
         },
         last_lock_at: {
            type: DataTypes.DATE(6),
            allowNull: true,
         },
         route_id: {
            type: DataTypes.INTEGER,
            references: {
               model: "Route",
               key: "route_id",
            },
         },
         customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: "Customer",
               key: "customer_id",
            },
         },
      },
      {
         sequelize,
         modelName: "Review",
         tableName: "reviews",
         underscored: true,
         timestamps: true,
         paranoid: true,
         freezeTableName: true,
         indexes: [
            {
               unique: true,
               fields: ["review_id"],
            },
         ],
         createdAt: "created_at",
         updatedAt: "updated_at",
         deletedAt: "deleted_at",
         charset: "utf8mb4",
         collate: "utf8mb4_unicode_ci",
      }
   );

   return Review;
};
