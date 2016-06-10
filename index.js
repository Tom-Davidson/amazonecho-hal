'use strict';

const Hapi = require('hapi');
const constants = require('./lib/constants');
require('dotenv').config({silent: true});

console.log(process.env.PORT);

const server = new Hapi.Server();
server.connection({
  host: '0.0.0.0',
  port: parseInt(process.env.PORT, 10) || 80
});
server.route({
  method: 'GET',
  path: '/ping',
  handler: function (request, reply) {
    return reply({"ping":"pong"});
  }
});
server.route({
  method: 'POST',
  path: '/hal',
  handler: function (request, reply) {
    const alexaRequest = JSON.parse(request.payload);
    let message = 'Unable to parse request';
    if(
      alexaRequest
      && typeof alexaRequest.request !== "undefined"
      && typeof alexaRequest.request.type !== "undefined"
    ){
      switch(alexaRequest.request.type){
        case 'IntentRequest':
            switch(alexaRequest.request.intent.name){
              case 'OpenAirlock':
                  message = 'I\'m sorry, Dave. I\'m afraid I can\'t do that.';
                break;
              default:
                  message = 'Unrecognised IntentRequest received';
                break;
            }
          break;
        default:
            message = 'Unknown request type';
          break;
      }
    }
    return reply({
      'version': '1.0',
      'response': {
        'outputSpeech': {
          'type': 'PlainText',
          'text': message
        },
        'card': {
          'type': 'Simple'
        },
        'shouldEndSession': true
      }
    });
  }
});
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});

module.exports = server;
