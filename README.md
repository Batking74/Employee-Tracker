# Employee Tracker

![Image of Nazirs Employee Tracker Project](./Assets/Employee-Tracker%20-%2012_14_2023.webp)

# Description
Employee Tracker is a command-line application tailored for SQL-based management of your company and employees. It enables smooth execution of C.R.U.D operations, allowing you to navigate and manipulate your database efficiently. With an intuitive interface, dynamic prompts, and consistent naming conventions, Employee Tracker simplifies tasks like viewing and managing departments, roles, and employees. The application prioritizes data integrity and security, featuring robust error handling and parameterized queries for enhanced protection against SQL injection attacks. Ideal for CEOs and HR professionals, Employee Tracker provides a secure and streamlined solution for effective company and employee data management.

![Image of Nazirs Employee Tracker Project Schema](./Assets/Employee-Tracker%20Schema%20-%2012_14_2023.webp)

- Motivation: I was motivated to build Employee Tracker to practice simplifying company and employee management using SQL. This project facilitates C.R.U.D operations, and demonstrates my skills in preventing SQL injection and data sanitation.

- Reason for Building: I was motivated to build Employee Tracker as part of my journey to create another cool project utilizing SQL.

- What I Learned: This project sharpened my skills in CLI design, comprehensive database management, and C.R.U.D operations. I gained insights into data security, dynamic prompts, naming conventions, and robust error handling/data stanitation. The project reinforced my understanding of database security with parameterized queries as well.



### Usage

1. Initiate npm using the following command:
```bash
npm init -y
```

2. Install the required Node.js modules:
```bash
npm i fs inquirer@8.2.4 mysql2 dotenv
```


3. Run the application by executing either of the following commands:
```bash
node server.js <OR> npm start
```

## Technologies Used
- JavaScript
- Node.js
- SQL

## Dependencies
- inquirer
- dotenv
- mysq2

## Tests
```bash
 PASS  tests/questions.test.js
  Question Class Instantiation Test
    √ Should return an object containing the type, name, and message values (3 ms)
  List Class Instantiation Test
    √ Should return an Array-object containing the type, name, message, and choices values (5 ms)
    Test Suites: 1 passed, 1 total
    Tests:       2 passed, 2 total
    Snapshots:   0 total
    Time:        0.548 s, estimated 1 s
    Ran all test suites matching /tests\\questions.test.js/i.
```

Video of Application: https://www.youtube.com/watch?v=4ukkirWouOk

GitHub Repo: https://github.com/Batking74/Employee-Tracker