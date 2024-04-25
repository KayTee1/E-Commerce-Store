const express = require("express");
const router = express.Router();

const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const favoriteRoutes = require("./favoriteRoutes");
const categoryRoutes = require("./categoryRoutes");

router.use("/products", productRoutes);
router.use("/users", userRoutes);
router.use("/favorites", favoriteRoutes);
router.use("/categories", categoryRoutes);

module.exports = router;
