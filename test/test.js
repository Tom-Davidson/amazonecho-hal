var test   = require('tape');
var server = require("../index.js");

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
