var express = require('express');
var notes = require('./routes/notes');

var app = express();

app.use( function(req, res, next) {
  if (req.method !== 'POST') next();
  var body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    req.body = body;
    next();
  });
});

app.use('/notes', notes);

module.exports = app;
