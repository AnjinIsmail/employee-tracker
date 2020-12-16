# Employee Tracker

## Description
The overall purpose is to build a commnad-line application to manage a company's employee database using Node.js, inquirer and MySQL.
This is specific for a business owner who wants to view and manage the departments, roles and employees in their company. 

## Usage - 
The user is given a command- line application that accepts their inputs. The following is expected: 
- once the user start the application, they are preented with the following options:
  - view all departments
  - view all roles
  - viewl all employees
  - add a department 
  - add a role
  - add an employee
  - update an employee role
- if chosen to view all departments, then they are presented with a formtted table showing department names and department ids
- if chosen to view all roles, they are presented with the job title, role id, the department that role bleongs to, and the salary for that role
- if chosen to view all employees, they are presented with a formatted table showing employee data, including emplyee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
- if chosen to add a department, then they are prompted to enter the name of the department and that department is added to the database 
- if chosen to add a role, they are then prompted to enter the name, salary, and department and for that role and that role is added to the database 
- if chosen to add an employee, then they are prompted to enter the employee's first name, last name, role, and manager and that employee is added to the database 
- if chosen to update an employee's role, then they are prompted to select an employee to update and their new role and this information is updated in the database.

## Mock up
The followig video/animation shows an exmaple of the applicantion being used from the CLI:
<iframe src="https://drive.google.com/file/d/1a5-WqLYukeBxLh_ezGvmgdsslRyXBNIB/preview" width="640" height="480"></iframe>
