const options = require('./options.js');
const { checkSpecialCharacters } = require('./appNameValidation.js');

exports.questions = [
  {
    type: 'input',
    name: 'appName',
    message: 'Name your Application',
    validate: function validate(input){
        return checkSpecialCharacters(input);
    }
  },
  {
    type: 'list',
    name: 'frontEnd',
    message: 'Select the FrontEnd',
    choices: options.frontEnd,
  },
  {
    type: 'list',
    name: 'backEnd',
    message: 'Select the BackEnd',
    choices: options.backEnd,
  },
];
