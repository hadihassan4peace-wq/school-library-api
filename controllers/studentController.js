const Student = require("../models/Student");

// ✅ CREATE STUDENT
exports.createStudent = async (req, res) => {
  try {
    const { name, email, studentId } = req.body;

    if (!name || !email || !studentId) {
      return res.status(400).json({
        message: "Name, email and studentId are required"
      });
    }

    const student = await Student.create({
      name,
      email,
      studentId
    });

    res.status(201).json(student);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET ALL STUDENTS
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET SINGLE STUDENT
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};