import ThemeProvider from "./components/ThemeProvider";
import ThemeToggle from "./components/ThemeToggle";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: 'Excel Analytics App',
  description: 'Upload Excel files and visualize your data with beautiful charts',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body>
          <ThemeProvider>
            {/* Theme toggle fixed at top-right for accessibility */}
            <div className="fixed top-4 right-4 z-50">
              <ThemeToggle />
            </div>
            {/* Main content in a modern card-like container */}
            <main className="max-w-5xl mx-auto px-4 py-10 sm:py-14 md:py-20">
              <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 sm:p-10 transition-colors duration-500 backdrop-blur-md">
                {children}
              </div>
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}