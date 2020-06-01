const env = require('../env');

exports.getRouteFromOperation = (req, res, next) => {
  console.log('\nRouteHandlerMiddleware.getRouteFromOperation triggered -->');

  const reqQuery = req.query;
  if (reqQuery.operation) {
    // override incoming req.method
    req.method = env.route_operation_mapping[reqQuery.operation][0];

    let url = env.route_operation_mapping[reqQuery.operation][1] + '/';
    const queryKeys = Object.keys(reqQuery);
    let x = '';
    for (const key of queryKeys) {
      if (key !== 'operation') {
        const value = reqQuery[key];
        const regex = new RegExp(`/:${key}/`, 'g');
        x = url.replace(regex, `/${value}/`);
        url = x;
      }
    }
    // override incoming req.url
    req.url = url;
  }

  next();
};
