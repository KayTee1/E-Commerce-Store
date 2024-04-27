const pool = require("../db/pool");

const productCategories = {
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
};

module.exports = productCategories;
