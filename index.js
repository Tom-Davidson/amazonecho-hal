'use strict';

const Hapi = require('hapi');
const constants = require('./constants');
require('dotenv').config({silent: true});

const server = new Hapi.Server();
server.connection({
  host: '0.0.0.0',
  port: parseInt(process.env.PORT, 10) || 80
});
server.route({
  method: 'GET',
  path:'/ping',
  handler: function (request, reply) {
    return reply({"ping":"pong"});
  }
});
server.route({
  method: 'POST',
  path:'/hal',
  handler: function (request, reply) {
    return reply({
      'version': '1.0',
      'response': {
        'outputSpeech': {
          'type': 'PlainText',
          'text': 'Request sucessfully received'
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
