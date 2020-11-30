const options = require('./options.js');
const { checkSpecialCharacters, validateGithubUrl } = require('./validation.js');

const frontend = {
  type: 'list',
  name: 'frontend',
  message: 'Select the front end.',
  choices: options.frontend,
};

const backend = {
  type: 'list',
  name: 'backend',
  message: 'Select the back end.',
  choices: options.backend,
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
      return checkSpecialCharacters(input.toLowerCase());
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
    merge = [{ ...frontend }, { ...gitHubFrontEndUrl }];
  }
  if (userInput.setup.toLowerCase() === 'backend') {
    merge = [{ ...backend }, { ...gitHubBackEndUrl }];
  }
  if (userInput.setup.toLowerCase() === 'both') {
    merge = [{ ...frontend }, { ...gitHubFrontEndUrl }, { ...backend }, { ...gitHubBackEndUrl }];
  }
  return merge;
};
