// Data utility functions for Excel data processing

/**
 * Get categories (first column) from Excel data
 * @param {Object} excelData - The Excel data object
 * @returns {Array} - Array of category names
 */
export const getCategories = (excelData) => {
  if (!excelData) return [];
  return excelData.rows.map(row => row[0]);
};

/**
 * Get values for selected column from Excel data
 * @param {Object} excelData - The Excel data object
 * @param {string} selectedColumn - The column name to get values for
 * @returns {Array} - Array of numeric values
 */
export const getValues = (excelData, selectedColumn) => {
  if (!excelData || !selectedColumn) return [];
  const columnIndex = excelData.headers.indexOf(selectedColumn);
  if (columnIndex === -1) return [];

  return excelData.rows.map(row => {
    const value = row[columnIndex];
    return typeof value === 'number' ? value : parseFloat(value) || 0;
  });
};

/**
 * Get numeric columns for dropdown (excludes first column which is categories)
 * @param {Object} excelData - The Excel data object
 * @returns {Array} - Array of column names
 */
export const getNumericColumns = (excelData) => {
  if (!excelData) return [];
  return excelData.headers.slice(1); // Exclude first column (categories)
};

/**
 * Generate sample Excel data for demo purposes
 * @returns {Object} - Sample Excel data object
 */
export const generateSampleData = () => {
  return {
    headers: ['Product', 'Sales', 'Revenue', 'Units', 'Profit'],
    rows: [
      ['Laptops', 25000, 125000, 50, 12500],
      ['Phones', 35000, 175000, 70, 17500],
      ['Tablets', 15000, 75000, 30, 7500],
      ['Headphones', 8000, 40000, 80, 4000],
      ['Keyboards', 5000, 25000, 100, 2500],
      ['Mice', 3000, 15000, 150, 1500]
    ]
  };
};