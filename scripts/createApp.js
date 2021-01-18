const prompt = require('../etc/questions.js');
const inquirer = require('inquirer');
const { runAppSetup } = require('./setup');

// git@bitbucket.org:username/reponame.git
module.exports = async function createApp() {
  const { appSetupQuestions, mergeQuestions, mergeAnswers } = prompt;
  try {
    let responses = {};
    let setup = await inquirer.prompt(appSetupQuestions);
    let appSetupAnswers = { ...setup };

    const config = mergeQuestions(appSetupAnswers);
    const appConfigAnswers = await inquirer.prompt(config);
    responses = {
      ...appSetupAnswers,
      ...appConfigAnswers,
    };
    let answers = mergeAnswers(responses);
    answers = {
      ...answers,
      rootDirectory: process.cwd(),
    };
    runAppSetup(answers);
  } catch (error) {
    console.error(error);
  }
};
