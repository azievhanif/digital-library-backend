const express = require("express");
const router = express.Router();

const {
  borrowBook,
  returnBook,
  getUserBorrowings,
} = require("../controllers/borrowingController");

const { authMiddleware } = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.post("/borrow", borrowBook);

router.post("/return", returnBook);

router.get("/my-borrowings", getUserBorrowings);

module.exports = router;