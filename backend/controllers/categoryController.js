const categories = require("../models/categories");

const getCategories = async (req, res) => {
  try {
    const response = await categories.findCategories();
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

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  const response = await categories.findCategoryById(id);

  if (!response.Error) {
    res.status(200).json(response);
  } else {
    res.status(404).json({ message: response.Error });
  }
};

const postNewCategory = async (req, res) => {
  try {
    const { category_id, name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const category = {
      category_id,
      name,
    };

    const response = await categories.postCategory(category);

    if (response) {
      category.id = response;

      res.status(201).json(category);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const category = {
    name,
  };

  const response = await categories.updateCategory(id, category);
  if (response) {
    category.id = id;
    res.status(200).json(category);
  } else {
    res.status(400).json({ message: "Something went wrong!" });
  }
};

const deleteCategoryById = async (req, res) => {
  const { id } = req.params;
  const response = await categories.deleteCategory(id);

  if (response) {
    res.status(200).json({ message: "Category deleted" });
  } else {
    res.status(404).json({ message: "Category not found" });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  postNewCategory,
  updateCategory,
  deleteCategoryById,
};
