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
      throw new Error(error);
    }
  },

  findByEmail: async (email) => {
    try {
      const selectQuery = "SELECT * FROM `users` WHERE email=?";
      const connection = await pool.getConnection();
      const [results] = await connection.query(selectQuery, [email]);
      return results;
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = users;