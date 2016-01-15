var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get( '/', (req, res) => {
  readDirectory( function(files) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write("These files are available: \n");
    res.write( files.toString() );
    res.end();
  });
});

router.post( '/', (req, res) => {
  readDirectory( function(files) {
    // console.log(files);
    // console.log(files.reduce( (a,b) => Math.max(a, b) ));
    var filenum = files.reduce( (a,b) => Math.max(a, b) ) + 1;
    console.log(filenum);
    var filename = './data/' + filenum + '.json';
    console.log(filename);
    var body = JSON.stringify(req.body);
    fs.writeFile(filename, body, function() {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write("I've recorded your JSON, thanks");
      res.end();
    });
  });
});

function readDirectory (cb) {
  fs.readdir('./data', function(err, files) {
    var jsonFiles = files
    //removes all files that do not have an extension
    //removes all .json extensions
      .filter( path.extname )
      .map ( f => path.basename(f, '.json') );
    cb(jsonFiles);
  });
}


module.exports = router;
