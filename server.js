// Declaring Variables
const { prompt } = require('inquirer');
const { getInfoFromDatabaseAt, addToDatabase, updateDatabase } = require('./database/db')


// Creating Questions class
class Question {
    constructor(type, name, message) {
        this.type = type || 'input';
        this.name = name;
        this.message = message;
    }
}


// Creating list class
class list extends Question {
    constructor(type, name, message, choices) {
        super(type, name, message);
        this.choices = choices;
    }
}


// Table Names
const table = ['Departments', 'Roles', 'Employees'];


// Starter questions to prompt user
const choices = [
    'View all Departments',
    'View all Roles',
    'View all Employees',
    'Add a Department',
    'Add a Role',
    'Add an Employee',
    'Update an Employee role',
    'Update an Employees Manager',
    'View Employees by Manager',
    'View Employees by Department',
    'Delete a Department',
    'Delate a Role',
    'Delete an Employee',
    'View total utilized budget of a department',
    'Quit'
]


// Instantiating Objects
const start = new list('list', 'Answer', 'Select an Option:', choices);


// Question to ask if user wants to add a department
const addDepartment = async () => {
    return [new Question(null, 'Name', 'What is your new Department name?')];
}


// Gets all employees from database and returns their names and id's
const getAllEmployeesAndID = async () => {
    let employees = [];
    const allEmployees = await getInfoFromDatabaseAt(table[2]);
    for(let employee of allEmployees) {
        employees.push(`${employee.id}: ${employee.Firstname} ${employee.Lastname}`);
    }
    return employees;
}


// Gets all employee roles from database and returns them
const getDataAtTable = async (index, i) => {
    let data = [];
    const allData = await getInfoFromDatabaseAt(table[index]);
    if(i == 1) {
        for(let row of allData) {
            data.push(row.Title);
        }
    }
    if(i == 2) {
        for(let row of allData) {
            data.push(row.Direct_Manager);
        }
    }
    if(i == 3) {
        for(let row of allData) {
            data.push(row.Department);
        }
    }
    if(i == 4) {
        for(let row of allData) {
            data.push(row.Department);
        }
    }
    return data;
}


// Question to ask if user wants to update an Employees Role
const updateEmployeeRole = async () => {
    const employee = new list('list', 'Employee', 'Which Employees role is changing?', await getAllEmployeesAndID());
    const newRole = new list('list', 'Job_Title', 'What is this Employees new role?', await getDataAtTable(1, 1));
    return [employee, newRole];
}


// Question to ask if user wants to update an Employees Manager
const updateEmployeeManager = async () => {
    const employee = new list('list', 'Employee', 'Which Employees Manager is changing?', await getAllEmployeesAndID());
    const newManager = new list('list', 'Direct_Manager', 'Who is this Employees new Manager?', await getDataAtTable(2, 2));
    return [employee, newManager];
}


// Question to ask if user wants to add a Role
const addRole = async () => {
    const roleTitle = new Question(null, 'Title', 'What is this new roles title?');
    const roleDepartment = new Question(null, 'Department', 'What department will this role belong to?');
    const roleSalary = new Question(null, 'Salary', 'What is the salary for this role?');
    return [roleTitle, roleDepartment, roleSalary];
}


// Question to ask if user wants to add an Employee
const addEmployee = async () => {
    const firstname = new Question(null, 'Firstname', 'What is the employees Firstname?');
    const lastname = new Question(null, 'Lastname', 'What is the employees Lastname?');
    const department = new list('list', 'Department', 'What department does this employee belong to?', await getDataAtTable(1, 3));
    const salary = new Question(null, 'Salary', 'What is this employees salary?');
    const jobTitle = new list('list', 'Job_Title', 'What is this employees job title?', await getDataAtTable(2, 2));
    const supervisor = new Question(null, 'Direct_Manager', 'Who is this employees direct supervisor?');
    return [firstname, lastname, department, salary, jobTitle, supervisor];
}


// Dynamic message prompts and getters
const questions = [addDepartment(), addRole(), addEmployee(), updateEmployeeRole(), updateEmployeeManager()];


// Prompts choices for the CEO to perform C.R.U.D operations, and manage company database
async function init() {
    prompt([start])
    .then(usersResponse => {
        for(let i = 0; i < choices.length; i++) {
            const answer = usersResponse.Answer;
            if(answer === choices[i]) {
                continuePrompt(i);
                break;
            }
        }
    })
    .catch(error => { console.log(error); })
}


// Validates the CEO's request
function continuePrompt(i) {
    console.log(i)
    switch (i) {
        case 0:
        case 1:
        case 2: getData(i); break;
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13: getMoreInfoFromUser(i); break;
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


// Allows the CEO to Keep the Program running until specified to 'quit'
function promptChoices() {
    console.log('\n');
    init();
}


// Collects more data from the CEO, and creates CEO specified data in a table
async function getMoreInfoFromUser(i) {
    let i2; 
    if(i == 3) i2 = 0;
    if(i == 4) i2 = 1;
    if(i == 5) i2 = 2;
    if(i == 6) i2 = 3;
    if(i == 7) i2 = 4;
    prompt(await questions[i2])
    .then(req => {
        sendRequest(Object.keys(req), Object.values(req), i, i2);
    })
}


// Sends request to database to create more data
async function sendRequest(keys, values, i, i2) {
    if(i2 != 3 && i2 != 4 && i2 != 5) {
        try {
            const response = await addToDatabase(table[i2], keys, values);
            console.log(response);
            promptChoices();
        }
        catch(error) {
            console.log(error);
        }
    }
    else {
        try {
            const id = parseInt(values[0]);
            const columnName = [keys[keys.length - 1]];
            const value = [values[values.length - 1]];
            const response = await updateDatabase(table[i - questions.length], columnName, value, id);
            console.log(response);
            promptChoices();
        }
        catch(error) {
            console.log(error);
        }
    }
}


// Starting Program
init();