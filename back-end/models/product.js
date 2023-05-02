const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Category = require("./category");

const Product = (sequelize) => {
  const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    image_id: {
      type: DataTypes.STRING,
    },
    item_sold: {
      type: DataTypes.INTEGER,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
    },
  });
  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      foreignKey: {
        name: "category_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };

  return Product;
};
module.exports = Product;
