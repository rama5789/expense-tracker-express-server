const path = require('path');
const dotenv = require('dotenv');

const envFilePath = path.join(process.cwd(), '.env');
console.log('envFilePath: ', envFilePath);
dotenv.config({ path: envFilePath });

const devEnvFilePath = path.join(
  process.cwd(),
  `config/app.${process.env.NODE_ENV}.env`
);
console.log('devEnvFilePath: ', devEnvFilePath);
dotenv.config({ path: devEnvFilePath });

// console.log('process.env: ', process.env);

exports.env = {
  isProduction: process.env.NODE_ENV === 'production',
  // isProduction: true,
};

exports.app = {
  host: process.env.HOST || process.env.APP_HOST,
  port: process.env.PORT || process.env.APP_PORT || 4001,
};

const routes = {
  expense: {
    v1: {
      create: ['post', '/api/v1/expenses'],
      findAll: ['get', '/api/v1/expenses/all'],
      findById: ['get', '/api/v1/expenses/:id'],
      updateById: ['put', '/api/v1/expenses/:id'],
      deleteById: ['delete', '/api/v1/expenses/:id'],
    },
  },
};
exports.routes = routes;

exports.route_operation_mapping = {
  // url query: ?operation=createExpense
  createExpense: routes.expense.v1.create,
  // url query: ?operation=findAllExpenses
  findAllExpenses: routes.expense.v1.findAll,
  // url query: ?operation=findExpenseById&id=100
  findExpenseById: routes.expense.v1.findById,
  // url query: ?operation=updateExpenseById&id=100
  updateExpenseById: routes.expense.v1.updateById,
  // url query: ?operation=deleteExpenseById&id=100
  deleteExpenseById: routes.expense.v1.deleteById,
};
