const Transaction = require('../models/transactionSchema');

// Aggiungi una nuova transazione
const addTransaction = async (req, res) => {
  const { title, amount, category, type } = req.body;
  const userId = req.user.userId; // Assume che l'ID dell'utente sia disponibile nel token JWT come req.user.id

  try {
    const transaction = await Transaction.create({
      title,
      amount,
      category,
      type,
      user: userId,
      timestamp: new Date(), // Imposta il timestamp alla data e ora correnti
    });

    res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Ottieni tutte le transazioni
const getTransactions = async (req, res) => {
  const userId = req.user.userId;
  const currentDate = new Date();
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  try {
    const transactions = await Transaction.find({
      user: userId,
      timestamp: { $gte: startOfMonth, $lt: endOfMonth },
    });

    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const getTransactionsByType = async (req, res) => {
  const userId = req.user.userId; // Assume che l'ID dell'utente sia disponibile nel token JWT come req.user.id
  const { type } = req.params;
  const currentDate = new Date();
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  try {
    const transactions = await Transaction.find({ 
      user: userId, 
      type,
      timestamp: { $gte: startOfMonth, $lt: endOfMonth },
    });
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Elimina una transazione
const deleteTransaction = async (req, res) => {
  const userId = req.user.userId; // Assume che l'ID dell'utente sia disponibile nel token JWT come req.user.id
  const { id } = req.params;

  try {
    const transaction = await Transaction.findOneAndDelete({ _id: id, user: userId });

    if (!transaction) {
      return res.status(404).json({ success: false, error: 'Transaction not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { addTransaction, getTransactions, deleteTransaction, getTransactionsByType };
