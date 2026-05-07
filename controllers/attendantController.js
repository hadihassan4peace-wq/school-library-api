const LibraryAttendant = require("../models/LibraryAttendant");

// CREATE ATTENDANT
exports.createAttendant = async (req, res) => {
  try {
    const { name, staffId } = req.body;

    if (!name || !staffId) {
      return res.status(400).json({
        message: "Name and staffId are required"
      });
    }

    const attendant = await LibraryAttendant.create({
      name,
      staffId
    });

    res.status(201).json(attendant);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL ATTENDANTS
exports.getAttendants = async (req, res) => {
  try {
    const attendants = await LibraryAttendant.find();
    res.json(attendants);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};