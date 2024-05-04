const pool = require("../db/pool");

const productCategories = {
  //returns an array of a specific product's categories
  findProductsCategories: async (product_id) => {
    const query = `SELECT * FROM product_categories WHERE product_id = ?`;
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(query, [product_id]);

      connection.release();
      return results;
    } catch (error) {
      throw new Error(`Failed to get product categories: ${error.message}`);
    }
  },
  //finds all products by category id
  findProductsByCategoryId: async (category_id) => {
    const query = `SELECT product_id FROM product_categories WHERE category_id = ?`;
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(query, [category_id]);

      connection.release();
      return results;
    } catch (error) {
      throw new Error(`Failed to get product categories: ${error.message}`);
    }
  },
  //adds a new product category entry in the junction table
  addProductCategory: async (productId, categoryId) => {
    const query =
      "INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)";
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(query, [productId, categoryId]);
      connection.release();
      return results.insertId;
    } catch (error) {
      throw new Error(`Failed to add product category: ${error.message}`);
    }
  },
  //deletes a product category entry in the junction table
  deleteProductCategoryByProductId: async (product_id) => {
    const query = "DELETE FROM product_categories WHERE product_id = ?";
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(query, [product_id]);

      connection.release();
      return results;
    } catch (error) {
      throw new Error(`Failed to delete product category: ${error.message}`);
    }
  },
};

module.exports = productCategories;
