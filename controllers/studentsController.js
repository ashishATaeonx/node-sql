const studentSchema = require('../auth/joiAuth');
const db = require('../config/db');
const sendErrorResponse = require('../utils/error');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const generateAccessToken = (student) => {
  return jwt.sign(student, process.env.TOKEN_SECRET, {
    expiresIn: '15m',
  })
}

const generateRefreshToken = (studentId) => {
  return jwt.sign({ studentId }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
};

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

// Register Student record
const createStudent = async (req, res) => {
  try {
    const { error } = studentSchema.validate(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        message: error.message
      });
    }
    const { id, name, roll_no, fees, classname, password } = req.body;

    const hashedPassword = md5(password);

    await db('students').insert({ id, name, roll_no, fees, class: classname, password: hashedPassword });


    res.status(201).send({
      success: true,
      message: "Student Record Created",
      studentData: { id, name, roll_no, fees, classname, password }
    });
  } catch (error) {
    sendErrorResponse(res, 500, "Error in creating student record", error);
  }
};

// Update Student record
const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { error } = studentSchema.validate(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        message: error.message
      });
    }
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


// Login student
const loginStudent = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) return res.status(400).json({
      success: false,
      message: "Provide all student credentials",
    });

    const student = await db('students').where({ name }).first();

    if (!student || student.password !== md5(password)) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const accessToken = generateAccessToken({ id: student.id, name: student.name, roll_no: student.roll_no });
    
    const refreshToken = generateRefreshToken(student.id);

    await db('students').where({ id: student.id }).update({ refreshToken: refreshToken });

    res.status(200).json({
      success: true,
      message: "Login Successful",
      accessToken: accessToken,
      refreshToken: refreshToken
    });
  } catch (error) {
    sendErrorResponse(res, 500, "Error in logging in", error);
  }
};

const logoutStudent = async (req, res) => {
  try {
    const { id } = req.studentData;
    await db('students').where({ id }).update({ refreshToken: null });

    res.status(200).json({
      success: true,
      message: "Logout Successful"
    });
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({
      success: false,
      message: "Error in logging out",
      error: error.message
    });
  }
};


module.exports = { getStudents, getStudent, createStudent, updateStudent, deleteStudent, loginStudent, logoutStudent };
