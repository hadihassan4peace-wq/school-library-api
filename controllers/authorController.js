const Author = require("../models/Author");

// CREATE AUTHOR
exports.createAuthor = async (req, res) => {
  try {
    const author = await Author.create(req.body);
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL AUTHORS
exports.getAuthors = async (req, res) => {
  const authors = await Author.find();
  res.json(authors);
};