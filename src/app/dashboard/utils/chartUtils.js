// Chart utility functions for data visualization

/**
 * Generate colors for charts
 * @param {number} count - Number of colors needed
 * @returns {Array} - Array of color hex codes
 */
export const generateColors = (count) => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D2B4DE'
  ];
  return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
};

/**
 * Get chart options based on chart type and data
 * @param {string} chartType - Type of chart (pie, bar, line, scatter)
 * @param {string} selectedColumn - Selected data column
 * @param {Array} categories - Array of category names
 * @param {Array} values - Array of values for the selected column
 * @param {Object} excelData - The Excel data object (used for scatter plot)
 * @returns {Object} - ECharts configuration object
 */
export const getChartOption = (chartType, selectedColumn, categories, values, excelData) => {
  const colors = generateColors(categories.length);

  const baseConfig = {
    backgroundColor: '#f8f9fa',
    animation: true,
    animationEasing: 'elasticOut',
    tooltip: {
      backgroundColor: "rgba(0,0,0,0.8)",
      textStyle: { color: "#fff" }
    }
  };

  switch (chartType) {
    case 'pie':
      return {
        ...baseConfig,
        title: {
          text: `${selectedColumn} Distribution`,
          left: "center",
          top: 20,
          textStyle: {
            fontSize: 20,
            fontWeight: "bold",
            color: "#333"
          }
        },
        tooltip: {
          ...baseConfig.tooltip,
          trigger: "item",
          formatter: (params) => {
            if (!params || !params.data) {
              return 'No data available';
            }
            return `${params.name}: ${params.value} (${params.percent}%)`;
          }
        },
        legend: {
          top: '15%',
          left: 'center',
          orient: 'horizontal'
        },
        series: [{
          name: selectedColumn,
          type: "pie",
          radius: ['20%', '70%'],
          center: ['50%', '60%'],
          label: {
            show: true,
            fontSize: 12,
            fontWeight: 'bold'
          },
          data: categories.map((cat, i) => ({
            value: values[i],
            name: cat,
            itemStyle: {
              color: colors[i],
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            }
          }))
        }]
      };

    case 'bar':
      return {
        ...baseConfig,
        title: {
          text: `${selectedColumn} Comparison`,
          left: "center",
          top: 20,
          textStyle: {
            fontSize: 20,
            fontWeight: "bold",
            color: "#333"
          }
        },
        tooltip: {
          ...baseConfig.tooltip,
          trigger: "axis",
          axisPointer: { type: "shadow" }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          top: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: categories,
          axisLabel: {
            rotate: categories.length > 5 ? 45 : 0,
            fontSize: 11
          }
        },
        yAxis: {
          type: 'value',
          name: selectedColumn,
          nameTextStyle: {
            fontSize: 12,
            fontWeight: 'bold'
          }
        },
        series: [{
          name: selectedColumn,
          type: 'bar',
          data: values.map((val, i) => ({
            value: val,
            itemStyle: {
              color: colors[i],
              shadowBlur: 8,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            }
          })),
          barWidth: '60%'
        }]
      };

    case 'line':
      return {
        ...baseConfig,
        title: {
          text: `${selectedColumn} Trend`,
          left: "center",
          top: 20,
          textStyle: {
            fontSize: 20,
            fontWeight: "bold",
            color: "#333"
          }
        },
        tooltip: {
          ...baseConfig.tooltip,
          trigger: "axis"
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          top: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: categories,
          boundaryGap: false,
          axisLabel: {
            rotate: categories.length > 5 ? 45 : 0,
            fontSize: 11
          }
        },
        yAxis: {
          type: 'value',
          name: selectedColumn,
          nameTextStyle: {
            fontSize: 12,
            fontWeight: 'bold'
          }
        },
        series: [{
          name: selectedColumn,
          type: 'line',
          data: values,
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            width: 3,
            color: '#4ECDC4'
          },
          itemStyle: {
            color: '#4ECDC4'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(78, 205, 196, 0.3)' },
                { offset: 1, color: 'rgba(78, 205, 196, 0.1)' }
              ]
            }
          }
        }]
      };

    case 'scatter':
      // For scatter plot, we'll use two different columns
      const secondColumn = excelData.headers.slice(1)[1] || excelData.headers.slice(1)[0];
      const secondColumnIndex = excelData.headers.indexOf(secondColumn);
      const yValues = excelData.rows.map(row => row[secondColumnIndex]);

      return {
        ...baseConfig,
        title: {
          text: `${selectedColumn} vs ${secondColumn}`,
          left: "center",
          top: 20,
          textStyle: {
            fontSize: 20,
            fontWeight: "bold",
            color: "#333"
          }
        },
        tooltip: {
          ...baseConfig.tooltip,
          trigger: "item",
          formatter: (params) => {
            if (!params.value || !Array.isArray(params.value)) {
              return 'No data available';
            }
            const [x, y] = params.value;
            return `${categories[params.dataIndex]}<br/>${selectedColumn}: ${x}<br/>${secondColumn}: ${y}`;
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          top: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          name: selectedColumn,
          nameTextStyle: {
            fontSize: 12,
            fontWeight: 'bold'
          }
        },
        yAxis: {
          type: 'value',
          name: secondColumn,
          nameTextStyle: {
            fontSize: 12,
            fontWeight: 'bold'
          }
        },
        series: [{
          name: 'Data Points',
          type: 'scatter',
          data: values.map((val, i) => [val, yValues[i]]),
          symbolSize: 12,
          itemStyle: {
            color: '#4ECDC4',
            shadowBlur: 8,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          }
        }]
      };

    default:
      return {};
  }
};
