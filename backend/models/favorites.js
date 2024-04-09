const pool = require("../db/pool");

const products = {
  findFavorites: async (user_id) => {
    const selectQuery = "SELECT * FROM `favorites` WHERE user_id=?";
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(selectQuery, [user_id]);
      connection.release();
      if (results.length === 0) {
        return { Error: "No favorites found" };
      }
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
  deleteFavorite: async (id) => {
    const deleteQuery = "DELETE FROM `favorites` WHERE `id` = ?";
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(deleteQuery, [id]);
      connection.release();
      return results;
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = products;