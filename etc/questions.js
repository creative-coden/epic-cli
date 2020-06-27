const options=require('./options.js');

exports.questions=[
    {
        type:'input',
        name:'appName',
        message:'Name your Application'
    },
    {
        type:'list',
        name:'frontEnd',
        message:'Select the FrontEnd',
        choices:options.frontEnd
    },
    {
        type:'list',
        name:'backEnd',
        message:'Select the BackEnd',
        choices:options.backEnd
    }
]
