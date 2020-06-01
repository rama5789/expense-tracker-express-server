// data
const expenses = [];

// methods
const incrementExpenseCounter = (() => {
  let counter = 2;

  return () => {
    counter++;
    return counter;
  };
})();

const findExpenseIndex = (id) => {
  const searchId = parseInt(id);
  return expenses.findIndex((expense) => expense.id === searchId);
};

const resetExpenses = () => {
  expenses.splice(
    0,
    Infinity,
    ...[
      {
        id: 1,
        date: '2020-05-30',
        description: 'Book Sale',
        type: 'INCOME',
        amount: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        date: '2020-05-31',
        description: 'Groceries',
        type: 'EXPENSE',
        amount: 400,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
  );
};

// exports
exports.create = (createParams) => {
  const newExpense = {
    id: incrementExpenseCounter(),
    date: createParams.date || new Date(),
    description: createParams.description || '',
    type: createParams.type ? createParams.type.toUpperCase() : 'EXPENSE',
    amount: createParams.amount || 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  expenses.push(newExpense);

  return newExpense;
};
exports.findAll = () => {
  return expenses;
};
exports.findById = (id) => {
  const findIndex = findExpenseIndex(id);
  if (findIndex === -1) return;

  const expenseFound = expenses[findIndex];
  return expenseFound;
};
exports.updateById = (id, updateParams) => {
  const updateIndex = findExpenseIndex(id);
  if (updateIndex === -1) return;

  const currentExpense = expenses[updateIndex];
  const updatedExpense = {
    id: currentExpense.id,
    date: updateParams.date || new Date(),
    description: updateParams.description || '',
    type: updateParams.type ? updateParams.type.toUpperCase() : 'EXPENSE',
    amount: updateParams.amount || 0,
    createdAt: currentExpense.createdAt,
    updatedAt: new Date(),
  };
  expenses[updateIndex] = updatedExpense;

  return updatedExpense;
};
exports.deleteById = (id) => {
  const deleteIndex = findExpenseIndex(id);
  if (deleteIndex === -1) return;

  const deletedExpense = expenses.splice(deleteIndex, 1);
  return deletedExpense;
};

resetExpenses();
