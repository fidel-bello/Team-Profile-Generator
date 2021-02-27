//node modules 
const inquirer = require("inquirer");
const fs = require("fs");

const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");
let teamArray = [];

//starting prompts
function startPrompts(){
    inquirer.prompt ([
        {
            message: "Let's get your tyeam going!",
            name: "teamName",
        }
    ]).then(function(data){
        const teamName = data.teamName
        teamArray.push(teamName);
        addManager()
    })
}
// add manager
 function addManager(){
     inquirer.prompt([
         {
             message: "What is the manager's name?",
             name: "name"
         },
         {
            message: "What is the Manager's email address?",
            name: 'email'
         },
         {
             type: "number",
             message: "What is the manager's office number?",
             name: "officeNumber",

         }
     ]).then(function(data) {
         const name = data.name
         const id = 1
         const email = data.email
         const officeNumber = data.officeNumber
         const teamMember = new Manager (name, email, officeNumber, id)
         teamArray.push(teamMember)
        addMembers()
     })
 }
// add team members prompts
function addMembers(){
    inquirer.prompt([
        {
            type: "list",
            message: "Would like to add other employees?",
            choices: [
                "add engineer",
                "add intern",
                "I'm finished!"
            ],
            name: "addMembers"
        }
        
    ]).then(function(data){
        switch (data.addMembers) {
            case "add engineer":
                addEngineer()
                break;
            case "add intern":
                addIntern()
                break;
            case "I'm finished!":
                createHtml();
                break;
        }
    })
}

function addEngineer() {
    inquirer.prompt([
        {
            message: "What is the engineer's name?",
            name: "name"
        },
        {
            message: "What is the engineer's email?",
            name: "email"
        },
        {
            message: "What is the engineer's github?",
            name: "github"
        }
    ]).then(function(data){
        const name = data.name
        const email = data.email
        const github = data.github
        const id = teamArray.length + 1
        const teamMember = new Engineer(name, id, email, github)
        teamArray.push(teamMember);
        addMembers()
    })
}

function addIntern(){
    inquirer.prompt([
        {
            message: "what is the intern's name?",
            name: "name",
        },
        {
            message: "What is the intern's email?",
            name: "email",
        },
        {
            message: "Where did the intern attend school?",
            name: "school"
        }
    ]).then(function(data){
        const name = data.name
        const id = teamArray.length + 1
        const email = data.email
        const school = data.school
        const teamMember = new Intern(name, id, email, school)
        teamArray.push(teamMember)
        addMembers();
    });
}
function createHtml(){
    console.log("Success!")
}
startPrompts();