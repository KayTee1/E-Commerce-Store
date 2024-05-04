const pool = require("../db/pool");

const users = {
  createUser: async (user) => {
    const insertQuery = "INSERT INTO `users` SET ?";
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(insertQuery, [user]);
      connection.release();
      return results;
    } catch (error) {
      console.log(error);
    }
  },
  findExistingUser: async (email, username) => {
    try {
      const selectQuery =
        "SELECT * FROM `users` WHERE email = ? OR username = ?";
      const connection = await pool.getConnection();
      const [results] = await connection.query(selectQuery, [email, username]);
      connection.release();
      return results;
    } catch (error) {
      throw new Error(error);
    }
  },
  findListingsById: async (id) => {
    try {
      const selectQuery = "SELECT * FROM `products` WHERE `owner` = ?";
      const connection = await pool.getConnection();
      const [results] = await connection.query(selectQuery, [id]);
      connection.release();
      return results;
    } catch (error) {
      console.error("Error fetching listings by owner ID:", error);
    }
  },
};

module.exports = users;
