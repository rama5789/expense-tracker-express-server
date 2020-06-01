const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const os = require('os');

const env = require('./env');
const {
  routeNotFound,
  globalErrors,
} = require('./middlewares').ErrorHandlerMiddleware;
const {
  getRouteFromOperation,
} = require('./middlewares').RouteHandlerMiddleware;

// create express application
const app = express();

/**
 * settings
 */
app.set('host', env.app.host);
app.set('port', env.app.port);

/**
 * middlewares
 */
/* initial:before middlewares */

/* initial middlewares */
app.use(cors());

/* session middlewares */

/* auth middlewares */

/* parse middlewares */
app.use(bodyParser.json());

/* route middlewares */
app.use(getRouteFromOperation);
require('./routes')(app);

/* final middlewares */
app.use(routeNotFound);

/* final:after middlewares */
app.use(globalErrors);

// create server
const server = app.listen(app.get('port'), app.get('host'), async (err) => {
  if (err) {
    console.log('\nApp crashed with errors! 👎👎👎👎👎👎👎👎');
    console.error(`\n🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → \n${JSON.stringify(err, 0, 2)}`);
  } else {
    let baseUrl;
    if (app.get('host')) {
      baseUrl = `http://${app.get('host')}:${server.address().port}/`;
      console.log(
        `\nExpress server listening at → URL ${baseUrl} in ${app.get(
          'env'
        )} mode.`
      );
    } else {
      baseUrl = `http://${os.hostname()}:${server.address().port}/`;
      console.log(
        `\nExpress server listening at → URL ${baseUrl} in ${app.get(
          'env'
        )} mode.`
      );
    }
    console.log('\nApp started successfully! 👍👍👍👍👍👍👍👍');
  }
});
