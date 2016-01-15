var express = require('express');
var notes = require('./routes/notes');
var bodyParser = require('body-parser');
var fs = require('fs');

module.exports = function createApp() {

  var app = express();

  app.use( bodyParser.urlencoded( {extended: true}) );
  app.use( bodyParser.json() );

  app.use('/notes', notes);

  return app;

};
