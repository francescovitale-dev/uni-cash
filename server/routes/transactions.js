const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewareAuth'); // Importa il middleware di autenticazione JWT
const { addTransaction, getTransactions, deleteTransaction, getTransactionsByType } = require('../controllers/transactions');

router.post('/add-transaction', authenticateJWT, addTransaction)
      .get('/get-transactions', authenticateJWT, getTransactions)
      .get('/get-transactions/:type', authenticateJWT, getTransactionsByType) 
      .delete('/delete-transaction/:id', authenticateJWT, deleteTransaction);

module.exports = router;
