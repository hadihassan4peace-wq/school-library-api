const express = require("express");
const router = express.Router();

const {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook
} = require("../controllers/bookController");

// 📚 CREATE BOOK
router.post("/", createBook);

// 📚 GET ALL BOOKS
router.get("/", getBooks);

// 📚 GET SINGLE BOOK (with populate)
router.get("/:id", getBook);

// 📚 UPDATE BOOK
router.put("/:id", updateBook);

// 📚 DELETE BOOK
router.delete("/:id", deleteBook);

// 📤 BORROW BOOK (IMPORTANT)
router.post("/:id/borrow", borrowBook);

// 🔄 RETURN BOOK (IMPORTANT)
router.post("/:id/return", returnBook);

module.exports = router;