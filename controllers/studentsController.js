const db = require("../config/db");

// Get All Studdents
const getStudents = async(req, res) => {
try {
    const studentsData = await db.query('SELECT * FROM students');
    if(!studentsData){
        return res.status(404).send({
            success: false,
            message: "no record data found"
        })
    }
    res.status(200).send({
        success: true,
        message: "All Students Records",
        studentsData: studentsData[0]
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: "Error in getting students data",
        error
    })
}
}

// Get One Studdents
const getStudent = async(req, res) => {
    try {
        const studentId = req.params.id;
        if(!studentId){
            return res.status(404).send({
                success: false,
                message: "studentId not found"
            })
        }
        const studentsData = await db.query(`SELECT * FROM students WHERE id = ?`, [studentId]);
        if(!studentsData){
            return res.status(404).send({
                success: false,
                message: "no record data found"
            })
        }
        res.status(200).send({
            success: true,
            message: "All Students Records",
            studentsData: studentsData[0]
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting students data",
            error
        })
    }
    }

// Create Students records
const createStudent = async(req, res) => {
    try {
        const {id, name, roll_no, fees, classname} = req.body;
        if(!id || !name || !roll_no || !fees || !classname) {
            return res.status(404).send({
                success: false,
                message: "please provide all data"
            })
        }
        const studentsData = await db.query(`INSERT INTO students(id, name, roll_no, fees, class) VALUES (? , ? , ? , ? , ?)`, [id, name, roll_no, fees, classname]);
        if(!studentsData){
            return res.status(404).send({
                success: false,
                message: "no record data found"
            })
        }
        res.status(201).send({
            success: true,
            message: "All Students Records",
            studentsData: studentsData[0]
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting students data",
            error
        })
    }
    }

    // Update Student record
    const updateStudent = async (req, res) => {
        try {
            const studentId = req.params.id;
            if (!studentId) {
                return res.status(404).send({
                    success: false,
                    message: "studentId not found"
                });
            }
    
            const { id, name, roll_no, fees, classname } = req.body;
            if (!id || !name || !roll_no || !fees || !classname) {
                return res.status(404).send({
                    success: false,
                    message: "please provide all data"
                });
            }
            
            const studentsData = await db.query(
                `UPDATE students SET id = ?, name = ?, roll_no = ?, fees = ?, class = ? WHERE id = ?`,
                [id, name, roll_no, fees, classname, studentId]
            );
    
            if (!studentsData) {
                return res.status(404).send({
                    success: false,
                    message: "no record data found"
                });
            }
    
            res.status(201).send({
                success: true,
                message: "records get updated",
                studentsData: studentsData[0]
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Error in updating student data",
                error
            });
        }
    };
    
    // Delete Student record
    const deleteStudent = async (req, res) => {
        try {
            const studentId = req.params.id;
            if (!studentId) {
                return res.status(404).send({
                    success: false,
                    message: "studentId not found"
                });
            }
    
            const studentsData = await db.query(
                `DELETE FROM students WHERE id = ?`,
                [studentId]
            );
    
            if (studentsData.affectedRows === 0) {
                return res.status(404).send({
                    success: false,
                    message: "No record found with the provided studentId"
                });
            }
    
            res.status(200).send({
                success: true,
                message: "Student record DELETED",
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Error in deleting student record",
                error
            });
        }
    };
    
    

module.exports = { getStudents, getStudent, createStudent, updateStudent, deleteStudent}