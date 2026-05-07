const Book = require("../models/Book");


// ===============================
// 📚 CREATE BOOK
// ===============================
exports.createBook = async (req, res) => {
  try {
    const { title, isbn, authors } = req.body;

    if (!title || !authors) {
      return res.status(400).json({
        message: "Title and authors are required"
      });
    }

    const book = await Book.create({
      title,
      isbn,
      authors
    });

    res.status(201).json(book);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ===============================
// 📚 GET ALL BOOKS (SEARCH + FILTER + PAGINATION)
// ===============================
exports.getBooks = async (req, res) => {
  try {
    let { page = 1, limit = 10, search, author } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const query = {};

    // 🔍 SEARCH BY TITLE
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // 👤 FILTER BY AUTHOR
    if (author) {
      query.authors = author;
    }

    const books = await Book.find(query)
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy")
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Book.countDocuments(query);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      books
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ===============================
// 📚 GET SINGLE BOOK (FULL POPULATE)
// ===============================
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy");

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ===============================
// ✏️ UPDATE BOOK
// ===============================
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ===============================
// 🗑 DELETE BOOK
// ===============================
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ===============================
// 📤 BORROW BOOK (ASSIGNMENT LOGIC)
// ===============================
exports.borrowBook = async (req, res) => {
  const { studentId, attendantId, returnDate } = req.body;

  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.status === "OUT") {
      return res.status(400).json({ message: "Book already borrowed" });
    }

    book.status = "OUT";
    book.borrowedBy = studentId;
    book.issuedBy = attendantId;
    book.returnDate = returnDate;

    await book.save();

    res.json({
      message: "Book borrowed successfully",
      book
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ===============================
// 🔄 RETURN BOOK
// ===============================
exports.returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.status === "IN") {
      return res.status(400).json({ message: "Book already returned" });
    }

    book.status = "IN";
    book.borrowedBy = null;
    book.issuedBy = null;
    book.returnDate = null;

    await book.save();

    res.json({
      message: "Book returned successfully",
      book
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};