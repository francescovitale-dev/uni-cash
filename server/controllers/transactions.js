const Transaction = require('../models/transactionSchema');

const addTransaction = async (req, res) => {
  const { title, amount, category, type } = req.body;
  const userId = req.user.id; // ID dell'utente autenticato

  try {
    const transaction = await Transaction.create({
      userId,
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

const getTransactions = async (req, res) => {
  const userId = req.user.id; // ID dell'utente autenticato

  try {
    const transactions = await Transaction.find({ userId });
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getTransactionsByType = async (req, res) => {
  const userId = req.user.id; // ID dell'utente autenticato
  const { type } = req.params;

  try {
    const transactions = await Transaction.find({ userId, type });
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const deleteTransaction = async (req, res) => {
  const userId = req.user.id; // ID dell'utente autenticato
  const { id } = req.params;

  try {
    const transaction = await Transaction.findOne({ _id: id, userId });

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
