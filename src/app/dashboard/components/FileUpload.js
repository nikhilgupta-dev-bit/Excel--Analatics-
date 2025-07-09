'use client'
import React from "react";
import { generateSampleData } from "../utils/dataUtils";

/**
 * File Upload component for Excel files
 * @param {Function} onDataLoaded - Callback function when data is loaded
 */
const FileUpload = ({ onDataLoaded }) => {
  // Handle file upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Simulate reading Excel data
    const reader = new FileReader();
    reader.onload = (evt) => {
      // Get sample data (in a real app, this would parse the actual file)
      const sampleData = generateSampleData();

      // Call the callback with the data
      onDataLoaded(sampleData);
    };
    reader.readAsText(file);
  };

  return (
    <div className="mb-6">
      <label className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-200">
        Upload Excel File
      </label>
      <input
        type="file"
        accept=".xls,.xlsx,.csv"
        onChange={handleUpload}
        className="block w-full border border-indigo-300 dark:border-indigo-600 rounded-lg px-4 py-3 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        For demo purposes, any file upload will load sample data. First column should be categories, others should be numeric.
      </p>
    </div>
  );
};

export default FileUpload;
