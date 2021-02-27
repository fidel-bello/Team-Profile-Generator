//node modules
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern")
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//directory path for the output
const OUTPUT_DIR = path.resolve(__dirname, "dist");
const OutputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./src/htmlrender");

const idArray = []
const teamMembers = []

// prompted questions begin
function startPrompt(){
    // function to add manager
    function makeManager(){
        console.log("Let's build your team!");
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is the manager's name?",
            },
            {
                type: "input",
                name : "managerid",
                message: "what is the manager's id",
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the manager's email?",
            },
            {
                type: "input",
                name: "managerOffice",
                message: "What is the manager's office nmuber?",
            }
        ]).then(res => {
            const manager = new Manager (res.managerName, res.managerID, res.managerEmail, res.managerOfficeNumber);
            teamMembers.push(manager);
            idArray.push(res.managerID);
            createElse()
        })
    }

    function createElse() {
        inquirer.prompt([
            {
                type: "list",
                name: "employeeChoice",
                choices: [
                    "Engineer",
                    "Intern",
                    "I'm finished"
                ]
            }
        ]).then(choice => {
            switch (choice.memberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Inern":
                    addInern();
                    break;
                default:

            }
        })
}
function createEngineer {
    inquirer.prompt ([
        {
            type: "input",
            name: "engineerName",
            message: "What is the name of the engineer?"
        }
        {
            type: "input",
            name: "engineerID",
            message: "What is the engineer's id?"
        }
        {
            type: "input",
            name: "engineerEmail",
            message: "What is the engineer's email?"
        }
        {
            type: "input",
            name: "engineerGithub?",
            message: "What is the engineer's github?"
        }
    ]).then(choice => {
        const engineer = new Engineer (choice.engineerName, choice.engineerID, choice.engineerEmail, choice.egineerGithub);
        teamMembers.push(engineer);
        idArray.push(choice.engineerID);
        createElse();
    })
}
    //cb function
    makeManager()
}
// cb function
startPrompt()