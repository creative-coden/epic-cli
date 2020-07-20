const prompt=require('../etc/questions.js');
const inquirer=require('inquirer');
const springBootSetup=require('./springBootSetup.js');

module.exports=async function createApp(){
    try{
        const answers=await inquirer.prompt(prompt.questions);
        const response={
            appName:answers.appName,
            frontEnd:answers.frontEnd,
            backEnd:answers.backEnd
        }
        console.log(response);
        if(response!=null && response.backEnd === 'Spring Boot'){
            springBootSetup(response.appName);
        }
    }catch(error){
        console.error(error);        
    }
}