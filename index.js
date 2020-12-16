
const mysql = require('mysql2/promise');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { async } = require('q');
const Choice = require('inquirer/lib/objects/choice');
const { connect, getUnpackedSettings } = require('http2');



async function DBConnection() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'gizagiza1948',
        database: 'employee_db',
    });
    return connection
}

function quit() {
    console.log()
    console.log("**********************************")
    console.log("***** Thank you for visiting *****")
    console.log("**********************************")
    console.log()
}

async function AllEmployees() {
    const connection = await DBConnection()
    const [rows, fields] = await connection.execute(
        `select employee.id, employee.first_name, employee.last_name, role.title, role.salary
        from department
        inner join role on role.department_id = department.id
        inner join employee on role.id = employee.role_id`
    );
    await connection.end();
    console.table(rows)
    setTimeout(() => {
        promptUser()
    }, 1000);
}

async function byDepartment() {
    const connection = await DBConnection()
    const [rows, fields] = await connection.execute(
        `select employee.id, employee.first_name, employee.last_name, role.title, department.department
        from department
        inner join role on role.department_id = department.id
        inner join employee on role.id = employee.role_id`
    );
    await connection.end();
    console.table(rows)
    setTimeout(() => {
        promptUser()
    }, 1000);
}

/**view by manager */
async function ByManager() {
    const connection = await DBConnection()
    const [rows, fields] = await connection.execute(
        `select employee.id, employee.first_name, employee.last_name, role.title, employee.manager_id
        from department
        inner join role on role.department_id = department.id
        inner join employee on role.id = employee.role_id
        `
    );
    await connection.end();
    console.table(rows)
    setTimeout(() => {
        promptUser()
    }, 1000);
}

/**adding employee **************/
async function employeeToAdd(employeeInfo) {
    // console.log(employeeInfo.first)
    // console.log(employeeInfo.last)
    // console.log(employeeInfo.role)
    let role = 0
    if (employeeInfo.role == "Professor of Philosophy") {
        role = 1;
    }
    if (employeeInfo.role == "Visiting Assistant Professor") {
        role = 2;
    }
    if (employeeInfo.role == "Lectuer") {
        role = 3;
    }
    if (employeeInfo.role == "Adjunct Faculty") {
        role = 4;
    }
    const connection = await DBConnection()
    const rows = await connection.execute(
        `
        insert into employee(first_name, last_name, role_id, manager_id)
        values
        ('${employeeInfo.first}', '${employeeInfo.last}', ${role}, 2);
        `
    );
    await connection.end();
    setTimeout(() => { console.log() }, 900);
    setTimeout(() => { console.log("************************************************") }, 900);
    setTimeout(() => { console.log("******** the Employee has been added ***********") }, 900);
    setTimeout(() => { console.log("************************************************") }, 900);
    setTimeout(() => { console.log() }, 900);

    setTimeout(() => {
        promptUser()
    }, 1000);
}


async function addEmployee() {
    await inquirer.prompt([
        {
            type: "text",
            name: "first",
            message: "Employee's First Name: "
        },
        {
            type: "text",
            name: "last",
            message: "Employee's Last Name: "
        },
        {
            type: "list",
            name: "role",
            message: "Employee's Role: ",
            choices: [
                "Professor of Philosophy",
                "Visiting Assistant Professor",
                "Lectuer",
                "Adjunct Faculty"
            ]
        },
    ])
        .then((newEmployee) => {
            employeeToAdd(newEmployee)
        })
}


async function EmployeeToDelete(emp_id) {
    // const id = emp_id.employee_id
    const connection = await DBConnection()
    await connection.execute(
        `
        delete from employee
        where id = ${emp_id};
        `
    );
    await connection.end();
    setTimeout(() => { console.log() }, 900);
    setTimeout(() => { console.log("************************************************") }, 900);
    setTimeout(() => { console.log("******** the Employee has been deleted ***********") }, 900);
    setTimeout(() => { console.log("************************************************") }, 900);
    setTimeout(() => { console.log() }, 900);

    setTimeout(() => {
        promptUser()
    }, 1000);
}

/**********deleting employee */
async function deleteEmployee() {
    const connection = await DBConnection()
    const [rows, fields] = await connection.execute(
        `SELECT id, first_name,last_name FROM employee`
    );
    await connection.end();
    // console.log(rows)
    let myArray = []

    for (let i = 0; i < rows.length; i++) {
        // console.log(emp_info[i].first_name)
        myArray.push(rows[i].id + "-" + rows[i].first_name + " " + rows[i].last_name)
    }
    inquirer.prompt({
        type: "list",
        name: "employee_id",
        message: "which employee you would like to remove? ",
        choices: myArray
    }).then((userChoice) => {
        // console.log(userChoice)
        const emp_id = userChoice.employee_id.split("-")[0]
        EmployeeToDelete(emp_id)
    });
}



/****************updating employee role */
// async function updateRole() {
//     const connection = await DBConnection()
//     const [rows, fields] = await connection.execute(
//         // this is showing employee name only.
//         `select id, first_name, last_name from employee`
//     );

//     await connection.end();
//     let myArray = []
//     for (let i = 0; i < rows.length; i++) {
//         myArray.push(rows[i].id + " " + rows[i].first_name + " " + rows[i].last_name)
//     }
//     // console.log(myArray)

//     await inquirer.prompt({
//         type: 'list',
//         name: 'employee_name',
//         message: "which employee would you like to update?",
//         choices: myArray

//     }).then((employeeId) => {
//         console.log(employeeId)

//     });

//     const roleInfo = await rolePick()
//     console.log(roleInfo[0].role)

//     // updatingRole(emp_id, role_id)
// }

// /****the role picked  */
// async function rolePick() {
//     const connection = await DBConnection()
//     const [rows, fields] = await connection.execute(
//         `select  id, title from role`
//     );
//     // console.log(rows)

//     await connection.end();
//     let myPick = []
//     for (let i = 0; i < rows.length; i++) {
//         myPick.push(rows[i].id + " " + rows[i].title)

//     }

//     let userPick = []
//     await inquirer.prompt({
//         type: "list",
//         name: "role",
//         message: "Which role would you like to choose?",
//         choices: myPick
//     }).then((pick) => {
//         userPick.push(pick)
//     })
//     return userPick

// }

async function promptUser() {
    inquirer.prompt({
        type: "list",
        name: "pick",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "Quit"
        ]
    }).then((userChoice => {
        switch (userChoice.pick) {
            case "View All Employees":
                AllEmployees();
                break;
            case "View All Employees by Department":
                byDepartment();
                break;
            case "View All Employees by Manager":
                ByManager();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Remove Employee":
                deleteEmployee();
                break;
            // case "Update Employee Role":
            //     updateRole();
            //     break;
            case "Update Employee Manager":
                upadteEmployeeManager();
                break;
            default:
                quit();

        }
    })
    )
}

promptUser()


