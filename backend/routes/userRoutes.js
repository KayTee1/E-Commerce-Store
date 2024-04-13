const express = require("express");
const router = express.Router();

const {
  signUpUser,
  loginUser,
  getUserListings,
} = require("../controllers/userController");

router.post("/signup", signUpUser);
router.post("/login", loginUser);

router.get("/listings/:id", getUserListings);

module.exports = router;
