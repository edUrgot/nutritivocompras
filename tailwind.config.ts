import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef3fb",
          100: "#d8e5f7",
          500: "#4e82d7",
          700: "#244b82",
          900: "#16345d"
        },
        accent: {
          400: "#f2c547",
          500: "#ecb71e"
        },
        surface: "#f5f7fb",
        ink: "#1b2430"
      },
      boxShadow: {
        card: "0 18px 40px rgba(22, 52, 93, 0.08)"
      },
      borderRadius: {
        xl2: "1.5rem"
      }
    }
  },
  plugins: []
};

export default config;
