const Joi = require('joi');

// Joi schema for student data validation
const studentSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    roll_no: Joi.number().required(),
    fees: Joi.number().required(),
    classname: Joi.number().required()
  });

  module.exports = studentSchema;