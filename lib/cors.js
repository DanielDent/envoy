var url = require('url');

// this is Express middleware
module.exports = function() {
  
  // intercept each request  
  return function(req, res, next) {

    // if the user-agent supplied an origin header (like a browser)
    if (req.headers.origin) {
      
      // send CORS HTTP headers
      var parsed = url.parse(req.headers.origin);
      res.append('Access-Control-Allow-Credentials', 'true');
      res.append('Access-Control-Allow-Origin', 
                 parsed.protocol + '//' + parsed.host);    
      res.append('Access-Control-Allow-Headers', 
                 req.headers['access-control-request-headers']);   
      res.append('Access-Control-Allow-Methods', 'GET, PUT, POST, HEAD, DELETE');
      var exposeHeaders = 'content-type, cache-control, accept-ranges, etag, server, x-couch-request-id, x-couch-update-newrev, x-couchdb-body-time';
      res.append('Access-Control-Expose-Headers', exposeHeaders);
      res.append('Access-Control-Max-Age', '86400');
    }
    
    // continue to the next route handler
    next();
  };
    
};
