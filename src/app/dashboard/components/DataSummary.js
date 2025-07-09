'use client'
import React from "react";
import { getCategories, getValues } from "../utils/dataUtils";

/**
 * Data Summary component for displaying statistics about the selected data
 * @param {Object} excelData - The Excel data object
 * @param {string} selectedColumn - Selected data column
 */
const DataSummary = ({ excelData, selectedColumn }) => {
  // Get data for calculations
  const categories = getCategories(excelData);
  const values = getValues(excelData, selectedColumn);

  // Calculate statistics
  const total = values.reduce((sum, val) => sum + val, 0);
  const average = values.length > 0 ? Math.round(total / values.length) : 0;
  const maximum = values.length > 0 ? Math.max(...values) : 0;

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/40 rounded-xl p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4 text-indigo-700 dark:text-indigo-300">
        Data Summary for {selectedColumn}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-indigo-600">{categories.length}</div>
          <div className="text-sm text-gray-600">Categories</div>
        </div>
        <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">
            {total.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
        <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">
            {average.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Average</div>
        </div>
        <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">
            {maximum.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Maximum</div>
        </div>
      </div>
    </div>
  );
};

export default DataSummary;
