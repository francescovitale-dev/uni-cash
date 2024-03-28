const ExpenseSchema = require("../models/expenseModel");

const addExpense = async (req, res) => {
 const { title, description, amount, type, date, category } = req.body;

 const expense = ExpenseSchema({
   title,
   description,
   amount,
   type,
   date,
   category
 })

 try {
  // validations
  if (!title || !description || !amount || !date || !category) {
   return res.status(400).json({ message: "All fields are required" });
  }
  if (!amount || amount < 0) {
    return res.status(400).json({ message: "Please add a positive amount" });
   }
  await expense.save();
  res.status(200).json({ message: "Expense added successfully" });
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
 console.log(expense);
}

const getExpenses = async (req, res) => {
  try {
    const expense = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
} 

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  ExpenseSchema.findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: "Expense deleted successfully" }))
    .catch((error) => res.status(500).json({ message: error.message }));
} 

module.exports = { addExpense, getExpenses, deleteExpense }