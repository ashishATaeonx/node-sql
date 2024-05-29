const knex = require('knex');
const knexConfig = require('../knexfile');

// Initialize Knex with the development environment configuration
const db = knex(knexConfig.development);

module.exports = db;

