const favorites = require("../models/favorites");

const getFavorites = async (req, res) => {
  const { id } = req.params;

  console.log(id);
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

const postNewFavorite = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;
    if (!user_id || !product_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const favorite = {
      user_id,
      product_id,
    };

    const response = await favorites.postFavorite(favorite);

    if (response) {
      favorite.id = response;
      res.status(201).json(favorite);
    } else {
      res.status(400).json({ message: "Something went wrong!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFavoriteById = async (req, res) => {
  const id = req.params.id;
  const response = await favorites.deleteFavorite(id);

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
