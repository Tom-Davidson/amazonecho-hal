'use strict';

const test   = require('tape');
const constants = require('../../lib/constants');
const alexaResponse = require('../../lib/alexaResponse');

test('alexaResponse.blank()', function(t) {
  let response = alexaResponse.blank();
  t.equal(typeof(response), 'object');
  t.equal(response.version, '1.0');
  t.equal(typeof(response.response), 'object');
  t.equal(typeof(response.response.outputSpeech), 'object');
  t.equal(typeof(response.response.card), 'object');
  t.equal(typeof(response.response.shouldEndSession), 'boolean');
  t.end();
});
test('alexaResponse.setMessage() default', function(t) {
  let response = alexaResponse.blank();
  response = alexaResponse.setMessage(response, 'asdasfadfasdf', 'test message');
  t.equal(response.response.outputSpeech.type, 'PlainText');
  t.equal(response.response.outputSpeech.text, 'test message');
  t.end();
});
test('alexaResponse.setMessage() PlainText', function(t) {
  let response = alexaResponse.blank();
  response = alexaResponse.setMessage(response, 'PlainText', 'test message');
  t.equal(response.response.outputSpeech.type, 'PlainText');
  t.equal(response.response.outputSpeech.text, 'test message');
  t.end();
});
test('alexaResponse.setMessage() SSML', function(t) {
  let response = alexaResponse.blank();
  response = alexaResponse.setMessage(response, 'SSML', 'test ssml message');
  t.equal(response.response.outputSpeech.type, 'SSML');
  t.equal(response.response.outputSpeech.ssml, 'test ssml message');
  t.end();
});
