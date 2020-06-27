const chalk=require('chalk');
const yargs=require('yargs');
const createApp=require('../scripts/createApp.js');
const option=yargs.argv._[0];
switch(option){
    case 'app':
        createApp();
        return;
    default:
        console.log(chalk.red('Do not recognize command'));

}