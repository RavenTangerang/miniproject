const db = require("../models");
const Product = db.Product;
const Category = db.Category;

const productControllers = {
  findAllProduct: async (req, res) => {
    try {
      const Products = await Product.findAll({
        raw: true,
        include: {
          model: Category,
          attributes: ["category_name"],
          as: "Category",
        },
      });
      return res.status(200).json({
        result: Products,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statuscode || 500).json({
        message: err.message,
      });
    }
  },
  findProductsByCategory: async (req, res) => {
    try {
      const category_id = req.params.category_id;
      const Products = await Product.findAll({
        raw: true,
        where: {
          category_id: category_id,
        },
        include: {
          model: Category,
          attributes: ["category_name"],
        },
      });
      return res.status(200).json({
        result: Products,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statuscode || 500).json({
        message: err.message,
      });
    }
  },
};

module.exports = productControllers;
