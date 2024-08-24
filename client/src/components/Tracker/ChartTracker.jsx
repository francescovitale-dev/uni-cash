import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const TransactionChartTracker = ({ type, chartKey }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, [type, chartKey]);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `https://eurasmus.onrender.com/api/v1/get-transactions/${type}`, 
        {
          headers: { "Authorization": `Bearer ${token}` }
        }
      );
      const transactions = response.data.data;

      const categories = transactions.reduce((acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
        return acc;
      }, {});

      const total = Object.values(categories).reduce((sum, value) => sum + value, 0);
      setTotalAmount(total);

      const sortedData = Object.entries(categories)
        .sort(([, a], [, b]) => b - a)
        .map(([name, value]) => ({
          name,
          value,
          percentage: ((value / total) * 100).toFixed(2)
        }));

      setChartData(sortedData);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  const COLORS = type === 'income'
    ? ['#34D399', '#10B981', '#059669', '#047857', '#065F46', '#064E3B', '#063F2E', '#022C22']
    : ['#F87171', '#EF4444', '#DC2626', '#B91C1C', '#991B1B', '#7F1D1D', '#671515', '#4C0F0F'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border-none">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white flex items-center mb-2 sm:mb-0">
              {type === 'income' ? (
                <ArrowUpCircle className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-green-500 dark:text-green-400" />
              ) : (
                <ArrowDownCircle className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-red-500 dark:text-red-400" />
              )}
              Total {type.charAt(0).toUpperCase() + type.slice(1)}
            </h2>
            <span className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              €{totalAmount.toLocaleString()}
            </span>
          </div>

          {chartData.length > 0 ? (
            <>
              <div className="h-64 sm:h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius="80%"
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => `€${value.toLocaleString()}`}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        color: '#333',
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-gray-700">
                      <TableHead className="text-gray-600 dark:text-gray-300">Category</TableHead>
                      <TableHead className="text-gray-600 dark:text-gray-300">Amount</TableHead>
                      <TableHead className="text-gray-600 dark:text-gray-300">Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {chartData.map((item, index) => (
                      <TableRow key={item.name} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <TableCell className="font-medium text-gray-800 dark:text-white">
                          <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                          {item.name}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-300">€{item.value.toLocaleString()}</TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-300">{item.percentage}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No data available</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TransactionChartTracker;