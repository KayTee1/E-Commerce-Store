const express = require("express");
const router = express.Router();

const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const favoriteRoutes = require("./favoriteRoutes");

router.use("/products", productRoutes);
router.use("/users", userRoutes);
router.use("/favorites", favoriteRoutes)

module.exports = router;
