const express = require('express');
const router = express.Router();
const { addTransaction, getTransactions, deleteTransaction } = require('../controllers/transactions');

router.post('/add-transaction', addTransaction)
      .get('/get-transactions', getTransactions)
      .delete('/delete-transaction/:id', deleteTransaction);

module.exports = router;
