const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
  borrowerName: {
    type: String,
    required: true,
  },
  borrowedAt: {
    type: Date,
    default: Date.now,
  },
  returned: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model("Borrow", borrowSchema);