const inquier = require("inquirer")
const fs = require("fs")

function startup (){
    console.log("Welcome to project Generate README.");
    inquier.prompt([{
        type: "input",
      message: "What is your user name?",
      name: "username"
    }])
}