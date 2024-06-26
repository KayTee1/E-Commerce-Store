const favorites = require("../models/favorites");

//returns an array of favorites
const getFavorites = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await favorites.findFavorites(id);
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "Something went wrong!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

//creates a new favorite
const postNewFavorite = async (req, res) => {
  const { product_id, user_id } = req.body;
  try {
    if (!user_id || !product_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const favorite = {
      user_id,
      product_id,
    };

    // Check if the favorite already exists
    const existingFavorites = await favorites.findFavorites(
      user_id,
      product_id
    );
    const exists = existingFavorites.some(
      (existingFavorite) =>
        existingFavorite.product_id === favorite.product_id &&
        existingFavorite.user_id === favorite.user_id
    );
    if (!exists) {
      const response = await favorites.postFavorite(favorite);

      if (response) {
        favorite.id = response;
        res.status(201).json(favorite);
      } else {
        res.status(400).json({ message: "Something went wrong!" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//deletes a favorite by id
const deleteFavoriteById = async (req, res) => {
  const { product_id, user_id } = req.body;
  const response = await favorites.deleteFavorite(user_id, product_id);

  if (response) {
    res.status(200).json({ message: "Favorite deleted successfully" });
  } else {
    res.status(404).json({ message: "Favorite not found" });
  }
};

module.exports = {
  getFavorites,
  postNewFavorite,
  deleteFavoriteById,
};
