const prompt = require('../etc/questions.js');
const inquirer = require('inquirer');
const springBootSetup = require('./springBootSetup.js');
const { facade } = require('./setup');

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
    console.log(responses, 'final outcome');
    //facade(response);
  } catch (error) {
    console.error(error);
  }
};
