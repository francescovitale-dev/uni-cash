const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a name for this expense'],
    maxLength: [50, 'Name cannot be more than 50 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description for this expense'],
  },
  price: {
    type: Number,
    required: [true, 'Please add an price for this expense'],
  },
  date: {
    type: Date,
    required: [true, 'Please add a date for this expense'],
    // default: Date.now,
    trim: true 
  },
  category : {
    type: String,
    required: [true, 'Please add an category for this expense'],
    maxLength : [20, 'Name cannot be more than 20 characters'],
    trim : true
  },
  // user: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
}, {timestamps: true,});

module.exports = mongoose.model('Expense', ExpenseSchema)