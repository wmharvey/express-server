var createApp = require('./app');
var app = createApp();

app.use(function(req, res) {
  res.send('No such path exists');
});

app.listen(8080, () => {
  console.log('Server running');
});
