import db from '../config/db.js';

const Student = {
  getAll: () => db('students')
    .leftJoin('classes', 'students.id', 'classes.id')
    .select(
      'students.id',
      'students.name',
      'students.roll_no',
      'students.fees',
      'students.class',
      'classes.class_name',
      'classes.teacher_name'
    ),

  getById: (id) => db('students')
    .leftJoin('classes', 'students.id', 'classes.id')
    .select(
      'students.id',
      'students.name',
      'students.roll_no',
      'students.fees',
      'students.class',
      'classes.class_name',
      'classes.teacher_name'
    )
    .where('students.id', id)
    .first(),

  create: (data) => db('students').insert(data),

  update: (id, data) => db('students').where({ id }).update(data),

  delete: (id) => db('students').where({ id }).del()
};

export default Student;
