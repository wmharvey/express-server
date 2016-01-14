var express = require('express');
var router = express.Router();

router.get( '/', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('I will get to this later');
});

router.post( '/', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Post data \n');
  res.write(req.body);
  res.end();
});

module.exports = router;
