'use client'
import React, { useRef } from "react";
import ReactECharts from "echarts-for-react";
import { getChartOption } from "../utils/chartUtils";
import { getCategories, getValues } from "../utils/dataUtils";

/**
 * Chart Display component for rendering and downloading charts
 * @param {string} chartType - Type of chart to display
 * @param {string} selectedColumn - Selected data column
 * @param {Object} excelData - The Excel data object
 */
const ChartDisplay = ({ chartType, selectedColumn, excelData }) => {
  const chartRef = useRef(null);

  // Download chart as PNG
  const downloadPNG = () => {
    if (chartRef.current) {
      const echartsInstance = chartRef.current.getEchartsInstance();
      const url = echartsInstance.getDataURL({
        pixelRatio: 2,
        backgroundColor: '#fff'
      });
      const a = document.createElement('a');
      a.href = url;
      a.download = `${chartType}_${selectedColumn}_chart.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  // Get data for chart
  const categories = getCategories(excelData);
  const values = getValues(excelData, selectedColumn);

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl p-6 mb-6 shadow-lg">
      <ReactECharts
        ref={chartRef}
        option={getChartOption(chartType, selectedColumn, categories, values, excelData)}
        style={{ height: 500, width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
      <div className="flex justify-end mt-4">
        <button
          onClick={downloadPNG}
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-2 px-6 rounded-lg shadow transition-all"
        >
          📥 Download Chart
        </button>
      </div>
    </div>
  );
};

export default ChartDisplay;