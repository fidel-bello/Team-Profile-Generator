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

function addMembers(){}
startPrompts();