const pool = require("../db/pool");

const products = {
  findFavorites: async (user_id, product_id = null) => {
    let selectQuery = "SELECT * FROM `favorites` WHERE user_id = ?";
    if (product_id) {
      selectQuery += " AND product_id = ?";
    }
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(selectQuery, [
        user_id,
        product_id,
      ]);
      connection.release();
      return results;
    } catch (error) {
      throw new Error(error);
    }
  },
  postFavorite: async (favorite) => {
    const insertQuery = "INSERT INTO `favorites` SET ?";
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query(insertQuery, [favorite]);
      connection.release();
      const id = result.insertId;
      return id;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteFavorite: async (user_id, product_id) => {
    let deleteQuery =
      "DELETE FROM `favorites` WHERE `user_id` = ? AND `product_id` = ?";
    if (!user_id) {
      deleteQuery = "DELETE FROM `favorites` WHERE `product_id` = ?";
    }
    try {
      const connection = await pool.getConnection();
      let tuple = user_id ? [user_id, product_id] : [product_id];
      const [results] = await connection.query(deleteQuery, tuple);
      connection.release();
      return results;
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = products;
