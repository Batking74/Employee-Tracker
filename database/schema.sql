-- CREATE DATABASE naztechsolutions;
-- Creating Departments Table
-- CREATE TABLE Departments (
--     id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
--     Name VARCHAR(255) NOT NULL UNIQUE
-- )


-- Creating Roles Table
-- CREATE TABLE Roles (
--     id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
--     Title VARCHAR(255) NOT NULL UNIQUE,
--     Department_ID INT NOT NULL,
--     Salary VARCHAR(255) NOT NULL,
--     FOREIGN KEY (Department_ID) REFERENCES Departments(id)
-- )


-- Creating Employees Table
CREATE TABLE Employees (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    Firstname VARCHAR(255) NOT NULL,
    Lastname VARCHAR(255) NOT NULL,
    Role_ID INT,
    Salary VARCHAR(255) NOT NULL,
    Direct_Manager VARCHAR(255),
    FOREIGN KEY (Role_ID) REFERENCES Roles(id)
)


-- SELECT Employees.Firstname, Employees.Lastname, Employees.Salary, Employees.Direct_Manager, Roles.Title, Departments.Name AS Department_Name FROM Employees JOIN Roles ON Employees.Role_ID = Roles.id JOIN Departments ON Departments.id = Roles.Department_ID;
