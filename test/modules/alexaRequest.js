'use strict';

const test   = require('tape');
const constants = require('../../lib/constants');
const alexaRequest = require('../../lib/alexaRequest');

const exampleRawRequest = '{\
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
}';

test('alexaRequest.extract()', function(t) {
  const request = alexaRequest.extract(exampleRawRequest);
  t.equal(typeof(request), 'object', 'returns an object');
  t.equal(typeof(request.request), 'object', 'request is an object');
  t.equal(request.request.type, 'IntentRequest', 'request.type is correct');
  t.equal(request.request.intent.name, 'OpenAirlock', 'request.intent.name is correct');
  t.end();
});
test('alexaRequest.extract() with invalid JSON', function(t) {
  const request = alexaRequest.extract('sadsjkfssfdhasgaegasfasef');
  t.equal(typeof(request), 'object', 'returns an object');
  t.equal(typeof(request.request), 'object', 'request is an object');
  t.equal(request.request.type, 'IntentRequest', 'request.type is correct');
  t.equal(request.request.intent.name, 'Unknown', 'request.intent.name is correct');
  t.end();
});
test('alexaRequest.extract() with valid data plus test harness hackery', function(t) {
  const request = alexaRequest.extract(JSON.parse(exampleRawRequest));
  t.equal(typeof(request), 'object', 'returns an object');
  t.equal(typeof(request.request), 'object', 'request is an object');
  t.equal(request.request.type, 'IntentRequest', 'request.type is correct');
  t.equal(request.request.intent.name, 'OpenAirlock', 'request.intent.name is correct');
  t.end();
});
test('alexaRequest.getType()', function(t) {
  const request = alexaRequest.extract(exampleRawRequest);
  t.equal(alexaRequest.getType(request), 'IntentRequest', 'request type is correct');
  t.end();
});
test('alexaRequest.getIntent()', function(t) {
  const request = alexaRequest.extract(exampleRawRequest);
  t.equal(alexaRequest.getIntent(request), 'OpenAirlock', 'intent is correct');
  t.end();
});
