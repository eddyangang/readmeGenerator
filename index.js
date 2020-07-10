const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown.js")
const fs = require("fs");
var data;
var badges = [];
const questions = [{
        type: "input",
        message: "What is the Project Title?",
        name: "title"
    },
    {
        type: "input",
        message: "What is the Project Description?",
        name: "description"
    },
    {
        type: "input",
        message: "What is the installation description?",
        name: "install"
    },
    {
        type: "input",
        message: "Explain the usage of this Project",
        name: "usage"
    },
    {
        type: "list",
        message: "What licenses did you use?",
        name: "license",
        choices: ["MIT License", "ICS License", "Apache License", "GNU GPLv3", "None"]
    },
    {
        type: "input",
        message: "Are there any contributors for this project?",
        name: "contributors"
    },
    {
        type: "input",
        message: "How do you test this project?",
        name: "test"
    },
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "userName"
    },
    {
        type: "input",
        message: "What is your GitHub repository URL?",
        name: "url"
    },
    {
        type: "input",
        message: "Is there a link to the deployed site?",
        name: "site"
    },
    {
        type: "confirm",
        message: "Would you like to add a Badge URL?",
        name: "confirmBadge"
    }
];

function init() {
    console.log("Welcome to project Generate README.md");
    inquirer.prompt([{
            type: "list",
            message: "What would you like to do?",
            name: "option",
            choices: ["Generate a README.md", "Exit"]
        }])
        .then(function ({
            option
        }) {
            if (option === "Generate a README.md") askQuestions()
            else console.log("Goodbye!");
        }).catch((err) => {
            throw err
        })
}

function askQuestions() {
    inquirer.prompt(questions)
        .then((response) => {
            data = response;
            switch (response.license) {
                case "MIT License":
                    badges.push("https://img.shields.io/badge/License-MIT-brightgreen");
                    break;
                case "ICS License":
                    badges.push("https://img.shields.io/badge/License-ICS-brightgreen");
                    break;
                case "Apache License":
                    badges.push("https://img.shields.io/badge/License-Apache-blue");
                    break;
                case "GNU GPLv3":
                    badges.push("https://img.shields.io/badge/License-GNU%20GPLv3-red");
                    break;
                case "None":
                    break;
            }
            if (response.confirmBadge) addBadge();
            else writeToFile("README.md", generateMarkdown(response));
        }).catch((err) => {
            throw err
        })
}

function addBadge() {
    inquirer.prompt([{
            type: "input",
            message: "What is the Badge URL?",
            name: "badgeURL"
        }, {
            type: "confirm",
            message: "Add another badge?",
            name: "confirmBadge"
        }])
        .then((response) => {
            badges.push(response.badgeURL)
            if (response.confirmBadge) addBadge();
            else {
                writeToFile("README.md", generateMarkdown(data));
            }
        }).catch((err) => {throw err})
}


function writeToFile(fileName, data) {

    if (badges) {
        for (let i = 0; i < badges.length; i++) {
            fs.appendFileSync(fileName, `![](${badges[i]}) `, (err) => {
                if (err) throw err
            })
        }
    }

    fs.appendFile(fileName, "\n" + data, function (err, data) {
        if (err) throw err
        else console.log(data);
        console.log("README.md created!")
    })
}


init();