/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f7f7f8",
          100: "#e8e9ec",
          200: "#c8cbd3",
          300: "#a3a8b6",
          400: "#7a8194",
          500: "#5b6171",
          600: "#454a58",
          700: "#333742",
          800: "#20232b",
          900: "#12141a",
        },
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        steel: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        success: "#14b886",
        warning: "#f59e0b",
        danger: "#ef4444",
      },
      fontFamily: {
        display: ["IBM Plex Sans", "sans-serif"],
        body: ["IBM Plex Sans", "sans-serif"],
        ui: ["Inter", "sans-serif"],
        headline: ["Oswald", "sans-serif"],
      },
      boxShadow: {
        soft: "0 14px 30px -18px rgba(15, 23, 42, 0.35)",
        card: "0 12px 32px -20px rgba(15, 23, 42, 0.5)",
      },
      borderRadius: {
        xl: "1.25rem",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
