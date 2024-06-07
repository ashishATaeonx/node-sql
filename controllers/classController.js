import classSchema from '../auth/joiClassAuth.js';
import Class from '../models/class.js';
import sendErrorResponse from '../utils/error.js';


// get all classes

export const getClasses = async (req, res) => {
  try {
    const classesData = await Class.getAll();
    res.status(200).send({
      success: true,
      message: "All Classes Records",
      classesData
    });
  } catch (error) {
    sendErrorResponse(res, 500, "Error in getting classes data", error);
  }
};

// get one class

export const getClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const classData = await Class.getById(classId);
    if (!classData) {
      return res.status(404).send({
        success: false,
        message: "No record found"
      });
    }
    res.status(200).send({
      success: true,
      message: "Class Record",
      classData
    });
  } catch (error) {
    sendErrorResponse(res, 500, "Error in getting class data", error);
  }
};

//  create class

export const createClass = async (req, res) => {
  try {
    const { error } = classSchema.validate(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        message: error.message
      });
    }
    const { id, class_name, teacher_name } = req.body;

    await Class.create({ id, class_name, teacher_name });

    res.status(201).send({
      success: true,
      message: "Class Record Created",
      classData: { id, class_name, teacher_name }
    });
  } catch (error) {
    sendErrorResponse(res, 500, "Error in creating class record", error);
  }
};

// update class

export const updateClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const { error } = classSchema.validate(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        message: error.message
      });
    }
    const { id, class_name, teacher_name } = req.body;
    await Class.update(classId, { id, class_name, teacher_name });
    res.status(200).send({
      success: true,
      message: "Class Record Updated",
      classData: { id, class_name, teacher_name }
    });
  } catch (error) {
    sendErrorResponse(res, 500, "Error in updating class record", error);
  }
};

// delete class

export const deleteClass = async (req, res) => {
  try {
    const classId = req.params.id;
    await Class.delete(classId);
    res.status(200).send({
      success: true,
      message: "Class record DELETED"
    });
  } catch (error) {
    sendErrorResponse(res, 500, "Error in deleting class record", error);
  }
};
