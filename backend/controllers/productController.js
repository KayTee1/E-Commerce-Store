const products = require("../models/products");
const productCategories = require("../models/product_categories");

const getProducts = async (req, res) => {
  try {
    const response = await products.findProducts();
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

const getProductById = async (req, res) => {
  const { id } = req.params;
  const response = await products.findProductById(id);

  if (!response.Error) {
    res.status(200).json(response);
  } else {
    res.status(404).json({ message: response.Error });
  }
};

const postNewProduct = async (req, res) => {
  try {
    const { title, price, product_id, description, image, owner, categories } =
      req.body;

    if (
      !title ||
      !price ||
      !product_id ||
      !description ||
      !image ||
      !owner ||
      !categories
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const product = {
      title,
      price,
      product_id,
      description,
      image,
      owner,
    };

    const productId = await products.postProduct(product);


    await Promise.all(
      categories.map(async (category) => {
        await productCategories.addProductCategory(product_id, category.category_id);
      })
    );

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, price, description, image } = req.body;

  const product = {
    title,
    price,
    description,
    image,
  };
  const response = await products.updateProduct(id, product);

  if (response) {
    res.status(200).json({ message: "Product updated" });
  } else {
    res.status(400).json({ message: "Something went wrong!" });
  }
};
const deleteProductById = async (req, res) => {
  const id = req.params.id;
  const response = await products.deleteProductById(id);

  if (response) {
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(400).json({ message: "Something went wrong!" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  postNewProduct,
  updateProduct,
  deleteProductById,
};
