const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  getCategories,
  getCategoryById,
  postNewCategory,
} = require("../controllers/categoryController.js");

router.get("/", getCategories);
router.get("/:id", getCategoryById);

router.use(verifyToken);

router.post("/", postNewCategory);

module.exports = router;
