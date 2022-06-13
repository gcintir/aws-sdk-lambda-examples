const event = require('./resources/aws.input.json');
//process.env = require('./config/aws-sdk-lambda-examples.env.json').Variables;
const {handler} = require('.');

handler(event).then(console.log).catch(console.log);