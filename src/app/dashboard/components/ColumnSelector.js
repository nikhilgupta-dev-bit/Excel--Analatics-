'use client'
import React from "react";
import { getNumericColumns } from "../utils/dataUtils";

/**
 * Column Selector component for choosing which data column to visualize
 * @param {Object} excelData - The Excel data object
 * @param {string} selectedColumn - Currently selected column
 * @param {Function} onColumnChange - Callback when column selection changes
 */
const ColumnSelector = ({ excelData, selectedColumn, onColumnChange }) => {
  // Handle column selection change
  const handleChange = (e) => {
    onColumnChange(e.target.value);
  };

  return (
    <div className="mb-6">
      <label className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-200">
        Select Data Column
      </label>
      <select
        value={selectedColumn}
        onChange={handleChange}
        className="block w-full border border-indigo-300 dark:border-indigo-600 rounded-lg px-4 py-3 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        {getNumericColumns(excelData).map(col => (
          <option key={col} value={col}>{col}</option>
        ))}
      </select>
    </div>
  );
};

export default ColumnSelector;
