const pool = require("../db/pool");

const products = {
  findProducts: async () => {
    const selectQuery = "SELECT * FROM `products`";
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(selectQuery);
      connection.release();

      return results;
    } catch (error) {
      throw new Error(error);
    }
  },
  findProductById: async (product_id) => {
    const selectQuery = "SELECT * FROM `products` WHERE product_id=?;";
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(selectQuery, [product_id]);
      connection.release();
      if (results.length === 0) {
        return { Error: "Product not found" };
      }
      return results[0];
    } catch (error) {
      throw new Error(error);
    }
  },
  postProduct: async (product) => {
    const insertQuery = "INSERT INTO `products` SET ?";
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query(insertQuery, [product]);
      connection.release();
      const id = result.insertId;
      return id;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateProduct: async (product_id, product) => {
    const updateQuery = "UPDATE `products` SET ? WHERE `product_id` = ?";
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query(updateQuery, [
        product,
        product_id,
      ]);
      connection.release();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteProductById: async (item_id) => {
    const deleteQuery = "DELETE FROM `products` WHERE `product_id` = ?";
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(deleteQuery, [item_id]);
      connection.release();
      return results;
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = products;
