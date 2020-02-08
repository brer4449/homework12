const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "veryeasypassword",
  database: "jobs_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  inquirer
    .prompt({
      name: "choice",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees by Department",
        "View All Employees by Manager",
        "Add Employee",
        "Update Employee Role"
      ]
    })
    .then(answer => {
      connection.query("SELECT * FROM employees", function(err, res) {
        if (err) throw err;
        console.table(res);
        console.log(answer.choice);
        //ADD THIS LATER!
        connection.end();
      });
    });
}
