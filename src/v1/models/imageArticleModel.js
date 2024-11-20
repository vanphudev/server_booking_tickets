"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class ImageArticle extends Model {
      static associate(models) {
         ImageArticle.belongsTo(models.Article, {
            foreignKey: "article_id",
            as: "imageArticle_belongto_article",
         });
      }
   }

   ImageArticle.init(
      {
         image_article_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         image_article_name: {
            type: DataTypes.TEXT,
         },
         image_article_url: {
            type: DataTypes.TEXT,
            allowNull: false,
         },
         image_article_public_id: {
            type: DataTypes.TEXT,
            allowNull: false,
         },
         article_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
               model: "Article",
               key: "article_id",
            },
         },
      },
      {
         sequelize,
         modelName: "ImageArticle",
         tableName: "image_articles",
         underscored: true,
         timestamps: true,
         paranoid: true,
         freezeTableName: true,
         indexes: [
            {
               unique: true,
               fields: ["image_article_id", "image_article_url"],
            },
         ],
         createdAt: "created_at",
         updatedAt: "updated_at",
         deletedAt: "deleted_at",
         charset: "utf8mb4",
         collate: "utf8mb4_unicode_ci",
      }
   );

   return ImageArticle;
};
