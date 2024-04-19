const { v4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const users = require("../models/users");

const signUpUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await users.findExistingUser(email, username);
    if (existingUser.length > 0) {
      return res.status(422).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = {
      user_id: v4(),
      username,
      email,
      hashed_password: hashedPassword,
    };

    const result = await users.createUser(newUser);
    if (!result) {
      return res.status(500).json({ error: "Failed to create user" });
    }

    const token = jwt.sign(
      {
        userId: newUser.user_id,
        email: newUser.email,
        username: newUser.username,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      userId: newUser.user_id,
      username: newUser.username,
      email: newUser.email,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Signup failed, please try again" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const username = "";
  try {
    const [user] = await users.findExistingUser(email, username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      user.hashed_password
    );
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
console.log(user)
    const token = jwt.sign(
      {
        userId: user.user_id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      userId: user.user_id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Login failed, please try again" });
  }
};

const getUserListings = async (req, res) => {
  const { id } = req.params;

  try {
    const products = await users.findListingsById(id);
    if (!products) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(products);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to get user listings" });
  }
};

module.exports = { signUpUser, loginUser, getUserListings };
