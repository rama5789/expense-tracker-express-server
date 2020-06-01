const HttpStatus = require('http-status-codes');

const env = require('../env');

exports.catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

exports.routeNotFound = (req, res, next) => {
  console.log('\nErrorHandlerMiddleware.routeNotFound triggered -->');

  const err = new Error('Route Not Found');
  err.status = HttpStatus.NOT_FOUND;
  next(err);
};

exports.globalErrors = (err, req, res, next) => {
  console.log('\nErrorHandlerMiddleware.globalErrors triggered -->');

  const { isProduction } = env.env;
  const { statusCode, code, name, message, stack } = err;

  const errorData = {
    status: 0,
    name,
    message,
  };

  res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR);
  if (isProduction) {
    console.log(errorData);
    return res.json(errorData);
  } else {
    let stackTrace = stack || '';

    errorData.statusCode = statusCode;
    errorData.code = code;
    errorData.stack = stackTrace.replace(
      /[a-z_-\d]+.js:\d+:\d+/gi,
      '<mark>$&</mark>'
    );

    console.log(errorData);
    return res.json(errorData);
  }
};
