const Borrow = require("../models/Borrow");
const Book = require("../models/Book");

// BORROW BOOK
const borrowBook = async (req, res) => {
  const { bookId } = req.body;

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.copiesAvailable < 1) {
      return res.status(400).json({ message: "No copies available" });
    }

    const existingBorrow = await Borrow.findOne({
      user: req.user.id,
      book: bookId,
      returned: false
    });

    if (existingBorrow) {
      return res.status(400).json({
        message: "You already borrowed this book and haven't returned it"
      });
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    const borrow = await Borrow.create({
      user: req.user.id,
      book: bookId,
      dueDate
    });

    book.copiesAvailable -= 1;
    await book.save();

    res.status(201).json({
      message: "Book borrowed successfully",
      borrow
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// RETURN BOOK
const returnBook = async (req, res) => {
  const { borrowId } = req.body;

  try {
    const borrow = await Borrow.findById(borrowId);

    if (!borrow) {
      return res.status(404).json({ message: "Borrow record not found" });
    }

    if (borrow.returned) {
      return res.status(400).json({ message: "Book already returned" });
    }

    borrow.returned = true;
    await borrow.save();

    const book = await Book.findById(borrow.book);
    book.copiesAvailable += 1;
    await book.save();

    res.json({ message: "Book returned successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { borrowBook, returnBook };