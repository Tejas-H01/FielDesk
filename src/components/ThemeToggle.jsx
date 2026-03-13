import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-500 active:scale-95 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-200 ${className}`}
    >
      <span className="absolute inset-0 rounded-full bg-brand-200/40 opacity-0 transition duration-200 group-active:opacity-100 dark:bg-brand-500/20" />
      <span className="relative flex h-5 w-5 items-center justify-center">
        <Sun
          className={`absolute h-4 w-4 transition duration-200 ${
            isDark ? "scale-75 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
          }`}
        />
        <Moon
          className={`absolute h-4 w-4 transition duration-200 ${
            isDark ? "scale-100 rotate-0 opacity-100" : "scale-75 -rotate-90 opacity-0"
          }`}
        />
      </span>
    </button>
  );
};

export default ThemeToggle;
