const express = require('express');
const router = express.Router();
const { addTransaction, getTransactions, deleteTransaction, getTransactionsByType } = require('../controllers/transactions');
const { authMiddleware } = require('../middleware/middlewareAuth');

router.post('/add-transaction', authMiddleware, addTransaction);
router.get('/get-transactions', authMiddleware, getTransactions);
router.get('/get-transactions/:type', authMiddleware, getTransactionsByType); // Aggiungi il middleware di autenticazione qui
router.delete('/delete-transaction/:id', authMiddleware, deleteTransaction);

module.exports = router;
