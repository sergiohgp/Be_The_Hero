const knex = require('knex'); // import knex
const configuration = require('../../knexfile'); // import knex file for configuration of the connection

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

const conncetion = knex(config); //use development as default

module.exports = conncetion; // exports the connection