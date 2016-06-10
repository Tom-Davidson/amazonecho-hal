'use strict';

const test   = require('tape');
const server = require("../index");
const constants = require('../lib/constants');

test("Basic HTTP Tests - GET /", function(t) { // t
  server.inject(
    {
      method: "GET",
      url: "/"
    },
    function(response) {
      t.equal(response.statusCode, 404);
      t.equal(response.payload, '{"statusCode":404,"error":"Not Found"}');
      server.stop(t.end);
    }
  );
});
test("Basic HTTP Tests - GET /ping", function(t) { // t
  server.inject(
    {
      method: "GET",
      url: "/ping"
    },
    function(response) {
      t.equal(response.statusCode, 200);
      t.equal(response.headers['content-type'], 'application/json; charset=utf-8');
      t.equal(response.payload, '{"ping":"pong"}');
      t.equal(response.payload.length, 15);
      server.stop(t.end);
    }
  );
});
test("POST to /hal get's a JSON payload that conforms to the API spec", function(t) { // t
  server.inject(
    {
      method: "POST",
      url: "/hal",
      payload: '{\
      "session": {\
        "sessionId": "SessionId.b968656c-9ee5-4b07-a0c8-784a71c00f2b",\
        "application": {\
          "applicationId": "amzn1.echo-sdk-ams.app.2ccafc7d-1e72-48de-9efa-5ceadb053843"\
        },\
        "user": {\
          "userId": "amzn1.ask.account.AFP3ZWPOS2BGJR7OWJZ3DHPKMOMNWY4AY66FUR7ILBWANIHQN73QGXTKMDLFYFLYLVXFP7NBOOFZI435VLP3OWNWRPR47JBM65G3KVWPVNZTFF33TPW25OUF3NY2IM3KTWQFG7FEVWWYEPZZZMTXC574SJLB4NE5B5DOG56DOQI5QEADSGRMZQUE3T6FRZP4RDD73FX5V72YXXI"\
        },\
        "new": true\
      },\
      "request": {\
        "type": "IntentRequest",\
        "requestId": "EdwRequestId.acabcaaf-739b-4e97-9a0e-e511c3274aac",\
        "timestamp": "2016-06-08T12:55:20Z",\
        "intent": {\
          "name": "OpenAirlock",\
          "slots": {}\
        },\
        "locale": "en-US"\
      },\
      "version": "1.0"\
      }'
    },
    function(response) {
      t.equal(response.statusCode, 200);
      t.equal(response.headers['content-type'], 'application/json; charset=utf-8');
      if(response.payload.length > (24 * 1024)){
        t.fail('api response exceeds 24kb');
      }else{
        t.pass('api response under 24kb maximum');
      }
      const apiResponse = JSON.parse(response.payload);
      // Valid response?
      t.equal(apiResponse.version, '1.0');
      t.equal(typeof(apiResponse.response), 'object');
      // root.response valid?
      t.equal(typeof(apiResponse.response.shouldEndSession), 'boolean');
      // root.response.outputSpeech valid?
      if(apiResponse.response.hasOwnProperty('outputSpeech')){
        t.equal(typeof(apiResponse.response.outputSpeech), 'object');
        t.equal(typeof(apiResponse.response.outputSpeech.type), 'string');
        switch(apiResponse.response.outputSpeech.type){
          case 'PlainText':
            t.equal(typeof(apiResponse.response.outputSpeech.text), 'string');
            if(apiResponse.response.outputSpeech.text.length > 8000){
              t.fail('apiResponse.response.outputSpeech.text exceeds 8000 characters');
            }
            break;
          case 'SSML':
            t.equal(typeof(apiResponse.response.outputSpeech.ssml), 'string');
            if(apiResponse.response.outputSpeech.ssml.length > 8000){
              t.fail('apiResponse.response.outputSpeech.ssml exceeds 8000 characters');
            }
            break;
          default:
            t.fail('apiResponse.response.outputSpeech.type should be PlainText or SSML');
            break;
        }
      }else{
        t.pass('optional apiResponse.response.outputSpeech missing but that\'s ok');
      }
      // root.response.card valid?
      if(apiResponse.response.hasOwnProperty('card')){
        t.equal(typeof(apiResponse.response.card), 'object');
        switch(apiResponse.response.card.type){
          case 'Simple':
          case 'Standard':
          case 'LinkAccount':
              t.pass();
            break;
          default:
              t.fail('response.card.type must be on of: Simple, Standard or LinkAccount');
            break;
        }
        if(
          apiResponse.response.card.hasOwnProperty('content')
          && JSON.stringify(apiResponse.response.card).length > 8000
        ){
          t.fail('apiResponse.response.card contents exceeds 8000 characters');
        }
      }else{
        t.pass('optional apiResponse.response.card missing but that\'s ok');
      }
      server.stop(t.end);
    }
  );
});
