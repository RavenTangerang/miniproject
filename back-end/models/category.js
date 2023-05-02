const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

const Category = (sequelize) => {
  const Category = sequelize.define("Category", {
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Category.associate = (models) => {
    Category.hasMany(models.Product, {
      foreignKey: "category_id",
    });
  };

  return Category;
};

module.exports = Category;
