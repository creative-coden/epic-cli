const options = require('./options.js');
const { checkSpecialCharacters, validateGithubUrl } = require('./validation.js');

const frontEnd = {
  type: 'list',
  name: 'frontEnd',
  message: 'Select the front end',
  choices: options.frontEnd,
};

const backEnd = {
  type: 'list',
  name: 'backEnd',
  message: 'Select the back end',
  choices: options.backEnd,
};

const gitHubFrontEndUrl = {
  type: 'input',
  name: 'gitHubFrontEndUrl',
  message: 'Enter GitHub URL for FrontEnd',
  validate: function validate(input) {
    return validateGithubUrl(input);
  },
};

const gitHubBackEndUrl = {
  type: 'input',
  name: 'gitHubBackEndUrl',
  message: 'Enter GitHub URL for BackEnd',
  validate: function validate(input) {
    return validateGithubUrl(input);
  },
};

exports.appSetupQuestions = [
  {
    type: 'input',
    name: 'appName',
    message: 'Name your Application',
    validate: function validate(input) {
      return checkSpecialCharacters(input);
    },
  },
  {
    type: 'list',
    name: 'setUp',
    message: 'Choose your Application setup',
    choices: options.setUp,
  },
];

exports.mergeResponses = function mergeResponses(userInput) {
  let merge = [];
  if (userInput.setUp === 'FrontEnd') {
    merge = [{ ...frontEnd }, { ...gitHubFrontEndUrl }];
  }
  if (userInput.setUp === 'BackEnd') {
    merge = [ { ...backEnd }, { ...gitHubBackEndUrl }];
  }
  if (userInput.setUp === 'Both') {
    merge = [{ ...frontEnd }, { ...gitHubFrontEndUrl }, { ...backEnd }, { ...gitHubBackEndUrl }];
  }
  return merge;
};
