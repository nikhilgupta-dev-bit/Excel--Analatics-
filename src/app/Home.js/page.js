"use client";
import React from 'react';
import Image from 'next/image';

const Home = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-transparent">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 p-6 md:p-10 rounded-3xl shadow-2xl bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-800 backdrop-blur-xl transition-all duration-500">
        {/* Left Section: Title and Description */}
        <section className="flex-1 flex flex-col items-start justify-center">
          <h1 className="font-extrabold text-5xl md:text-7xl text-indigo-700 dark:text-indigo-400 mb-6 leading-tight drop-shadow-lg">
            Excel Analytics
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 mb-8 font-medium">
            Unlock insights from your spreadsheets.<br />
            <span className="text-indigo-600 dark:text-indigo-300">Upload Excel files and visualize your data with beautiful, interactive charts.</span>
          </p>
          <ul className="list-none pl-0 text-gray-700 dark:text-gray-300 space-y-3 mb-10">
            <li className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-indigo-500 rounded-full"></span>
              <span>Supports <span className="font-semibold">.xlsx</span> and <span className="font-semibold">.xls</span> formats</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-indigo-500 rounded-full"></span>
              <span>Instant chart previews</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-indigo-500 rounded-full"></span>
              <span>Simple, secure, and private</span>
            </li>
          </ul>
          <button className="bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white font-bold py-3 px-10 rounded-xl shadow-lg transition-all text-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 active:scale-95 animate-bounce-slow">
            Get Started
          </button>
        </section>

        {/* Right Section: Analytics Showcase */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full flex justify-center mb-6">
            <div className="relative w-[320px] md:w-[420px] h-[200px] md:h-[280px] rounded-2xl overflow-hidden shadow-xl border-4 border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 transition-all duration-500">
              <Image
                src="/home page.png"
                alt="Excel Chart Example"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-2xl"
                priority
              />
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 border border-indigo-200 dark:border-indigo-700 rounded-xl px-8 py-6 shadow flex flex-col items-center mt-2 transition-all duration-500">
            <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-2 tracking-tight">Analytics Showcase</h2>
            <p className="text-gray-800 dark:text-gray-200 text-center text-lg">
              See how your data transforms into actionable insights<br />
              with clean, modern charts. That helps you make informed decisions.
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2.2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;