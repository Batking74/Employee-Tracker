// Importing Packages
const { createConnection } = require('mysql2');
require('dotenv').config();


// Connecting to database
const database = createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise();


// Retrieves data from database (Read)
async function getInfoFromDatabaseAt(tableName) {
    try {
        const response = (await database.query('SELECT * FROM ??', [tableName]))[0];
        return response;
    }
    catch(error) {
        console.log(error);
    }
}


// Adds data to database (Create)
async function addToDatabase(tableName, columns, values) {
    try {
        const query = `INSERT INTO ?? (${columns.join(', ')}) VALUES(?)`;
        const response = await database.query(query, [tableName, values]);
        return `${response} Added`;
    }
    catch(error) {
        console.log(error);
    }
}


// Updates already existing data in database (Update)
async function updateDatabase(tableName, columnNames, values, id) {
    try {
        const query = `UPDATE ?? SET ?? = ? WHERE id = ?`;
        const response = await database.query(query, [tableName, columnNames[0], values[0], id]);
    }
    catch(error) {
        console.log(error);
    }
    return 'updated';
}


// Exporting Modules
module.exports = { getInfoFromDatabaseAt, addToDatabase, updateDatabase }