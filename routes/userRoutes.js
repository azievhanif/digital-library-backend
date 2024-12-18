const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");

const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;