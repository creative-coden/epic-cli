const options = require('./options.js');
const { checkSpecialCharacters, validateGithubUrl } = require('./validation.js');

const frontEnd = {
  type: 'list',
  name: 'frontEnd',
  message: 'Select the front end.',
  choices: options.frontEnd,
};

const backEnd = {
  type: 'list',
  name: 'backEnd',
  message: 'Select the back end.',
  choices: options.backEnd,
};

const gitHubFrontEndUrl = {
  type: 'input',
  name: 'gitHubFrontEndUrl',
  message: 'Enter GitHub URL for front end application.',
  validate: function validate(input) {
    return validateGithubUrl(input);
  },
};

const gitHubBackEndUrl = {
  type: 'input',
  name: 'gitHubBackEndUrl',
  message: 'Enter GitHub URL for back end application.',
  validate: function validate(input) {
    return validateGithubUrl(input);
  },
};

exports.appSetupQuestions = [
  {
    type: 'input',
    name: 'appName',
    message: 'Enter name for the application.',
    validate: function validate(input) {
      return checkSpecialCharacters(input);
    },
  },
  {
    type: 'list',
    name: 'setup',
    message: 'Choose application setup.',
    choices: options.setup,
  },
];

exports.mergeResponses = function mergeResponses(userInput) {
  let merge = [];
  if (userInput.setup.toLowerCase() === 'frontend') {
    merge = [{ ...frontEnd }, { ...gitHubFrontEndUrl }];
  }
  if (userInput.setup.toLowerCase() === 'backend') {
    merge = [ { ...backEnd }, { ...gitHubBackEndUrl }];
  }
  if (userInput.setup.toLowerCase() === 'both') {
    merge = [{ ...frontEnd }, { ...gitHubFrontEndUrl }, { ...backEnd }, { ...gitHubBackEndUrl }];
  }
  return merge;
};
