"use client";
import React from 'react';

const footer = () => {
  return (
    <footer className="w-full text-center text-gray-600 dark:text-gray-300 py-6 mt-12 border-t border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-inner font-medium flex flex-col items-center gap-2 transition-all duration-500">
      <span className="flex items-center justify-center gap-2">
        <span className="animate-pulse text-indigo-500 text-xl">📊</span>
        &copy; {new Date().getFullYear()} Excel Analytics App &amp; Recharts.
      </span>
      <span className="text-xs text-gray-400 dark:text-gray-600">Crafted with Next.js &amp; Tailwind CSS</span>
    </footer>
  );
};

export default footer;
