const express = require('express');
const { getStudents, getStudent, createStudent, updateStudent, deleteStudent, loginStudent, logoutStudent } = require('../controllers/studentsController');
const verifyToken = require('../auth/jwt');

// router object
const router = express.Router();

// routes
router.get('/getall', getStudents);
router.get('/get/:id', getStudent);
router.post('/create', createStudent);
router.put('/update/:id', updateStudent);
router.delete('/delete/:id', deleteStudent);
router.post('/login', loginStudent);
router.post('/logout',verifyToken, logoutStudent);
module.exports = router;
