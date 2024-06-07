import knex from 'knex';
import { development as knexConfig } from '../knexfile.js';

const db = knex(knexConfig);

export default db;
