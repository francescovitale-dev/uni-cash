const Transaction = require('../models/transactionSchema');

// Aggiungi una nuova transazione
const addTransaction = async (req, res) => {
  const { title, amount, category, type } = req.body;
  const userId = req.user._id; // Assume che l'ID dell'utente sia disponibile nella richiesta

  try {
    const transaction = await Transaction.create({
      user: userId,
      title,
      amount,
      category,
      type,
    });

    res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Ottieni tutte le transazioni
const getTransactions = async (req, res) => {
  const userId = req.user._id; // Assume che l'ID dell'utente sia disponibile nella richiesta

  try {
    const transactions = await Transaction.find({ user: userId });
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getTransactionsByType = async (req, res) => {
  const userId = req.user._id; // Assume che l'ID dell'utente sia disponibile nella richiesta
  const { type } = req.params;

  try {
    const transactions = await Transaction.find({ user: userId, type });
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Elimina una transazione
const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ success: false, error: 'Transaction not found' });
    }

    await transaction.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { addTransaction, getTransactions, deleteTransaction, getTransactionsByType };
