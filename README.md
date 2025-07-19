# Excel Analytics Web Application

A modern web application for Excel data visualization and analysis built with Next.js.

## 🚀 Features

- **User Authentication**: Secure login and registration using Clerk
- **Excel File Upload**: Upload Excel files for analysis
- **Dynamic Visualization**: Generate various chart types from your data
- **Data Summary**: View statistical summaries of your data
- **Interactive Dashboard**: Explore your data with an intuitive interface
- **Dark/Light Mode**: Choose your preferred theme

## 📋 Prerequisites

- Node.js 18.x or later
- npm or yarn package manager
- Modern web browser

## 🛠️ Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/excel-analytics.git
```

2. Navigate to the project directory
```bash
cd excel-analytics
```

3. Install dependencies
```bash
npm install
# or
yarn install
```

4. Set up environment variables
Create a `.env` file in the root directory with the following variables:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

5. Run the development server
```bash
npm run dev
# or
yarn dev
```

## 🎯 Quick Start

1. **Register/Login**: Create an account or log in using the authentication system
2. **Upload Excel File**: Use the file upload component to upload your Excel data
3. **Select Data**: Choose which column to visualize
4. **Choose Chart Type**: Select from various chart types (pie, bar, line, etc.)
5. **Explore Data**: View the generated chart and data summary
6. **Download Chart**: Save your visualization as a PNG image

## 🔧 Technologies Used

- **Next.js**: React framework for server-rendered applications
- **React**: JavaScript library for building user interfaces
- **Clerk**: Authentication and user management
- **ECharts**: Powerful charting library
- **TailwindCSS**: Utility-first CSS framework

## 📦 Production Deployment

To build the application for production:

```bash
npm run build
# or
yarn build
```

Then start the production server:

```bash
npm start
# or
yarn start
```

## 🧪 Testing

This project uses Jest for testing. Run tests with:

```bash
npm test
# or
yarn test
```
