// File: components/FileUploader.jsx
"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import ReactECharts from "echarts-for-react";

const FileUploader = () => {
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
      
      // Assume first row is header, rest are data
      if (data.length < 2) return;
      
      const labels = data[0];
      const rows = data.slice(1);
      
      // For pie chart, use first column as category, second as value
      const cats = rows.map((row) => row[0]).filter(cat => cat); // Filter out empty values
      const vals = rows.map((row) => Number(row[1]) || 0); // Handle NaN values
      
      setCategories(cats);
      setValues(vals);
      setChartData({ labels, rows });
    };
    reader.readAsBinaryString(file);
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
        radius: ['15%', '60%'], 
        center: ['50%', '65%'],
      
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
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Upload Excel File for Visualization
      </h2>
      
      <div className="mb-6">
        <input
          type="file"
          accept=".xls,.xlsx"
          onChange={handleUpload}
          className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="text-sm text-gray-600 mt-2">
          Upload an Excel file with data in the first two columns (Category, Value)
        </p>
      </div>

      {categories.length > 0 && values.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <ReactECharts 
            option={getOption()} 
            style={{ height: 500, width: '100%' }} 
            opts={{ renderer: 'canvas' }}
          />
        </div>
      )}

      {chartData && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2 text-lg text-gray-800">
            Raw Data Preview:
          </h3>
          <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-[300px]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-200">
                  {chartData.labels.map((label, i) => (
                    <th key={i} className="px-2 py-1 text-left font-semibold">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chartData.rows.map((row, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    {row.map((cell, j) => (
                      <td key={j} className="px-2 py-1">
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

export default FileUploader;