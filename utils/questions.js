// Declaring Variables
const { getInfoFromDatabaseAt } = require('../database/db');


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


// // Starter questions to prompt user
const choices = [
    'View all Departments',
    'View all Roles',
    'View all Employees',
    'Add a Department',
    'Add a Role',
    'Add an Employee',
    'Update an Employee role',
    'Update an Employees Manager',
    'Quit'
]


// Question to ask if user wants to add a department
const addDepartment = () => {
    return [ new Question(null, 'Name', 'What is your new Department name?') ];
}


// Question to ask if user wants to update an Employees Role
const updateEmployeeRole = async () => {
    try {
        const choices1 = await getAllEmployeesAndID();
        const choices2 = await getDataAtTable(1, 1);
        return [
            new list('list', 'Employee', 'Which Employees role is changing?', choices1),
            new list('list', 'Role_ID', 'What is this Employees new role?', choices2)
        ]
    }
    catch(error) { console.log(error) }
}


// Question to ask if user wants to update an Employees Manager
const updateEmployeeManager = async () => {
    try {
        const choices1 = await getAllEmployeesAndID();
        const choices2 = await getDataAtTable(2, 2);
        return [
            new list('list', 'Employee', 'Which Employees Manager is changing?', choices1),
            new list('list', 'Direct_Manager', 'Who is this Employees new Manager?', choices2)
        ]
    }
    catch(error) { console.log(error) }
}


// Question to ask if user wants to add a Role
const addRole = async () => {
    try {
        const choices = await getDataAtTable(0, 3);
        return [
            new Question(null, 'Title', 'What is this new roles title?'),
            new list('list', 'Department_ID', 'What department will this role belong to?', choices),
            new Question(null, 'Salary', 'What is the salary for this role?')
        ]  
    }
    catch(error) { console.log(error) }
}


// Question to ask if user wants to add an Employee
const addEmployee = async () => {
    try {
        const choices2 = await getDataAtTable(1, 1);
        const choices3 = await getDataAtTable(2, 2);
        return [
            new Question(null, 'Firstname', 'What is the employees Firstname?'),
            new Question(null, 'Lastname', 'What is the employees Lastname?'),
            new list('list', 'Role_ID', 'What is this employees job title?', choices2),
            new Question(null, 'Salary', 'What is this employees salary?'),
            new list('list', 'Direct_Manager', 'Who is this employees direct supervisor?', choices3)
        ]
    }
    catch(error) { console.log(error) }
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

    for(let row of allData) {
        switch(i) {
            case 1: data.push(row.Title); break;
            case 2: data.push(row.Direct_Manager); break;
            case 3: data.push(row.Name); break;
            default: console.log(`${i} is Not a valid i`);
        }
    }
    return data;
}

// Dynamic message prompts and getters
const questions = [addDepartment(), addRole(), addEmployee(), updateEmployeeRole(), updateEmployeeManager()];


// Exporting Modules
module.exports = { questions, list, table, choices }