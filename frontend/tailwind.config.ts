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
      fontSize: {
        h1: [
          "2.25rem", // 36px
          {
            lineHeight: "2.5rem", // 40px
            fontWeight: "700",
          },
        ],
        h2: [
          "1.875rem", // 30px
          {
            lineHeight: "2.25rem", // 36px
            fontWeight: "700",
          },
        ],
        h3: [
          "1.5rem", // 24px
          {
            lineHeight: "2rem", // 32px
            fontWeight: "600",
          },
        ],
        h4: [
          "1.25rem", // 20px
          {
            lineHeight: "1.75rem", // 28px
            fontWeight: "600",
          },
        ],
        h5: [
          "1rem", // 16px
          {
            lineHeight: "1.5rem", // 24px
            fontWeight: "600",
          },
        ],
        h6: [
          "0.875rem", // 14px
          {
            lineHeight: "1.25rem", // 20px
            fontWeight: "600",
          },
        ],
        p: [
          "1rem", // 16px
          {
            lineHeight: "1.5rem", // 24px
            fontWeight: "400",
          },
        ],
      },
    },
    colors: {
      // "text-light": "#AF9EB4",
      dark: "#13070C",
      light: "#F9F9F9",
      red: "#B80C09",
      primary: "#714FDB",
      "primary-light": "#E6E7FB",
      "primary-dark": "#310B5F",
      secondary: "#F8B359",
      blue: {
        dark: "#235789",
        light: "#AFECE7",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, addComponents, e, config }) {
      addUtilities({
        ".footer-padding": {
          padding: "6rem 1rem 1rem 1rem",
          "@screen md": {
            padding: "6rem 2rem 1rem 2rem",
          },
          "@screen lg": {
            padding: "6rem 5rem 1rem 5rem",
          },
          "@screen xl": {
            padding: "6rem 15rem 1rem 15rem",
          },
        },
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
        ".button": {
          padding: "8px 24px",
          borderRadius: "4px",
        },
      });
    }),
  ],
};
export default config;
