const { productControllers } = require("../controller");

const router = require("express").Router();

router.get("/view", productControllers.findAllProduct);
router.get("/category/:category_id", productControllers.findProductsByCategory);

module.exports = router;
