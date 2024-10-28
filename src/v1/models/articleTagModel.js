"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class ArticleTag extends Model {
      static associate(models) {
         ArticleTag.belongsTo(models.Article, {
            foreignKey: "article_id",
            as: "articleTag_belongto_article",
         });
         ArticleTag.belongsTo(models.Tag, {
            foreignKey: "tag_id",
            as: "articleTag_belongto_tag",
         });
      }
   }

   ArticleTag.init(
      {
         article_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
               model: "Article",
               key: "article_id",
            },
         },
         tag_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
               model: "Tag",
               key: "tag_id",
            },
         },
      },
      {
         sequelize,
         modelName: "ArticleTag",
         tableName: "article_tags",
         underscored: true,
         timestamps: true,
         paranoid: true,
         freezeTableName: true,
         createdAt: "created_at",
         updatedAt: "updated_at",
         deletedAt: "deleted_at",
         charset: "utf8mb4",
         collate: "utf8mb4_unicode_ci",
      }
   );

   return ArticleTag;
};
