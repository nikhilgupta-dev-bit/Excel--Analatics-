'use client'
import React from "react";

/**
 * Data Table component for displaying raw Excel data
 * @param {Object} excelData - The Excel data object
 */
const DataTable = ({ excelData }) => {
  if (!excelData) return null;

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl overflow-hidden shadow-lg">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4">
        <h3 className="text-lg font-semibold">Raw Data Preview</h3>
      </div>
      <div className="overflow-x-auto max-h-64">
        <table className="w-full text-sm">
          <thead className="bg-indigo-100 dark:bg-indigo-900/60 sticky top-0">
            <tr>
              {excelData.headers.map((header, i) => (
                <th key={i} className="px-4 py-3 text-left font-semibold text-indigo-700 dark:text-indigo-200">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {excelData.rows.map((row, i) => (
              <tr key={i} className="border-b border-indigo-50 dark:border-indigo-800/50 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/20">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3 text-gray-800 dark:text-gray-200">
                    {typeof cell === 'number' ? cell.toLocaleString() : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
