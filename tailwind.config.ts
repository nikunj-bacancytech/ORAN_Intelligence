import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        surface: "#f4f6f3",
        ink: "#112118",
        accent: {
          DEFAULT: "#2f6fed",
          foreground: "#f8fbff"
        },
        success: "#0e9f6e",
        warning: "#d97706",
        danger: "#dc2626",
        telecom: {
          50: "#edf8f0",
          100: "#d6eddc",
          300: "#89c49a",
          500: "#2f7a49",
          700: "#1d4e2f",
          900: "#102a19"
        }
      },
      boxShadow: {
        panel: "0 20px 40px -24px rgba(17, 33, 24, 0.28)"
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
