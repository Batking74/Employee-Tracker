// Declaring Variables
const { getInfoFromDatabaseAt, addToDatabase, updateDatabase } = require('./database/db');
const { list, table, choices, questions } = require('./utils/questions');
const { prompt } = require('inquirer');


// Instantiating Object
const start = [ new list('list', 'Answer', 'Select an Option:', choices) ];


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
    .catch(error => { console.log(error); })
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


// Retrevies some information from a table in database
async function getData(i) {
    try {
        const data = await getInfoFromDatabaseAt(table[i]);
        console.table(data);
        promptChoices();
    }
    catch(error) {
        console.log(error);
    }
}


// Collects more data from the CEO, and creates CEO specified data in a table
async function getMoreInfoFromUser(index) {
    let i2;
    // if index is == to a number from 3-7 i2 = number thats equal to 3-7 - 3
    for(let i = 3; i < 8; i++) {
        if(index == i) {
            i2 = i - 3;
        }
    }
    prompt(await questions[i2])
    .then(req => sendRequest(Object.keys(req), Object.values(req), i2));
}


// Sends request to database to create or update more data
async function sendRequest(keys, values, i2) {
    try {
        if(i2 != 3 && i2 != 4 && i2 != 5) {
            // Creates data
            const response = await addToDatabase(table[i2], keys, values);
            console.log(response);
        }
        else {
            // Updates data
            const id = parseInt(values[0]);
            const columnName = [keys[keys.length - 1]];
            const value = [values[values.length - 1]];
            const response = await updateDatabase(table[2], columnName, value, id);
            console.log(response);
        }
        promptChoices();
    }
    catch(error) { console.log(error); }
}


// Allows the CEO to Keep the Program running until specified to 'quit'
function promptChoices() {
    console.log('\n');
    init();
}


// Starting Program
init();