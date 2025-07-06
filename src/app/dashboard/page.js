// File: dashboard/page.js (lowercase, correct route)
"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import ReactECharts from "echarts-for-react";

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState([]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      //  edge case the size of file is zero 
      if(data.length === 0) {
        alert("No data in the file");
      }
      // Assume first row is header, rest are data
      if (data.length < 2) return;
      
      const labels = data[0];
      const rows = data.slice(1);
      
      // For pie chart, use first column as category, second as value
      const cats = rows.map((row) => row[0]).filter(cat => cat); // Filter out empty values
      const vals = rows.map((row) => {
        // Try multiple columns if second column is empty/zero
        let val = Number(row[1]);
        if (isNaN(val) || val === 0) {
          // Try third column, fourth column, etc.
          for (let i = 2; i < row.length; i++) {
            const altVal = Number(row[i]);
            if (!isNaN(altVal) && altVal > 0) {
              val = altVal;
              break;
            }
          }
        }
        // If still 0, assign a default value of 1 for visualization
        return isNaN(val) || val === 0 ? 1 : val;
      });
      
      // Debug logging (removed for production)
      // console.log('Categories:', cats);
      // console.log('Values:', vals);
      // console.log('Raw rows:', rows);
      // console.log('Labels:', labels);
      
      // Check if all values are 0
      const totalValue = vals.reduce((sum, val) => sum + val, 0);
      // console.log('Total value:', totalValue);
      
      if (totalValue === cats.length) {
        alert('Warning: Using default values (1) for all categories. Please check your Excel data format.');
      }
      
      setCategories(cats);
      setValues(vals);
      setChartData({ labels, rows });
    };
    reader.readAsBinaryString(file);
  };

  // Download CSV logic
  const handleDownloadCSV = () => {
    if (!categories.length || !values.length) return;
    let csv = 'Category,Value\n';
    categories.forEach((cat, i) => {
      csv += `"${cat}",${values[i]}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pie_chart_data_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Enhanced 3D-like pie chart option
  const getOption = () => ({
    title: {
      text: "Excel Data Visualization",
      left: "center",
      top: 10,
      textStyle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333"
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
      backgroundColor: "rgba(0,0,0,0.8)",
      textStyle: {
        color: "#fff"
      }
    },
    legend: {
      top: '15%',
      left: 'center',
      orient: 'horizontal'
    },
    series: [
      {
        name: "Data",
        type: "pie",
        radius: ['15%', '65%'], // Donut style for more 3D-like appearance
        center: ['50%', '60%'],
        // Remove roseType for standard pie chart
        avoidLabelOverlap: false,
        label: {
          show: true,
          fontSize: 14,
          fontWeight: 'bold',
          color: '#333'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: "bold",
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        data: categories.map((cat, i) => ({ 
          value: values[i], 
          name: cat,
          itemStyle: {
            // Enhanced 3D-like effects
            shadowBlur: 20,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowOffsetX: 5,
            shadowOffsetY: 5,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: '#fff'
          }
        })),
      },
    ],
    // Add background for better 3D effect
    backgroundColor: '#f8f9fa',
    // Add animation for better visual appeal
    animation: true,
    animationType: 'scale',
    animationEasing: 'elasticOut',
    animationDelay: function (idx) {
      return Math.random() * 200;
    }
  });

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-2xl mt-8 border border-gray-200 dark:border-gray-800 backdrop-blur-xl transition-all duration-500">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700 dark:text-indigo-300 tracking-tight drop-shadow-lg">
        Upload Excel File for Visualization
      </h2>
      <div className="mb-8">
        <label className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-200">Select Excel File</label>
        <input
          type="file"
          accept=".xls,.xlsx"
          onChange={handleUpload}
          className="block w-full border border-indigo-300 dark:border-indigo-700 rounded-xl px-4 py-3 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all shadow-sm"
        />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Upload an Excel file with data in the first two columns (Category, Value)
        </p>
      </div>

      {categories.length > 0 && values.length > 0 && (
        <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-4 mb-8 shadow-xl border border-indigo-100 dark:border-indigo-800 transition-all duration-500">
          <ReactECharts 
            option={getOption()} 
            style={{ height: 500, width: '100%' }} 
            opts={{ renderer: 'canvas' }}
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={handleDownloadCSV}
              className="bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white font-semibold py-2 px-6 rounded-lg shadow transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-700"
            >
              Download CSV
            </button>
          </div>
        </div>
      )}

      {chartData && (
        <div className="mt-8">
          <h3 className="font-semibold mb-3 text-xl text-indigo-700 dark:text-indigo-300">Raw Data Preview:</h3>
          <div className="mb-4 p-3 bg-indigo-50 dark:bg-indigo-900/40 rounded-lg shadow">
            <p className="text-sm text-indigo-800 dark:text-indigo-200">
              <strong>Data Summary:</strong> {categories.length} categories, 
              Total value: {values.reduce((sum, val) => sum + val, 0)}
            </p>
          </div>
          <div className="bg-white/80 dark:bg-gray-900/80 p-4 rounded-xl overflow-auto max-h-[300px] border border-indigo-100 dark:border-indigo-800 shadow-sm transition-all duration-500">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-indigo-100 dark:bg-indigo-900/40">
                  {chartData.labels.map((label, i) => (
                    <th key={i} className="px-2 py-1 text-left font-semibold text-indigo-700 dark:text-indigo-200">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chartData.rows.map((row, i) => (
                  <tr key={i} className="border-b border-indigo-50 dark:border-indigo-800 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/30 transition-all">
                    {row.map((cell, j) => (
                      <td key={j} className="px-2 py-1 text-gray-800 dark:text-gray-100">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;