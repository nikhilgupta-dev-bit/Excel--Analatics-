'use client'
import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import ColumnSelector from "./components/ColumnSelector";
import ChartTypeSelector from "./components/ChartTypeSelector";
import ChartDisplay from "./components/ChartDisplay";
import DataSummary from "./components/DataSummary";
import DataTable from "./components/DataTable";

const Dashboard = () => {
  const [excelData, setExcelData] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [chartType, setChartType] = useState('pie');

  // Handle data loaded from file upload
  const handleDataLoaded = (data) => {
    setExcelData(data);
    setSelectedColumn(data.headers[1]); // Default to first numeric column
  };

  return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-2xl mt-8 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700 dark:text-indigo-300">
          Dynamic Excel Data Visualization
        </h1>

        {/* File Upload Component */}
        <FileUpload onDataLoaded={handleDataLoaded} />

        {excelData && (
            <>
              {/* Column Selection Component */}
              <ColumnSelector 
                excelData={excelData} 
                selectedColumn={selectedColumn} 
                onColumnChange={setSelectedColumn} 
              />

              {/* Chart Type Selection Component */}
              <ChartTypeSelector 
                chartType={chartType} 
                onChartTypeChange={setChartType} 
              />

              {/* Chart Display Component */}
              <ChartDisplay 
                chartType={chartType} 
                selectedColumn={selectedColumn} 
                excelData={excelData} 
              />

              {/* Data Summary Component */}
              <DataSummary 
                excelData={excelData} 
                selectedColumn={selectedColumn} 
              />

              {/* Data Table Component */}
              <DataTable excelData={excelData} />
            </>
        )}
      </div>
  );
};

export default Dashboard;
