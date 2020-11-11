const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function addManager(){
    inquirer.prompt([
            {
                type: "input",
                message: "What is your office number?",
                name: "office number"
            },
    ])
    }

function addEngineer(){
    inquirer.prompt([
            {
                type: "input",
                message: "What is your GitHub username?",
                name: "gitHub username"
            },
    ])
    }

function addIntern(){
    inquirer.prompt([
            {
                type: "input",
                message: "Which school are you currently attending or what was the last school you attended before you started the internship?",
                name: "school name"
            },
    ])
    }

function askQuestions(){
    inquirer.prompt(
        [
            {
                type: "list",
                message: "What type of team member are you adding to this team?",
                name: "selection",
                choices: ["manager", "engineer", "intern"]
            }
        ]
    )
    .then((response) => {
        switch (response.selection) {
            case "manager":
            addManager(response);
            break;

            case "engineer":
            addEngineer(response);
            break;

            case "intern":
            addIntern(response);
            break;
        }
        fs.writeFile(
            "./output/team.html",
            htmlTemplate(response),
            "utf-8",
            (err) => {
                err ? console.log(err) : console.log("success");
            }
        );
    });
}
askQuestions();



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

