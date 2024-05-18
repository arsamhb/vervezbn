import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {},
      padding: {
        standard: "1rem 2rem 5rem 15rem",
      },
    },
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
  plugins: [
    plugin(function ({ addUtilities, addComponents, e, config }) {
      addUtilities({
        ".standard-padding": {
          padding: "1rem 1rem",
          "@screen md": {
            padding: "1rem 2rem",
          },
          "@screen lg": {
            padding: "1rem 5rem",
          },
          "@screen xl": {
            padding: "1rem 15rem",
          },
        },
        ".standard-margin": {
          margin: "0 1rem",
          "@screen md": {
            margin: "0 2rem",
          },
          "@screen lg": {
            margin: "0 5rem",
          },
          "@screen xl": {
            margin: "0 15rem",
          },
        },
      });
    }),
  ],
};
export default config;
