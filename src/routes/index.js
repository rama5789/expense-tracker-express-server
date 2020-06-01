const homeRoutes = require('./home');
const expenseRoutes = require('./expense');

module.exports = (app) => {
  app.use(homeRoutes);
  app.use(expenseRoutes);
};
