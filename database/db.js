const { createConnection } = require('mysql2');
require('dotenv').config();

const database = createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

console.log(database)

module.exports = { database }