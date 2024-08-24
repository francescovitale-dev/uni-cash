import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PlusCircle,
  List,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpDown
} from "lucide-react";
import ChartTracker from "./ChartTracker";
import TransactionList from "./TransactionList";

const API_BASE_URL = "https://eurasmus.onrender.com/api/v1";

const Tracker = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    type: "",
  });
  const [transactions, setTransactions] = useState([]);
  const [chartKey, setChartKey] = useState("");
  const [activeTab, setActiveTab] = useState("add");
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const { toast } = useToast();
  const currentMonth = format(new Date(), "MMMM");

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/get-transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(response.data.data);
      calculateSummary(response.data.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      if (error.response?.status === 403) handleSessionExpired();
    }
  };

  const calculateSummary = (transactions) => {
    const summary = transactions.reduce(
      (acc, { type, amount }) => {
        acc[type] += amount;
        return acc;
      },
      { income: 0, expense: 0 }
    );
    summary.balance = summary.income - summary.expense;
    setSummary(summary);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleChange = (name, value) => {
    if (name === "amount" && parseFloat(value) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Amount must be greater than 0!",
        variant: "destructive",
      });
      return;
    }
    if (value.length > 16) {
      toast({
        title: "Invalid Input",
        description: "The input should not exceed 16 characters!",
        variant: "destructive",
      });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_BASE_URL}/add-transaction`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({ title: "", amount: "", category: "", type: "" });
      setChartKey(Math.random().toString(36).substring(7));
      fetchTransactions();
      toast({
        title: "Success",
        description: "Transaction added successfully",
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
      if (error.response?.status === 403) {
        handleSessionExpired();
      } else {
        toast({
          title: "Error",
          description: "Error adding transaction. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSessionExpired = () => {
    localStorage.removeItem("token");
    toast({
      title: "Session Expired",
      description: "Your session has expired. Please login again.",
      variant: "destructive",
    });
    window.location.reload();
  };

  const getCategoryOptions = () => {
    const options = {
      income: [
        "Scholarship",
        "Part-time Job",
        "Parental Support",
        "Freelancing",
        "Grants",
        "Tutoring",
        "Selling Stuff",
        "Other Income",
      ],
      expense: [
        "Alcohol",
        "Party",
        "Food",
        "Rent",
        "Utilities",
        "Transportation",
        "Entertainment",
        "Other Expense",
      ],
    };
    return (options[formData.type] || []).map((value) => ({
      value,
      label: value,
    }));
  };

  return (
    <div className="min-h-screen text-gray-900 dark:text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-sky-400 dark:from-indigo-400 dark:to-sky-300">
        Finance Dashboard - {currentMonth}
      </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            { title: "Total Income", icon: TrendingUp, value: summary.income, color: "text-green-600 dark:text-green-400" },
            { title: "Total Expenses", icon: TrendingDown, value: summary.expense, color: "text-red-600 dark:text-red-400" },
            { title: "Current Balance", icon: DollarSign, value: summary.balance, color: "text-blue-600 dark:text-blue-400" },
          ].map(({ title, icon: Icon, value, color }) => (
            <motion.div
              key={title}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">{title}</h3>
              <div className="flex items-center justify-between">
                <Icon className={`w-10 h-10 ${color}`} />
                <p className={`text-2xl sm:text-3xl font-bold ${color}`}>{value.toFixed(2)} €</p>
              </div>
            </motion.div>
          ))}
        </div>

        <Card className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden border-none">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                <TabsTrigger value="add" className="text-sm font-medium rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
                  <PlusCircle className="w-4 h-4 mr-2" /> Add Transaction
                </TabsTrigger>
                <TabsTrigger value="view" className="text-sm font-medium rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
                  <List className="w-4 h-4 mr-2" /> View Transactions
                </TabsTrigger>
              </TabsList>
              <TabsContent value="add">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="type" className="text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                      <Select name="type" value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                        <SelectTrigger 
                          id="type" 
                          className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 ease-in-out"
                        >
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg">
                          <SelectItem value="income" className="text-green-600 dark:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-150 ease-in-out">Income</SelectItem>
                          <SelectItem value="expense" className="text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-150 ease-in-out">Expense</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="category" className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                      <Select name="category" value={formData.category} onValueChange={(value) => handleChange("category", value)} disabled={!formData.type}>
                        <SelectTrigger 
                          id="category" 
                          className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 ease-in-out"
                        >
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-md shadow-lg overflow-y-auto">
                          {getCategoryOptions().map(({ value, label }) => (
                            <SelectItem 
                              key={value} 
                              value={value}
                              className="hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-150 ease-in-out"
                            >
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="Transaction Title"
                    className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    maxLength="17"
                    required
                  />
                  <Input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={(e) => handleChange("amount", e.target.value)}
                    placeholder="Amount"
                    className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    required
                  />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300 ease-in-out" type="submit">
                    Add Transaction
                  </Button>
                </form>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ChartTracker key="income" type="income" chartKey={chartKey} />
                  <ChartTracker key="expense" type="expense" chartKey={chartKey} />
                </div>
              </TabsContent>
              <TabsContent value="view">
                <AnimatePresence>
                  {transactions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TransactionList
                        transactions={transactions}
                        onDelete={(id) => {
                          setTransactions(transactions.filter((transaction) => transaction._id !== id));
                          fetchTransactions();
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tracker;