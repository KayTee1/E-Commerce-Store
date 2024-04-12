const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const {
  signUpUser,
  loginUser,
  getUserListings,
} = require("../controllers/userController");

router.post("/signup", signUpUser);
router.post("/login", loginUser);

router.use(verifyToken);

router.get("/listings/:id", getUserListings);

module.exports = router;
