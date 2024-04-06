const { v4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const users = require("../models/users");

const signUpUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await users.findByEmail(email);
    if (existingUser.length > 0) {
      return res.status(422).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = {
      id: v4(),
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
        id: newUser.id,
        email: newUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      id: newUser.id,
      username: newUser.user_name,
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

  try {
    const [user] = await users.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      user.hashed_password
    );
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      id: user.id,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Login failed, please try again" });
  }
};

module.exports = {
  signUpUser,
  loginUser,
};
