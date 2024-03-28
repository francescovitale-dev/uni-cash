const IncomeSchema = require("../models/incomeModel");

const addIncome = async (req, res) => {
 const { title, description, amount, type, date, category } = req.body;

 const income = IncomeSchema({
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
  await income.save();
  res.status(200).json({ message: "Income added successfully" });
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
 console.log(income);
}

const getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
} 

const deleteIncomes = async (req, res) => {
  const { id } = req.params;
  IncomeSchema.findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: "Income deleted successfully" }))
    .catch((error) => res.status(500).json({ message: error.message }));
} 

module.exports = { addIncome, getIncomes, deleteIncomes }