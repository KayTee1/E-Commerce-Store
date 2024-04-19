const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  getFavorites,
  deleteFavoriteById,
  postNewFavorite,
} = require("../controllers/favoriteController");

router.use(verifyToken);

router.get("/:id", getFavorites);

router.post("/", postNewFavorite);

router.delete("/", deleteFavoriteById);

module.exports = router;
