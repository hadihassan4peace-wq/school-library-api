const express = require("express");
const router = express.Router();

const { borrowBook, returnBook } = require("../controllers/borrowController");
const protect = require("../middleware/authMiddleware");

// ✅ Borrow book
router.post("/", protect, borrowBook);

// ✅ Return book
router.post("/return", protect, returnBook);

module.exports = router;