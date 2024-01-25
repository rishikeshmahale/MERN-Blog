const express = require("express");
const {
  userRegister,
  userLogin,
  userProfile,
} = require("../controllers/userControllers.js");

const router = express.Router();

// register
router.post("/register", userRegister);

// login
router.post("/login", userLogin);

// profile 
router.get("/profile", userProfile);

// logout
router.post("/logout", userlogout);

module.exports = router;
