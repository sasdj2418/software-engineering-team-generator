const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var employees = [];
var manager, engineer, intern;
function addManager(){
    inquirer.prompt([
            {
                type: "input",
                message: "What is your name?",
                name: "name"
            },
            {
                type: "input",
                message: "What is your ID?",
                name: "id"
            },
            {
                type: "input",
                message: "What is your email?",
                name: "email"
            },
            {
                type: "input",
                message: "What is your office number?",
                name: "officeNumber"
            }
    ]).then((res) => {
        manager = new Manager(res.name, res.id, res.email, res.officeNumber);
        employees.push(manager);
        askAddEmployee();
    })
    }

function addEngineer(){
    inquirer.prompt([
            {
                type: "input",
                message: "What is your name?",
                name: "name"
            },
            {
                type: "input",
                message: "What is your ID?",
                name: "id"
            },
            {
                type: "input",
                message: "What is your email?",
                name: "email"
            },
            {
                type: "input",
                message: "What is your GitHub username?",
                name: "github"
            }
    ]).then((res) => {
        engineer = new Engineer(res.name, res.id, res.email, res.github);
        employees.push(engineer);
        askAddEmployee();
    })
    }

function addIntern(){
    inquirer.prompt([
            {
                type: "input",
                message: "What is your name?",
                name: "name"
            },
            {
                type: "input",
                message: "What is your ID?",
                name: "id"
            },
            {
                type: "input",
                message: "What is your email?",
                name: "email"
            },
            {
                type: "input",
                message: "Which school are you currently attending or what was the last school you attended before you started the internship?",
                name: "school"
            }
    ]).then((res) => {
        intern = new Intern(res.name, res.id, res.email, res.school);
        employees.push(intern);
        askAddEmployee();
    })
    }

function askQuestions(){
    inquirer.prompt(
        [
            {
                type: "list",
                message: "What type of team member are you adding to this team?",
                name: "selection",
                choices: ["Manager", "Engineer", "Intern"]
            }
        ]
    )
    .then((response) => {
        switch (response.selection) {
            case "Manager":
            addManager();
            break;

            case "Engineer":
            addEngineer();
            break;

            case "Intern":
            addIntern();
            break;
        }
    });
}
askQuestions();

function askAddEmployee() {
    inquirer.prompt(
        [
            {
                type: "confirm",
                message: "Do you want to add other employees?",
                name: "add",
                default: false
            }
        ]
    )
    .then((response) => {
        if(response.add){
            askQuestions();
        } else {
            fs.writeFile(
                "./output/team.html",
                render(employees),
                "utf-8",
                (err) => {
                    err ? console.log(err) : console.log("success");
                }
            );
        }
    });
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

