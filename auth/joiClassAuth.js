import Joi from 'joi';

const classSchema = Joi.object({
  id: Joi.number().integer().positive().error(new Error('Class ID is required and must be a number.')),
  class_name: Joi.string().max(45).required().error(new Error('Class name is required.')),
  teacher_name: Joi.string().max(255).required().error(new Error('teacher name is required.'))
});

export default classSchema;