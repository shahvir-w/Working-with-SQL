const express = require("express");
const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
} = require("../controllers/student.controller");

const router = express.Router();

// get all students
router.get("/list", getStudents);

// get all students
router.get("/:id", getStudent);

// create a student
router.post("/create", createStudent);

// update a student
router.put("/update/:id", updateStudent);

// delete a student
router.delete("/delete/:id", deleteStudent);

module.exports = router;
