const pool = require("../db/pool");

const categories = {
  findCategories: async () => {
    const selectQuery = "SELECT * FROM `categories`";
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(selectQuery);
      connection.release();

      return results;
    } catch (error) {
      throw new Error(error);
    }
  },
  findCategoryById: async (category_id) => {
    const selectQuery = "SELECT * FROM `categories` WHERE category_id=?;";
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(selectQuery, [category_id]);
      connection.release();
      if (results.length === 0) {
        return { Error: "Category not found" };
      }
      return results[0];
    } catch (error) {
      throw new Error(error);
    }
  },
  postCategory: async (category) => {
    const insertQuery = "INSERT INTO `categories` SET ?";
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query(insertQuery, [category]);
      connection.release();
      const id = result.insertId;
      return id;
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = categories;
