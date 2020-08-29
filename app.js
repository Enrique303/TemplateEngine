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
          return "Please enter at least one character"
        }
      },
      {
        type: "input",
        name: "id",
        message:"What is the manager's id?",
        validate: function(answer) {
          if(answer !== "") {
            return true;
          }
          return "Please enter at least one character"
        }
      },
      {
        type: "input",
        name: "email",
        message: "what is the manager's email address?",
        validate: function(answer){
          const emailCheck = answer.match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})$/);
          if(emailCheck){
            return true;
          }
          return "please enter a valid eamil address"
        }
      },
      {
        type: "input",
        name: "officeNumber",
        message: "what is the manager's office number?",
        validate: function(answer) {
          if(answer !== "") {
            return true;
          }
          return "Please enter at least one character"
        }
      }
    ]
  ).then(function(answers){
    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    teamMembers.push(manager);
    addEmployees()
  });
}

function askIntern(){
  inquirer.prompt(
    [
      {
        type: "input",
        name: "name",
        message: "what is the inter's name?",
        validate: function(answer) {
          if(answer !== "") {
            return true;
          }
          return "Please enter at least one character"
        }
      },
      {
        type: "input",
        name: "id",
        message:"what is the inter's id?",
        validate: function(answer) {
          if(answer !== "") {
            return true;
          }
          return "Please enter at least one character"
        }
      },
      {
        type: "input",
        name: "email",
        message: "what is the intern's email address?",
        validate: function(answer){
          const emailCheck = answer.match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})$/);
          if(emailCheck){
            return true;
          }
          return "please enter a valid eamil address"
        }
      },
      {
        type: "input",
        name: "school",
        message: "what school is the intern attending?",
        validate: function(answer) {
          if(answer !== "") {
            return true;
          }
          return "Please enter at least one character"
        }
      }
    ]
  ).then(function(answers){
    const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
    teamMembers.push(intern);
    addEmployees()
  })
}

function askEngineer(){
  inquirer.prompt(
    [
      {
        type: "input",
        name: "name",
        message: "what is the engineer's name?",
        validate: function(answer) {
          if(answer !== "") {
            return true;
          }
          return "Please enter at least one character"
        }
      },
      {
        type: "input",
        name: "id",
        message:"what is the engineer's id?",
        validate: function(answer) {
          if(answer !== "") {
            return true;
          }
          return "Please enter at least one character"
        }
      },
      {
        type: "input",
        name: "email",
        message: "what is the engineer's email address?",
        validate: function(answer){
          const emailCheck = answer.match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})$/);
          if(emailCheck){
            return true;
          }
          return "please enter a valid eamil address"
        }
      },
      {
        type: "input",
        name: "github",
        message: "what is the engineer's Github username?",
        validate: function(answer) {
          if(answer !== "") {
            return true;
          }
          return "Please enter at least one character"
        }
      }
    ]
  ).then(function(answers){
    const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
    teamMembers.push(engineer);
    addEmployees()
  })
}

function addEmployees() {
  inquirer.prompt([{
    type: "list",
    name: "switch",
    choices: ["engineer","intern", "done"],
    message: "add employees?"
  }]).then(function(answer){
    switch(answer.switch){
      case "engineer":
        askEngineer()
        break;
      case "intern":
        askIntern()
        break;
      default:
        console.log("creating team")
        saveEmployees();
    }
  })
}

const saveEmployees = ()=> {
  if(!fs.existsSync(OUTPUT_DIR)){
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(outputPath, render(teamMembers), "utf-8")
}

askManager()