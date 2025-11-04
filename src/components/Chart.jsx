import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import '../styles/Chart.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

/**
 * CHART COMPONENT
 * Wrapper for Chart.js charts with consistent styling
 *
 * Props:
 * - type: 'line' | 'bar' | 'doughnut'
 * - data: Chart.js data object
 * - options: Chart.js options object
 * - height: number
 * - width: number
 * - className: string
 */

const Chart = ({
  type = 'line',
  data,
  options = {},
  height = 300,
  width,
  className = '',
  ...props
}) => {
  // Default options for consistent styling
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: 'inherit'
          }
        }
      },
      tooltip: {
        backgroundColor: 'var(--bg-secondary)',
        titleColor: 'var(--text-primary)',
        bodyColor: 'var(--text-secondary)',
        borderColor: 'var(--border-color)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12
      }
    },
    scales: type !== 'doughnut' ? {
      x: {
        grid: {
          color: 'var(--border-color)',
          borderColor: 'var(--border-color)'
        },
        ticks: {
          color: 'var(--text-secondary)',
          font: {
            size: 12
          }
        }
      },
      y: {
        grid: {
          color: 'var(--border-color)',
          borderColor: 'var(--border-color)'
        },
        ticks: {
          color: 'var(--text-secondary)',
          font: {
            size: 12
          }
        }
      }
    } : {},
    ...options
  };

  const chartClasses = [
    'chart',
    `chart-${type}`,
    className
  ].filter(Boolean).join(' ');

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return <Bar data={data} options={defaultOptions} {...props} />;
      case 'doughnut':
        return <Doughnut data={data} options={defaultOptions} {...props} />;
      case 'line':
      default:
        return <Line data={data} options={defaultOptions} {...props} />;
    }
  };

  return (
    <div className={chartClasses} style={{ height, width }}>
      {renderChart()}
    </div>
  );
};

export default Chart;