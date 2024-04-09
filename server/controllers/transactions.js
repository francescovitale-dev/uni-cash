const Transaction = require('../models/transactionSchema');
const jwt_decode = require('jwt-decode');

// Aggiungi una nuova transazione
const addTransaction = async (req, res) => {
  const { title, amount, category, type } = req.body;
  const token = req.headers.token;
  console.log(token)
  const userData =  jwt_decode(token)
  const userId = userData.userId;

  try {
    const transaction = await Transaction.create({
      title,
      amount,
      category,
      type,
      userId 
    });

    res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Ottieni tutte le transazioni
const getTransactions = async (req, res) => {
  const token = req.headers.token;
  const userData =  jwt_decode(token)
  const userId = userData.userId;

  try {
    const transactions = await Transaction.find({ userId });
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const getTransactionsByType = async (req, res) => {
  const { type } = req.params;
  const token = req.headers.token;
  const userData =  jwt_decode(token)
  const userId = userData.userId;

  try {
    const transactions = await Transaction.find({ type, userId });
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Elimina una transazione
const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.token;
  const userData =  jwt_decode(token)
  const userId = userData.userId;

  try {
    const transaction = await Transaction.findOneAndDelete({ _id: id, userId });

    if (!transaction) {
      return res.status(404).json({ success: false, error: 'Transaction not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { addTransaction, getTransactions, deleteTransaction, getTransactionsByType };
