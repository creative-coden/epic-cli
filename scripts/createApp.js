const prompt = require('../etc/questions.js');
const inquirer = require('inquirer');
const springBootSetup = require('./springBootSetup.js');
const { facade } = require('./setup');

module.exports = async function createApp() {
  try {
    let responses = {};
    const introAnswers = await inquirer.prompt(prompt.introQuestions);
    responses = {...introAnswers};
    const merge = prompt.mergeResponses(responses);
    const secondaryUserResponses = await inquirer.prompt(merge);
    console.log("secondaryUserResponses",secondaryUserResponses);
    //facade(response);
  } catch (error) {
    console.error(error);
  }
};
