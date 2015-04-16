'use strict';

module.exports = function (app) {
  var env = app.get('env');
  var path = require('path');
  var route = '/:url(images|fonts|js)/*';

  app.use(route, function (req, res, next) {
    var err = new Error('Not Found');

    err.status = 404;
    next(err);
  });

  if (env === 'development') {
    app.use(route, function (err, req, res, next) { // jshint ignore:line
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  app.use(route, function (err, req, res, next) { // jshint ignore:line
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  app.route('/*').get(function (req, res) {
    res.sendFile(path.join(app.get('appPath'), 'index.html'));
  });
};
