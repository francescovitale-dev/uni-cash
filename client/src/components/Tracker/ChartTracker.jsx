import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './chart.css';
import axios from 'axios';

const ChartTracker = ({ type, chartKey }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [totalAmounts, setTotalAmounts] = useState(0);
  const [chartData, setChartData] = useState({ labels: [], price: [] });

  useEffect(() => {
    fetchData();
  }, [type, chartKey]);

  const fetchData = async () => {
    try {
    const token = localStorage.getItem('token'); 
    const response = await axios.get(`https://eurasmus.onrender.com/api/v1/get-transactions/${type}`, {
      headers: {
        "Authorization": `Bearer ${token}` 
      }
    });
    const transactions = response.data.data;

      const categories = {};
      transactions.forEach(transaction => {
        if (!categories[transaction.category]) {
          categories[transaction.category] = 0;
        }
        categories[transaction.category] += transaction.amount;
      });

      const labels = Object.keys(categories);
      const prices = Object.values(categories);

      const AmountsSum = prices.reduce((total, amount) => total + amount, 0);
      setTotalAmounts(AmountsSum);
      setChartData({ labels: labels, price: prices });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }

    if (chartRef && chartRef.current && chartData) {
      const ctx = chartRef.current.getContext('2d');

      let colors = [];

      if (type === 'income') {
        colors = ['#3cb371', '#90ee90', '#32cd32', '#2e8b57', '#228b22']; // Shades of green for income
      } else if (type === 'expense') {
        colors = ['#FF6384', '#FF9F40', '#FFCE56', '#FFD700', '#FFA07A']; // Shades of red for expense
      }

      const percentages = chartData.price.map(price => ((price / totalAmounts) * 100).toFixed(2) + '%');

      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: chartData.labels.map((label, index) => `${label} (${percentages[index]})`),
          datasets: [{
            label: 'Price',
            data: chartData.price,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.parsed || 0; 
                  return `${label}: ${value.toLocaleString()} EUR`; 
                }
              }
            },
            legend: {
              display: true,
              position: 'bottom'
            }
          },
          animation: {
            duration: 2000, 
            easing: 'easeInOutQuart' 
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
        }
      });
    }

    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData, totalAmounts]);

  return (
    <div className="chart-container">
        <>
          <div className='text-center total-Amounts'>Total {type}s : €{totalAmounts}</div>
          {(type === 'income' && chartData.labels.length > 0) && (
          <canvas ref={chartRef} className="chart-canvas"></canvas>
            )}
          {(type === 'expense' && chartData.labels.length > 0) && (
          <canvas ref={chartRef} className="chart-canvas"></canvas>
            )}
        </>
     
    </div>
  );
};

export default ChartTracker;
