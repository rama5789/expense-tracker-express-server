const express = require('express');

const env = require('../env');
const { catchErrors } = require('../middlewares').ErrorHandlerMiddleware;
const {
  create,
  findAll,
  findById,
  updateById,
  deleteById,
} = require('../controllers').ExpenseController;

const router = express.Router();
const { v1 } = env.routes.expense;

module.exports = router;

router.post(v1.create[1], catchErrors(create));
router.get(v1.findAll[1], catchErrors(findAll));
router.get(v1.findById[1], catchErrors(findById));
router.put(v1.updateById[1], catchErrors(updateById));
router.delete(v1.deleteById[1], catchErrors(deleteById));
