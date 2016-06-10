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
