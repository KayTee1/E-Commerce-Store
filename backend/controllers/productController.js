const products = require("../models/products");
const productCategories = require("../models/product_categories");
const categoriesModel = require("../models/categories");
const favorites = require("../models/favorites");

//returns an array of products
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

//returns an array of products by category's id
const getProductsByCategoryId = async (req, res) => {
  //category's id
  const { id } = req.params;
  const productIds = await productCategories.findProductsByCategoryId(id);

  const productsArray = await Promise.all(
    productIds.map(async (product) => {
      return await products.findProductById(product.product_id);
    })
  );

  if (productsArray) {
    res.status(200).json(productsArray);
  } else {
    res.status(404).json({ message: "Something went wrong!" });
  }
};

//returns a single product by product_id
const getProductById = async (req, res) => {
  //product's id
  const { id } = req.params;
  const response = await products.findProductById(id);

  if (response.length === 0) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
  // PC = Products Categories
  const PC = await productCategories.findProductsCategories(id);

  // cat = Categories
  const cat = await Promise.all(
    PC.map(async (category) => {
      return await categoriesModel.findCategoryById(category.category_id);
    })
  );

  if (!response.Error) {
    response.categories = cat;
    res.status(200).json(response);
  } else {
    res.status(404).json({ message: response.Error });
  }
};

//creates a new product
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

    try {
      await Promise.all(
        categories.map(async (category) => {
          await productCategories.addProductCategory(
            product_id,
            category.category_id
          );
        })
      );
    } catch (error) {
      console.error(error);
    }

    res.status(201).json({ product_id: productId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//updates a product by id
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { product_id, title, price, description, image, categories } = req.body;
  
  const product = {
    product_id,
    title,
    price,
    description,
    image,
  };
  const response = await products.updateProduct(id, product);
  
  let isError = false;
  try {
    //deleting all categories for the product
    await productCategories.deleteProductCategoryByProductId(id);
   
    //adding new (updated) categories for the product
    await Promise.all(
      categories.map(async (category) => {
        await productCategories.addProductCategory(id, category.category_id);
      })
    );
  } catch (error) {
    isError = true;
    console.error(error);
  }

  if (response && !isError) {
    res.status(200).json({ message: "Product updated" });
  } else {
    res.status(400).json({ message: "Something went wrong!" });
  }
};

//deletes a product by id
const deleteProductById = async (req, res) => {
  const id = req.params.id;
  await productCategories.deleteProductCategoryByProductId(id);
  await favorites.deleteFavorite(null, id);

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
  getProductsByCategoryId,
  postNewProduct,
  updateProduct,
  deleteProductById,
};
