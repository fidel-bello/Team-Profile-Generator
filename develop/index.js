//node modules 
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile)
//lib modules
const Engineer = require("./lib/engineer");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");

let employees = []

const validate = {
    required: input => input !== ''? true : "This field is required.",
    name: input => input !== '' ? true : "Please enter a name.",
    id: input => Number.isInteger(Number(input)) && Number (input) > 0 ? true : "Please enter a number.",
    email: input => input.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+\@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi) ? true : "Enter a valid Email address."
    
}

//starting prompts
const questions = {
    type: function() {
        return {
            message: "Which Employee would you like to add?",
            type: "list",
            name: "member",
            choices: ["Engineer", "Intern", "I'm finished!"]

        }
    },
    item: function(member, variable, item = variable, validate) {
        return {
            message: `What is the ${member.toLowerCase()}'s ${item}? `,
            type: "input",
            validate: validate
        }
    }
}

async function addRole (member) {
    let { name } = await inquirer.prompt(questions.item(member, "name", "full name", validate.name));
    let { id } = await inquirer.prompt(questions.item(member, "id", "ID number", validate.id));
    let { email } = await inquirer.prompt(questions.item(member, "email", "email address", validate.email));
switch (member) {
    case "Manager":
        let {officeNumber} = await inquirer.prompt(questions.item(member, "officeNumber", "office phone number", validate.required));
        employees.push(new Manager(name. id, email, officeNumber));
        break;

    case "Engineer":
        let {github} = await inquirer.prompt(questions.item(member, "github", "Github username", validate.required));
        employees.push(new Engineer(name, id, email, github));
        break;

    case "Intern":
   let { school } = await inquirer.prompt(questions.item(member, "school", "school", validate.required)); 
   employees.push(new Intern(name, id, email, school));
   break;
}
}
 async function init() {
     console.log("Let's get started!");
     await addRole("Manager");
     let member = "";
     let exit = "I'm finished!";
     while (member != exit) {
         let { member} = await inquirer.prompt(questions.type());
         if (member === exit) {
             return createHtml();
         }
         await addRole(member);
     }
 }
 init();