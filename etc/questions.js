const options = require('./options.js');
const { checkSpecialCharacters, validateGithubUrl } = require('./validation.js');

const frontend = {
  type: 'list',
  name: 'frontend',
  message: 'Select the front end.',
  choices: ['React'],
};

const backend = {
  type: 'list',
  name: 'backend',
  message: 'Select the back end.',
  choices: ['Fastify'],
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

exports.mergeQuestions = function mergeQuestions(userInput) {
  let merge = [];
  if (userInput.setup.toLowerCase() === 'frontend') {
    merge = [{ ...gitHubFrontEndUrl }];
  }
  if (userInput.setup.toLowerCase() === 'backend') {
    merge = [{ ...gitHubBackEndUrl }];
  }
  if (userInput.setup.toLowerCase() === 'both') {
    merge = [{ ...gitHubFrontEndUrl }, { ...gitHubBackEndUrl }];
  }
  return merge;
};

exports.mergeAnswers = function mergeAnswers(input) {
  let merge = [];

  switch (input.setup.toLowerCase()) {
    case 'frontend':
      merge = { ...input, frontend: 'react' };
      return merge;
    case 'backend':
      merge = { ...input, backend: 'fastify' };
      return merge;
    case 'both':
      merge = { ...input, frontend: 'react', backend: 'fastify' };
      return merge;
    default:
      input;
  }
};
