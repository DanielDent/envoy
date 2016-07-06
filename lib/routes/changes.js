'use strict';

const express = require('express'), 
  router = express.Router(), 
  app = require('../../app'), 
  auth = require('../auth'), 
  access = require('../access'), 
  utils = require('../utils'), 
  stream = require('stream');

// _changes
router.get('/:db/_changes', auth.isAuthenticated, (req, res) => {
  const query = req.query || {};
  if (query.filter) {
    return auth.unauthorized(res);
  }

  // use Mango filtering https://github.com/apache/couchdb-couch/pull/162
  query.filter = '_selector';
  const prefix = access.addOwnerId('',req.session.user.name);
  const selector = { 
                   selector: { 
                     '_id':  { '$gt': prefix,
                               '$lt': prefix + 'z'
                             }
                   }
                 };

  // query filtered changes               
  app.cloudant.request( {
    db: app.dbName,
    path: '_changes',
    qs: query,
    method: 'POST',
    body: selector
  }).pipe(utils.liner())
    .pipe(access.authRemover())
    .pipe(res);

});

module.exports = router;
