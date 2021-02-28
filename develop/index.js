//node modules 
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const Engineer = require("./lib/engineer");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");
let teamArray = [];

//starting prompts
function startPrompts(){
    inquirer.prompt ([
        {
            message: "Let's get your tyeam going!",
            name: "teamname",
        }
    ]).then(function(data){
        const teamName = data.teamname
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
         const teamMember = new Manager (name, id, email, officeNumber)
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
        const id = teamArray.length + 1
        const name = data.name
        const email = data.email
        const github = data.github
        const teamMember = new Engineer(id, name, email, github)
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
    const htmlArray = []
    const htmlBeginning = 
    `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>${teamArray[0]}</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/c502137733.js"></script>
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 jumbotron mb-3 team-heading">
                <h1 class="text-center">${teamArray[0]}</h1>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="team-area col-12 d-flex justify-content-center">
            `
            htmlArray.push(htmlBeginning);
            for (let i = 1; i < teamArray.length; i++) {
                let object = 
                `
        <div class="member-card">
            <div class="card-top">
                <h2>${teamArray[i].name}</h2>
                <h2>${teamArray[i].title}</h2>
            </div>
            <div class="card-bottom">
                <p>Employee ID: ${teamArray[i].id}</p>
                <p>Email: <a href="mailto:${teamArray[i].email}">${teamArray[i].email}</a>></p>
        `
        if (teamArray[i].officeNumber) {
            object += `
            <p>${teamArray[i].officeNumber}</p>
            `
        }
        if (teamArray[i].github) {
            object += `
            <p>GitHub: <a href="https://github.com/${teamArray[i].github}">${teamArray[i].github}</a></p>
            `
        }
        if (teamArray[i].school) {
            object += `
            <p>School: ${teamArray[i].school}</p>
            `
        }
        object += `
        </div>
        </div>
        `
        htmlArray.push(object)
    }

    const htmlEnd = `
    </div>
    </body>
    </html>
    `
    htmlArray.push(htmlEnd);

    fs.writeFile(`./generated-html/${teamArray[0]}.html`, htmlArray.join(""), function (err) {
        
    })
}
startPrompts();