var express = require('express');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

function getNotesRouter (storagePath) {
  storagePath = storagePath || './data';
  var router = express.Router();
  mkdirp(storagePath);

  router.get( '/', (req, res) => {
    readDirectory( function(files) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write("These files are available: \n");
      res.write( files.toString() );
      res.end();
    });
  });

  router.get('/:filenumber', (req, res) => {
    var filepath = path.join(storagePath, req.params.filenumber + '.json');
    fs.readFile(filepath, 'utf8', (err, data) => {
      if (err) throw err;
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(data);
      res.end();
    });
  });

  router.post( '/', (req, res) => {
    readDirectory( function(files) {
      var filenum = files.reduce( (a,b) => Math.max(a, b) ) + 1;
      var filename = path.join(storagePath, filenum + '.json');
      var body = JSON.stringify(req.body);
      fs.writeFile(filename, body, function() {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write("I've recorded your JSON, thanks");
        res.end();
      });
    });
  });

  return router;

  function readDirectory (cb) {
    fs.readdir(storagePath, function(err, files) {
      var jsonFiles = files
      //removes all files that do not have an extension like .DS_Store
      //removes all .json extensions
        .filter( path.extname )
        .map ( f => path.basename(f, '.json') );
      cb(jsonFiles);
    });
  }

}

module.exports = getNotesRouter;
