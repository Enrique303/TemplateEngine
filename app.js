const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function askManager(){
  inquirer.prompt(
    [
      {
        type: "input",
        name: "name",
        message: "what is the managers name?",
        validate: function(answer) {
          if(answer !== "") {
            return true;
          }
          return "no empty spaces"
        }
      },
      {
        type: "input",
        name: "email",
        message: "what is your email address?",
      },
      {
        type: "input",
        name: "id",
        message:"?"
      },
      {
        type: "input",
        name: "officeNumber",
        message: "what is the office number?"
      }
    ]
  ).then(function(answers){
    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    teamMembers.push(manager)
  })
}

function askIntern(){
  inquirer.prompt(
    [
      {
        type: "input",
        name: "name",
        message: "",
      },
      {
        type: "input",
        name: "email",
        message: "what is your email address?",
      },
      {
        type: "input",
        name: "id",
        message:"?"
      },
      {
        type: "input",
        name: "school",
        message: ""
      }
    ]
  ).then(function(answers){
    const intern = new Intern(answers.name, answers.id, answers.email, answers.officeNumber);
    teamMembers.push(intern)
  })
}

function askEngineer(){
  inquirer.prompt(
    [
      {
        type: "input",
        name: "name",
        message: "",
      },
      {
        type: "input",
        name: "email",
        message: "what is your email address?",
      },
      {
        type: "input",
        name: "id",
        message:"?"
      },
      {
        type: "input",
        name: "github",
        message: ""
      }
    ]
  ).then(function(answers){
    const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
    teamMembers.push(engineer)
  })
}

function addEmployees() {
  inquirer.prompt([{
    type: "list",
    name: "switch",
    choices: ["engineer","intern","manager", "done"],
    message: "add employees?"
  }]).then(function(answer){
    switch(answer.switch){
      case "engineer":
        askEngineer()
    }
  })
}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
