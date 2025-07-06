"use client";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-12 h-12 bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-800 rounded-full shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:rotate-12 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800"
      aria-label="Toggle theme"
    >
      <span className="text-2xl transition-transform duration-300">
        {theme === "dark" ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
