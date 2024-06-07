import db from '../config/db.js';

const Class = {
  getAll: () => db('classes').select('*'),

  getById: (id) => db('classes').where({ id }).first(),

  create: (data) => db('classes').insert(data),

  update: (id, data) => db('classes').where({ id }).update(data),

  delete: (id) => db('classes').where({ id }).del()
};

export default Class;
