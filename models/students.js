import db from '../config/db.js';

const Student = {
  getCount: async () => {
    const [{ total }] = await db('students').count('id as total');
    return total;
  },

  getPaginated: async (page, limit) => {
    const offset = (page - 1) * limit;
    return db('students')
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
      .limit(limit)
      .offset(offset);
  },

  getById: async (id) => {
    return db('students')
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
      .first();
  },

  create: async (data) => {
    return db('students').insert(data);
  },

  update: async (id, data) => {
    return db('students').where({ id }).update(data);
  },

  delete: async (id) => {
    return db('students').where({ id }).del();
  }
};

const getPaginateInfo = (totalCount, currentPage, limitPerPage) => {
  const total = parseInt(totalCount);
  const page = parseInt(currentPage);
  const limit = parseInt(limitPerPage);
  const offset = (page - 1) * limit;

  const totalPages = Math.ceil(total / limit);

  return {
    total,
    currentPage: page,
    limitPerPage: limit,
    totalPages,
    offset
  };
};

export { Student, getPaginateInfo };

