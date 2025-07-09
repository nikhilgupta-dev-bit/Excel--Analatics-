'use client'
import React from "react";

/**
 * Chart Type Selector component for choosing visualization type
 * @param {string} chartType - Currently selected chart type
 * @param {Function} onChartTypeChange - Callback when chart type changes
 */
const ChartTypeSelector = ({ chartType, onChartTypeChange }) => {
  // Chart type options
  const chartTypes = [
    { type: 'pie', label: '📊 Pie Chart', desc: 'Distribution' },
    { type: 'bar', label: '📈 Bar Chart', desc: 'Comparison' },
    { type: 'line', label: '📉 Line Chart', desc: 'Trend' },
    { type: 'scatter', label: '🔴 Scatter Plot', desc: 'Correlation' }
  ];

  return (
    <div className="mb-6 flex flex-wrap gap-3 justify-center">
      {chartTypes.map(({ type, label, desc }) => (
        <button
          key={type}
          onClick={() => onChartTypeChange(type)}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            chartType === type
              ? 'bg-gradient-to-r from-indigo-500 to-indigo-700 text-white shadow-lg'
              : 'bg-white/80 text-indigo-600 border border-indigo-300 hover:bg-indigo-50'
          }`}
        >
          <div>{label}</div>
          <div className="text-xs opacity-80">{desc}</div>
        </button>
      ))}
    </div>
  );
};

export default ChartTypeSelector;
