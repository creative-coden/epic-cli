const prompt = require('../etc/questions.js');
const inquirer = require('inquirer');
const springBootSetup = require('./springBootSetup.js');
const { facade } = require('./setup');

module.exports = async function createApp() {
  try {
    const answers = await inquirer.prompt(prompt.questions);
    const response = {
      appName: answers.appName,
      frontEnd: answers.frontEnd,
      backEnd: answers.backEnd,
    };
    facade(response);
  } catch (error) {
    console.error(error);
  }
};
