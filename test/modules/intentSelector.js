'use strict';

const test   = require('tape');
const constants = require('../../lib/constants');
const intentSelector = require('../../lib/intentSelector');

test('intentSelector', function(t) {
  const intent = intentSelector('an intent');
  t.equal(typeof(intent), 'object', 'intent is an object');
  t.equal(typeof(intent.messageType), 'string', 'intent.messageType is a string');
  t.equal(typeof(intent.message), 'string', 'intent.message is a string');
  t.end();
});
