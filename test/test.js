var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;

var createApp = require('../app');
var app = createApp();

describe('the get request', function() {

  it('should return a list of files', function(done) {
    chai.request(app)
      .get('/notes')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type', 'text/plain');
        console.log(res.text);
        done();
      });
  });
});
