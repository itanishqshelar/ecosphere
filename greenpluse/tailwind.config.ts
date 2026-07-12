import type { Config } from "tailwindcss";

// In Tailwind v4, most theme configuration lives in globals.css via @theme.
// This file is kept minimal.
const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
