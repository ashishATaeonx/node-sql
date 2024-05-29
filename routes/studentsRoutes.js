const express = require('express');
const { getStudents, getStudent, createStudent, updateStudent, deleteStudent } = require('../controllers/studentsController');

// router object
const router = express.Router();

// routes
router.get('/getall', getStudents);
router.get('/get/:id', getStudent);
router.post('/create', createStudent);
router.put('/update/:id', updateStudent);
router.delete('/delete/:id', deleteStudent);

module.exports = router;
