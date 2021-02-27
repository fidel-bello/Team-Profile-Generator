//node modules 
const inquirer = require("inquirer");
const fs = require("fs");

const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");
let teamArray = [];

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
 function addManager(){
     inquirer.prompt([
         {}
     ])
 }

startPrompts();