const express = require("express");
const router = express.Router();

const {
  createStudent,
  getStudents,
  getStudent
} = require("../controllers/studentController");

// CREATE
router.post("/", createStudent);

// GET ALL
router.get("/", getStudents);

// GET ONE
router.get("/:id", getStudent);

module.exports = router;