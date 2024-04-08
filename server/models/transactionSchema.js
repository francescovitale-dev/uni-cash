const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Riferimento al modello dell'utente, assicurati di aver definito il modello dell'utente correttamente
    required: true
  },
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title for this transaction'],
    maxLength: [50, 'Title cannot be more than 50 characters'],
  },
  amount: {
    type: Number,
    required: [true, 'Please add an amount for this transaction'],
  },
  category: {
    type: String,
    required: [true, 'Please add a category for this transaction'],
    maxLength: [20, 'Category cannot be more than 20 characters'],
    trim: true,
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: [true, 'Please specify the type of transaction'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
