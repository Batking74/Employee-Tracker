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


async function updateDatabase(tableName, columnNames, values, id) {
    console.log(tableName)
    console.log(columnNames)
    console.log(values)
    console.log(id)
    for(let value of values) {
        for(let columnName of columnNames) {
            try {
                const query = `UPDATE ?? SET ?? = ? WHERE id = ?`
                const response = await database.query(query, [tableName, columnName, value, id]);
            }
            catch(error) {
                console.log(error);
            }
        }
    }
    return 'updated';
}



module.exports = { getInfoFromDatabaseAt, addToDatabase, updateDatabase }