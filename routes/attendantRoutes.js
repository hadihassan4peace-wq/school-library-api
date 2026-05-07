const express = require("express");
const router = express.Router();

const {
  createAttendant,
  getAttendants
} = require("../controllers/attendantController");

// CREATE
router.post("/", createAttendant);

// GET ALL
router.get("/", getAttendants);

module.exports = router;