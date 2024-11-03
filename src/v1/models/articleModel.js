"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class Article extends Model {
      static associate(models) {
         Article.belongsTo(models.Employee, {
            foreignKey: "employee_id",
            as: "article_belongto_employee",
         });
         Article.belongsTo(models.ArticleType, {
            foreignKey: "article_type_id",
            as: "article_belongto_articleType",
         });
         Article.hasMany(models.ImageArticle, {
            foreignKey: "article_id",
            as: "article_to_imageArticle",
         });
         Article.hasMany(models.ArticleTag, {
            foreignKey: "article_id",
            as: "article_to_articleTag",
         });
         Article.belongsToMany(models.Tag, {
            through: models.ArticleTag,
            foreignKey: "article_id",
            otherKey: "tag_id",
            as: "article_to_tag",
         });
      }
   }

   Article.init(
      {
         article_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         article_title: {
            type: DataTypes.STRING(500),
            allowNull: false,
            unique: true,
         },
         article_description: {
            type: DataTypes.TEXT,
         },
         article_content: {
            type: DataTypes.TEXT,
            allowNull: false,
         },
         article_slug: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
         },
         published_at: {
            type: DataTypes.DATE(6),
            defaultValue: DataTypes.NOW,
            allowNull: true,
         },
         is_priority: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
            validate: {
               isIn: [[0, 1]],
            },
         },
         article_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: "ArticleType",
               key: "article_type_id",
            },
         },
         employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: "Employee",
               key: "employee_id",
            },
         },
         thumbnail_img: {
            type: DataTypes.TEXT,
         },
         thumbnail_img_public_id: {
            type: DataTypes.TEXT,
         },
      },
      {
         sequelize,
         modelName: "Article",
         tableName: "articles",
         underscored: true,
         timestamps: true,
         paranoid: true,
         freezeTableName: true,
         indexes: [
            {
               unique: true,
               fields: ["article_slug", "article_title"],
            },
         ],
         createdAt: "created_at",
         updatedAt: "updated_at",
         deletedAt: "deleted_at",
         charset: "utf8mb4",
         collate: "utf8mb4_unicode_ci",
      }
   );

   return Article;
};
