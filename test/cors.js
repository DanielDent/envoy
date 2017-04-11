'use strict';
/* globals testUtils */

var assert = require('assert'),
  auth = require('../lib/auth'),
  cloudant = null,
  app = require('../app'),
  fakedomain = 'http://mydomain.com',
  fakedomainChangedCors = 'http://corstest.com',
  fakeacl = 'X-PINGOTHER, Content-Type',
  remoteURL = null,
  remote = null;


describe('cors', function () {
  
  before(function() {
    return testUtils.createUser().then(function(url){
      url = url.replace(/\/[a-z0-9]+$/,'');
      var headers = {
        origin: fakedomain, 
        'Access-Control-Request-Headers': fakeacl
      }
      cloudant = require('cloudant')({url: url, requestDefaults: { headers: headers }});
      remote = cloudant.db.use(app.dbName);
    });
  });
  
  it('select records with CORS headers', function (done) {
    // Cloudant "/db/_all_docs"
    remote.list(function (err, response, headers) { 
      done();
    });
  });


  before(function() {
    return testUtils.createUser().then(function(url){
      url = url.replace(/\/[a-z0-9]+$/,'');
      var headers = {
        origin: fakedomainChangedCors,
        'Access-Control-Request-Headers': fakeacl
      }
      cloudant = require('cloudant')({url: url, requestDefaults: { headers: headers }});
      remote = cloudant.db.use(app.dbName);
    });
  });
  it('should not touch pre-existing CORS headers', function (done) {
    remote.list(function (err, response, headers) {
      assert.equal(headers['access-control-allow-credentials'], 'foo');
      assert.equal(headers['access-control-allow-origin'], 'bar');
      assert.equal(headers['access-control-allow-headers'], 'baz');
      done();
    });
  });
  
});
