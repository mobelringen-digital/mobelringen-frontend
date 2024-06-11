import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1448px",
      xxl: "1448px",
    },
    colors: {
      red: "#FF3E3E",
      "dark-red": "#7F2828",
      brown: "#3F1414",
      cream: "#FEF0E5",
      powder: "#FFDBD2",
      "powder-dark": "#FAD0C5",
      "purple-light": "#FBDEEC",
      purple: "#F5CCE2",
      sand: "#F8F4F1",
      "warm-grey": "#F0EBE5",
      "warm-grey-dark": "#E6DFD6",
      beige: "#E5CFC2",
      white: "#FFFFFF",
      grey: "#78706D",
      "cold-grey-light": "#F1EFEE",
      "cold-grey-dark": "#E1DDDA",
      "dark-grey": "#786E6D",
      black: "#1A1110",
      "success-light": "#DFF5D5",
      success: "#39A627",
      "success-dark": "#1D780E",
      "warning-light": "#FFECBA",
      warning: "#F7B200",
      "warning-dark": "#8B6400",
      "error-light": "#FFE7E5",
      error: "#C82B2B",
    },
    extend: {
      borderWidth: {
        12: "12px",
        16: "16px",
      },
      zIndex: {
        "100": "100",
        "200": "200",
      },
      fontFamily: {
        feature: ["Feature Deck Web", "sans-serif"],
        suisse: ["Suisse Intl", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "header-menu": "0px 2px 12px 0px rgba(91, 56, 56, 0.05)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
