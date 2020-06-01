const HttpStatus = require('http-status-codes');

const { ExpenseCollection } = require('../../db');

exports.create = async (req, res) => {
  console.log('\nExpenseController.create() triggered -->');

  const createParams = req.body;
  // validate request
  if (Object.keys(createParams).length === 0) {
    const errorData = {
      status: 0,
      message: 'Please provide data to create expense.',
    };
    return res.status(HttpStatus.BAD_REQUEST).send(errorData);
  }

  const successData = {
    status: 1,
    message: 'A new Expense record created.',
    data: ExpenseCollection.create(createParams),
  };
  return res.status(HttpStatus.OK).send(successData);
};

exports.findAll = async (req, res) => {
  console.log('\nExpenseController.findAll() triggered -->');

  const successData = {
    status: 1,
    message: 'Expenses fetched successfully.',
    data: ExpenseCollection.findAll(),
  };
  return res.status(HttpStatus.OK).send(successData);
};

exports.findById = async (req, res) => {
  console.log('\nExpenseController.findById() triggered -->');

  const expenseFound = ExpenseCollection.findById(req.params.id);
  if (!expenseFound) {
    const errorData = {
      status: 0,
      message: 'Invalid expenseId.',
    };
    return res.status(HttpStatus.BAD_REQUEST).send(errorData);
  }
  const successData = {
    status: 1,
    message: 'Expense fetched successfully.',
    data: expenseFound,
  };
  return res.status(HttpStatus.OK).send(successData);
};

exports.updateById = async (req, res) => {
  console.log('\nExpenseController.updateById() triggered -->');

  const updateParams = req.body;
  if (Object.keys(updateParams).length === 0) {
    const errorData = {
      status: 0,
      message: 'Please provide data to update expense.',
    };
    return res.status(HttpStatus.BAD_REQUEST).send(errorData);
  }

  const updatedExpense = ExpenseCollection.updateById(
    req.params.id,
    updateParams
  );
  if (!updatedExpense) {
    const errorData = {
      status: 0,
      message: 'Invalid expenseId.',
    };
    return res.status(HttpStatus.BAD_REQUEST).send(errorData);
  }
  const successData = {
    status: 1,
    message: 'Expense updated successfully.',
    data: updatedExpense,
  };
  return res.status(HttpStatus.OK).send(successData);
};

exports.deleteById = async (req, res) => {
  console.log('\nExpenseController.deleteById() triggered -->');

  const deletedExpense = ExpenseCollection.deleteById(req.params.id);
  if (!deletedExpense) {
    const errorData = {
      status: 0,
      message: 'Invalid expenseId.',
    };
    return res.status(HttpStatus.BAD_REQUEST).send(errorData);
  }
  const successData = {
    status: 1,
    message: 'Expense deleted successfully.',
    data: deletedExpense,
  };
  return res.status(HttpStatus.OK).send(successData);
};
