const express = require('express');
const router = express.Router();
const { addTransaction, getTransactions, deleteTransaction, getTransactionsByType } = require('../controllers/transactions');

router.post('/add-transaction', addTransaction)
      .get('/get-transactions', getTransactions)
      .get('/get-transactions/:type', getTransactionsByType) 
      .delete('/delete-transaction/:id', deleteTransaction);

module.exports = router;
