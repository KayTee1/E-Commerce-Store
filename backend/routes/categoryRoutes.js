const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  getCategories,
  getCategoryById,
  postNewCategory,
  updateCategory,
  deleteCategoryById,
} = require("../controllers/categoryController.js");

router.get("/", getCategories);
router.get("/:id", getCategoryById);

router.use(verifyToken);

router.post("/", postNewCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategoryById);

module.exports = router;
