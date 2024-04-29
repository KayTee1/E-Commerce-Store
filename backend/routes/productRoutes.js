const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  getProducts,
  getProductById,
  getProductsByCategoryId,
  postNewProduct,
  updateProduct,
  deleteProductById,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/product/:id", getProductById);
router.get("/category/:id", getProductsByCategoryId);

router.use(verifyToken);

router.post("/", postNewProduct);
router.put("/:id", updateProduct);

router.delete("/:id", deleteProductById);

module.exports = router;
