// Declaring Variables
const { prompt } = require('inquirer');
const { getInfoFromDatabaseAt, addToDatabase } = require('./database/db')


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


// Starter questions to prompt user
const choices = [
    'View all Departments',
    'View all Roles',
    'View all Employees',
    'Add a Department',
    'Add a Role',
    'Add an Employee',
    'Update an Employee role',
    'Quit'
]


// Instantiating Objects
const start = new list('list', 'Answer', 'Select an Option:', choices);


// Question to ask if user wants to add a department
const addDepartment = new Question(null, 'DepartmentName', 'What is your new Department name?');

// Question to ask if user wants to update an Employees Role
const updateEmployeeRole = new Question(null, 'NewRole', 'What is this Employees new role?');


// Question to ask if user wants to add a Role
const roleTitle = new Question(null, 'RoleTitle', 'What is this new roles title?');
const roleDepartment = new Question(null, 'RoleDepartment', 'What department will this role belong to?');
const roleSalary = new Question(null, 'RoleSalary', 'What is the salary for this role?');
const addRole = [roleTitle, roleDepartment, roleSalary];


// Question to ask if user wants to add an Employee
const fullname = new Question(null, 'FullName', 'What is the employees fullname? (Ex: John Simmons)');
const department = new Question(null, 'Department', 'What department does this employee belong to?');
const salary = new Question(null, 'Salary', 'What is this employees salary?');
const jobTitle = new Question(null, 'JobTitle', 'What is this employees job title?');
const supervisor = new Question(null, 'Supervisor', 'Who is this employees direct supervisor?');
const addEmployee = [fullname, jobTitle, department, salary, supervisor];


// Dynamic message prompts and getters
const questions = [[addDepartment], addRole, addEmployee, [updateEmployeeRole]];
const table = ['Departments', 'Roles', 'Employees'];


// Prompts choices for the CEO to perform C.R.U.D operations, and manage company database
function init() {
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
    switch (i) {
        case 0:
        case 1:
        case 2: getData(i); break;
        case 3:
        case 4:
        case 5:
        case 6: getMoreInfoFromUser(i); break;
        default: break;
    }
}


// Retrevies some information from a table in database
async function getData(i) {
    try {
        const data = await getInfoFromDatabaseAt(table[i]);
        console.log(data);
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
function getMoreInfoFromUser(i) {
    if(i == 3) i = 0;
    if(i == 4) i = 1;
    if(i == 5) i = 2;
    if(i == 6) i = 3;
    prompt(questions[i]).then(req => {
        sendRequest(req, i);
    })
}


// Sends request to database to create more data
async function sendRequest(req, i) {
    try {
        const response = await addToDatabase(table[i], req);
        console.log(response);
        promptChoices();
    }
    catch(error) {
        console.log(error);
    }
}


// Starting Program
init();