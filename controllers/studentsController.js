import studentSchema from '../auth/joiAuth.js';
import {Student, getPaginateInfo} from '../models/students.js';
import sendErrorResponse from '../utils/error.js';
import jwt from 'jsonwebtoken';
import md5 from 'md5';
import db from '../config/db.js';

const generateAccessToken = (student) => {
  return jwt.sign(student, process.env.TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

const generateRefreshToken = (studentId) => {
  return jwt.sign({ studentId }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
};



export const getStudents = async (req, res) => {
  try {
    const { page = 1, limit = 1 } = req.query;

    // Fetch total count of students
    const totalCount = await Student.getCount();

    // Get paginated student data
    const studentsData = await Student.getPaginated(page, limit);

    // Calculate pagination information
    const paginationInfo = getPaginateInfo(totalCount, page, limit);

    res.status(200).send({
      success: true,
      message: "Paginated Students Records",
      studentsData,
      paginationInfo
    });
  } catch (error) {
    sendErrorResponse(res, 500, "Error in getting paginated students data", error);
  }
};


// export const getStudents = async (req, res) => {
//   try {
//     const studentsData = await Student.getAll();
//     res.status(200).send({
//       success: true,
//       message: "All Students Records",
//       studentsData
//     });
//   } catch (error) {
//     sendErrorResponse(res, 500, "Error in getting students data", error);
//   }
// };

export const getStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const studentData = await Student.getById(studentId);
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

export const createStudent = async (req, res) => {
  try {
    const { error } = studentSchema.validate(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        message: error.message
      });
    }
    const { id, name, roll_no, fees, class: classname, password } = req.body;

    const hashedPassword = md5(password);

    await Student.create({ id, name, roll_no, fees, class: classname, password: hashedPassword });

    res.status(201).send({
      success: true,
      message: "Student Record Created",
      studentData: { id, name, roll_no, fees, classname, password }
    });
  } catch (error) {
    sendErrorResponse(res, 500, "Error in creating student record", error);
  }
};

export const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { error } = studentSchema.validate(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        message: error.message
      });
    }
    const { id, name, roll_no, fees, class: classname } = req.body;
    await Student.update(studentId, { id, name, roll_no, fees, class: classname });
    res.status(200).send({
      success: true,
      message: "Student Record Updated",
      studentData: { id, name, roll_no, fees, classname }
    });
  } catch (error) {
    sendErrorResponse(res, 500, "Error in updating student record", error);
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    await Student.delete(studentId);
    res.status(200).send({
      success: true,
      message: "Student record DELETED"
    });
  } catch (error) {
    sendErrorResponse(res, 500, "Error in deleting student record", error);
  }
};

export const loginStudent = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) return res.status(400).json({
      success: false,
      message: "Provide all student credentials",
    });

    const student = await Student.getByName(name);

    if (!student || student.password !== md5(password)) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const accessToken = generateAccessToken({ id: student.id, name: student.name, roll_no: student.roll_no });

    const refreshToken = generateRefreshToken(student.id);

    await Student.update(student.id, { refreshToken: refreshToken });

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

export const logoutStudent = async (req, res) => {
  try {
    const { id } = req.studentData;
    await Student.update(id, { refreshToken: null });

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


