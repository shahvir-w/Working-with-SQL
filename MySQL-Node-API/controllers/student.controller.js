const db = require("../config/db");

const getStudents = async (req, res) => {
  try {
    const [records] = await db.query("SELECT * FROM students");
    if (!records) {
      return res.status(404).json({ message: "no student records found" });
    }
    res.status(200).send({ records });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(404).json({ message: "id must be valid" });
    }
    const student = await db.query("SELECT * FROM students WHERE id=?", [
      studentId,
    ]);
    if (!student) {
      return res.status(404).json({ message: "no student records found" });
    }
    res.status(200).send({ details: student[0] });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createStudent = async (req, res) => {
  try {
    const { name, roll_num, fees, class_num } = req.body;
    if (!name || !roll_num || !fees || !class_num) {
      return res.status(404).json({ message: "all feilds must be valid" });
    }
    const student = await db.query(
      "INSERT INTO students (name, roll_num, fees, class_num) VALUES (?, ?, ?, ?)",
      [name, roll_num, fees, class_num]
    );
    if (!student) {
      return res.status(404).json({ message: error });
    }
    res.status(201).json({ message: "new student created" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(404).json({ message: "id must be valid" });
    }
    const { name, roll_num, fees, class_num } = req.body;
    const student = await db.query(
      "UPDATE students SET name = ?, roll_num = ?, fees = ?, class_num = ? WHERE id = ?",
      [name, roll_num, fees, class_num, studentId]
    );

    if (!student) {
      return res.status(500).json({ message: "ereor in updating student" });
    }
    res.status(200).json({ message: "student updated" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    console.log("Deleting student with ID:", studentId);

    if (!studentId) {
      return res.status(400).json({ message: "id must be valid" });
    }

    const [result] = await db.query("DELETE FROM students WHERE id = ?", [
      studentId,
    ]);
    console.log([result])
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "student not found" });
    }
    res.status(200).json({ message: "student deleted successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
