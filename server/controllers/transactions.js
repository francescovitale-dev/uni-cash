const Transaction = require('../models/transactionSchema');

// Aggiungi una nuova transazione
const addTransaction = async (req, res) => {
  const { title, amount, category, type } = req.body;
  const userId = req.user.id; // Recupera l'ID dell'utente dal token JWT

  try {
    const transaction = await Transaction.create({
      title,
      amount,
      category,
      type,
      userId // Associa l'ID dell'utente alla transazione
    });

    res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Ottieni tutte le transazioni
const getTransactions= async (req, res) => {
  const userId = req.user.id; // Recupera l'ID dell'utente dal token JWT

  try {
    const transactions = await Transaction.find({ userId });
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const getTransactionsByType = async (req, res) => {
  const { type } = req.params;
  const userId = req.user.id; // Recupera l'ID dell'utente dal token JWT

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
  const userId = req.user.id; // Recupera l'ID dell'utente dal token JWT

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
