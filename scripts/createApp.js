const prompt = require('../etc/questions.js');
const inquirer = require('inquirer');
const springBootSetup = require('./springBootSetup.js');
const { runAppSetup } = require('./setup');

// git@bitbucket.org:username/reponame.git
module.exports = async function createApp() {
  try {
    let responses = {};
    let setup = await inquirer.prompt(prompt.appSetupQuestions);
    let appSetupAnswers = { ...setup };

    const config = prompt.mergeResponses(appSetupAnswers);
    const appConfigAnswers = await inquirer.prompt(config);
    responses = {
      ...appSetupAnswers,
      ...appConfigAnswers,
    };
    runAppSetup(responses);
  } catch (error) {
    console.error(error);
  }
};

