import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      dark: "#13070C",
      light: "#F9F9F9",
      red: "#B80C09",
      blue: {
        dark: "#235789",
        light: "#AFECE7",
      },
    },
  },
  plugins: [],
};
export default config;
