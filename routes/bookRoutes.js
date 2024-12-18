const express = require("express");
const router = express.Router();

const {
  createBook,
  searchBooks,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

router.get("/", searchBooks);

router.post("/", createBook);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

module.exports = router;