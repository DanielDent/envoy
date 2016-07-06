'use strict';

const express = require('express'), 
  router = express.Router(), 
  uuid = require('uuid'), 
  app = require('../../app'), 
  access = require('../access'), 
  utils = require('../utils'), 
  auth = require('../auth');

// Update a document

const handler = (req, res) => {
  if (req.params.id) {
    req.body = req.body || {};
    req.body._id = req.params.id;
  }
  if (req.body._id) { // In case the body contains an _id, we need to tweak that, too.
    req.body._id = access.addOwnerId(req.body._id, req.session.user.name);
  } else {
    req.body._id = access.addOwnerId(uuid.v4(), req.session.user.name);
  }
  app.db.insert(req.body, (err, body) => {
    if (err) {
      return utils.sendError(err, res);
    } 
    res.send(access.strip(body));
  });
};

router.post('/:db/:id', auth.isAuthenticated, handler);
router.post('/:db', auth.isAuthenticated, handler);


module.exports = router;
