"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class Tag extends Model {
      static associate(models) {
         Tag.belongsToMany(models.Article, {
            through: models.ArticleTag,
            foreignKey: "tag_id",
            otherKey: "article_id",
            as: "tag_to_article",
         });
         Tag.hasMany(models.ArticleTag, {
            foreignKey: "tag_id",
            as: "tag_to_articleTag",
         });
      }
   }

   Tag.init(
      {
         tag_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         tag_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
         },
         tag_description: {
            type: DataTypes.STRING(500),
         },
      },
      {
         sequelize,
         modelName: "Tag",
         tableName: "tags",
         underscored: true,
         timestamps: true,
         paranoid: true,
         freezeTableName: true,
         indexes: [
            {
               unique: true,
               fields: ["tag_id", "tag_name"],
            },
         ],
         createdAt: "created_at",
         updatedAt: "updated_at",
         deletedAt: "deleted_at",
         charset: "utf8mb4",
         collate: "utf8mb4_unicode_ci",
      }
   );

   return Tag;
};
