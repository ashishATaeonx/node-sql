import express from "express"
import {verifyToken} from '../auth/jwt.js'
import { getStudents, getStudent, createStudent, updateStudent, deleteStudent, loginStudent, logoutStudent } from '../controllers/studentsController.js'

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


export default router;
