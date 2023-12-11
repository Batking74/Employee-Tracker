// Declaring Variables
const { prompt } = require('inquirer');


// Creating Questions class
class Question {
    constructor(type, name, message) {
        this.type = type;
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


// Instantiating Objects
const question1 = new Question(null, null, null);


// Grouping Question objects together
const questions = [question1];


// Prompting questions for the user on what attributes the SVG should have
prompt(questions)
.then(usersResponse => {
    console.log(usersResponse);
})
.catch(error => {
    console.log(error);
})