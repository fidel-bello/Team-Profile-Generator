//node modules
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern")
const inquirer = require("inquirer");
const fs = require("fs")
const path = require("path");
const fs = require("fs");

//directory path for the output
const OUTPUT_DIR = path.resolve(__dirname, "dist");
const OutputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./src/htmlrender");

