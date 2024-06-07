import Joi from 'joi';

// Joi schema for student data validation
const studentSchema = Joi.object({
    id: Joi.number().required().error(new Error('ID is required and must be a number.')),
    name: Joi.string().required().error(new Error('Name is required.')),
    roll_no: Joi.number().required().error(new Error('Roll number is required.')),
    fees: Joi.number().required().error(new Error('Fees is required and must be a number.')),
    classname: Joi.number().required().error(new Error('Classname is required.')),
    password: Joi.string().required().error(new Error('password is required.')),
});

export default studentSchema;
