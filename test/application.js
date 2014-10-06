var request = require('supertest');
var kathinka = require('..');

describe('app', function () {

  it('should start', function (done) {

    var app = kathinka();

    request(app.server)
      .get('/')
      .expect(200, done);

  });

});
