'use strict';

const test   = require('tape');
const constants = require('../../lib/constants');
const alexaResponse = require('../../lib/alexaResponse');

test('alexaResponse.blank()', function(t) {
  let response = alexaResponse.blank();
  t.equal(typeof(response), 'object', 'returns an object');
  t.equal(response.version, '1.0', 'uses API version 1.0');
  t.equal(typeof(response.response), 'object', 'response is an object');
  t.equal(typeof(response.response.outputSpeech), 'object', 'response.outputSpeech is an object');
  t.equal(typeof(response.response.card), 'object', 'response.card is an object');
  t.equal(typeof(response.response.shouldEndSession), 'boolean', 'response.shouldEndSession is a boolean');
  t.end();
});
test('alexaResponse.setMessage() default', function(t) {
  let response = alexaResponse.blank();
  response = alexaResponse.setMessage(response, 'asdasfadfasdf', 'test message');
  t.equal(response.response.outputSpeech.type, 'PlainText', 'type is correct');
  t.equal(response.response.outputSpeech.text, 'test message', 'message is correct');
  t.end();
});
test('alexaResponse.setMessage() PlainText', function(t) {
  let response = alexaResponse.blank();
  response = alexaResponse.setMessage(response, 'PlainText', 'test message');
  t.equal(response.response.outputSpeech.type, 'PlainText', 'type is correct');
  t.equal(response.response.outputSpeech.text, 'test message', 'message is correct');
  t.end();
});
test('alexaResponse.setMessage() SSML', function(t) {
  let response = alexaResponse.blank();
  response = alexaResponse.setMessage(response, 'SSML', 'test ssml message');
  t.equal(response.response.outputSpeech.type, 'SSML', 'type is correct');
  t.equal(response.response.outputSpeech.ssml, 'test ssml message', 'message is correct');
  t.end();
});
