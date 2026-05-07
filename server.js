const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ FIRST parse JSON
app.use(express.json());

// ✅ THEN routes
app.use("/auth", require("./routes/authRoutes"));

app.use("/students", require("./routes/studentRoutes"));

app.use("/attendants", require("./routes/attendantRoutes"));

app.use("/authors", require("./routes/authorRoutes"));

app.use("/books", require("./routes/bookRoutes"));

app.use("/borrow", require("./routes/borrowRoutes"));

app.get("/", (req, res) => {
  res.send("Library API is running...");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});