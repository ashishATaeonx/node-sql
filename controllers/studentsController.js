const db = require('../config/db');
const sendErrorResponse = require('../utils/error');

// Get All Students
const getStudents = async (req, res) => {
  try {
    const studentsData = await db('students').select('*');
    res.status(200).send({
      success: true,
      message: "All Students Records",
      studentsData
    });
  } catch (error) {
    sendErrorResponse(res, 500, "Error in getting students data", error);
  }
};

// Get One Student
const getStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const studentData = await db('students').where({ id: studentId }).first();
    if (!studentData) {
      return res.status(404).send({
        success: false,
        message: "No record found"
      });
    }
    res.status(200).send({
      success: true,
      message: "Student Record",
      studentData
    });
  } catch (error) {
    sendErrorResponse(res, 500, "Error in getting student data", error);
  }
};

// Create Student record
const createStudent = async (req, res) => {
  try {
    const { id, name, roll_no, fees, classname } = req.body;
    await db('students').insert({ id, name, roll_no, fees, class: classname });
    res.status(201).send({
      success: true,
      message: "Student Record Created",
      studentData: { id, name, roll_no, fees, classname }
    });
  } catch (error) {
    sendErrorResponse(res, 500, "Error in creating student record", error);
  }
};

// Update Student record
const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { id, name, roll_no, fees, classname } = req.body;
    await db('students').where({ id: studentId }).update({ id, name, roll_no, fees, class: classname });
    res.status(200).send({
      success: true,
      message: "Student Record Updated",
      studentData: { id, name, roll_no, fees, classname }
    });
  } catch (error) {
    sendErrorResponse(res, 500, "Error in updating student record", error);
  }
};

// Delete Student record
const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    await db('students').where({ id: studentId }).del();
    res.status(200).send({
      success: true,
      message: "Student record DELETED"
    });
  } catch (error) {
    sendErrorResponse(res, 500, "Error in deleting student record", error);
  }
};

module.exports = { getStudents, getStudent, createStudent, updateStudent, deleteStudent };






