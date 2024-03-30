import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './chart.css';

const ChartTracker = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current !== null) {
      chartInstance.current.destroy(); // distruggi il grafico esistente
    }

    if (chartRef && chartRef.current && data) {
      const ctx = chartRef.current.getContext('2d');

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [{
            label: 'Amount',
            data: data.amounts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy(); // pulizia quando il componente viene smontato
      }
    };
  }, [data]);

  return (
    <div className="chart-container"> {/* Aggiungi una classe container per personalizzare l'aspetto */}
    <canvas ref={chartRef} className="chart-canvas"></canvas> {/* Aggiungi una classe per personalizzare il canvas */}
  </div>
  );
};

export default ChartTracker;