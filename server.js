// Declaring Variables
const { getInfoFromDatabaseAt, addToDatabase, updateDatabase } = require('./database/db');
const { List, table, choices, questions, handleAndLogError } = require('./utils/questions');
const { prompt } = require('inquirer');


// Instantiating Object
const start = [ new List('list', 'Answer', 'Select an Option:', choices) ];


// Prompts choices for the CEO to perform C.R.U.D operations, and manage company database
async function init() {
    prompt(start)
    .then(usersResponse => {
        for(let i = 0; i < choices.length; i++) {
            const answer = usersResponse.Answer;
            if(answer === choices[i]) {
                continuePrompt(i); break;
            }
        }
    })
    .catch(error => {
        handleAndLogError('init', error); // Error Handling
    })
}


// Validates the CEO's request
function continuePrompt(i) {
    switch (i) {
        case 0:
        case 1:
        case 2: getData(i); break;
        case 3:
        case 4:
        case 5:
        case 6:
        case 7: getMoreInfoFromUser(i); break;
        default: break;
    }
}


// Collects more data from the CEO, and creates CEO specified data in a table
async function getMoreInfoFromUser(index) {
    let index2, index3 = 0;
    // If the index matches a number in the range [3, 8), set index2 to the corresponding value
    for(let i = 3; i < 8; i++) {
        if(index == i) index2 = i - 3;
    }
    // Prompting more questions to get data
    prompt(await questions[index2])
    .then(req => {
        if(Object.keys(req).length > 3) index3 = 1;
        sendRequest(Object.keys(req), Object.values(req), index2, index3);
    })
    .catch(error => {
        handleAndLogError('getMoreInfoFromUser', error); // Error Handling
    })
}


// Retrevies some information from a table in database
async function getData(i) {
    try {
        const data = await getInfoFromDatabaseAt(table[i]);
        console.table(data);
        promptChoices();
    }
    catch(error) {
        handleAndLogError('getData', error); // Error Handling
    }
}


// Sends request to database to create or update more data
async function sendRequest(keys, values, index2, index3) {
    try {
        if(index2 != 3 && index2 != 4 && index2 != 5) {
            const res = await convert(values, index2, index3);
            // Creates data
            const response = await addToDatabase(table[index2], keys, values);
            console.log(response);
        }
        else {
            // Updates data
            const res = await convert(values, index3 + 1, index3 + 1);
            const id = parseInt(res[0]);
            const columnName = [keys[keys.length - 1]];
            const value = [res[res.length - 1]];
            const response = await updateDatabase(table[2], columnName, value, id);
            console.log(response);
        }
        promptChoices();
    }
    catch(error) {
        handleAndLogError('sendRequest', error); // Error Handling
    }
}


// Allows the CEO to Keep the Program running until specified to 'quit'
function promptChoices() {
    console.log('\n');
    init();
}


// Converts Database reference ID's to Strings and Database String Values to their corresponding ID's
async function convert(values, index, index3) {
    try {
        const data = await getInfoFromDatabaseAt(table[index3]);
        let arr1, arr2;
        for(let i = 0; i < data.length; i++) {
            // Getting Department ID Number
            arr1 = getIDForValueInTable(values, index, data, data[i].Name, i);
            // Getting Roles ID Number
            arr2 = getIDForValueInTable(values, index3 + 1, data, data[i].Title, i);
            if(arr1 != undefined) return arr1;
            if(arr2 != undefined) return arr2;
        }
        return values;
    }
    catch(error) {
        handleAndLogError('convert', error); // Error Handling
    }
}


// Converts a string value in a table to it's corresponding ID
function getIDForValueInTable(values, index, data, rowInDatabase, i) {
    if(values[index] === undefined) index -= 1;
    if(values[index] === rowInDatabase && values.length != 1) {
        values[index] = data[i].id;
        return values;
    }
}


// Starting Program
init();