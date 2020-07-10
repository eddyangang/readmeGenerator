function generateMarkdown(data) {
  return `
# ${data.title}


### Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributors](#contributors)
- [Test](#test)
- [Questions](#questions)

## Description
${data.description}

## Installation
${data.install}
## Usage
${data.usage}

## License
${data.license}

## Contributors
${data.contributors}

## Test
${data.test}

## Questions
GitHub: [${userName}](${url})
Deployed Site: [here](${site})
`;
}

module.exports = generateMarkdown;
