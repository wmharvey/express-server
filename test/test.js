var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var rimraf = require('rimraf');

var createApp = require('../app');
var app = createApp('./test/testlogs');

describe('the get/post cycle', () => {

  before('Remove previous logs', function(done) {
    rimraf('./test/testlogs', done);
  });

  it('should respond to a post request', (done) => {
    chai.request(app)
      .post('/notes')
      .type('form')
      .send({ name: 'George'})
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return a list of files', (done) => {
    chai.request(app)
      .get('/notes')
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.text).to.equal('These files are available: \n1');
        done();
      });
  });

  it('should return the contents of a queried file', (done) => {
    chai.request(app)
      .get('/notes/1')
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.text).to.equal('{"name":"George"}');
        done();
      });
  });
});
