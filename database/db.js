const { createConnection } = require('mysql2');
require('dotenv').config();

const database = createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise();

async function getInfoFromDatabaseAt(tableName) {
    try {
        const response = (await database.query('SELECT * FROM ??', [tableName]))[0];
        return response;
    }
    catch(error) {
        console.log(error);
    }
}


async function addToDatabase(tableName, req) {
    try {
        // const response = await database.query('INSERT INTO ??', [tableName]);
        return;
    }
    catch(error) {
        console.log(error);
    }
}

module.exports = { getInfoFromDatabaseAt, addToDatabase }