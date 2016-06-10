'use strict';

const Hapi = require('hapi');
const constants = require('./lib/constants');
const alexaRequest = require('./lib/alexaRequest');
const alexaResponse = require('./lib/alexaResponse');
const intentSelector = require('./lib/intentSelector');
require('dotenv').config({silent: true});

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
    const req = alexaRequest.extract(request.payload);
    let message = {
      messageType: 'PlainText',
      message: 'Unable to parse request'
    };
    switch(alexaRequest.getType(req)){
      case 'IntentRequest':
        // intentSelector('an intent')
        switch(alexaRequest.getIntent(req)){
          case 'OpenAirlock':
              message.message = 'I\'m sorry, Dave. I\'m afraid I can\'t do that.';
            break;
          default:
              message.message = 'Unrecognised IntentRequest received';
            break;
        }
        break;
      default:
          message.message = 'Unknown request type';
        break;
    }
    let response = alexaResponse.blank();
    response = alexaResponse.setMessage(response, message.messageType, message.message);
    return reply(response);
  }
});
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});

module.exports = server;
