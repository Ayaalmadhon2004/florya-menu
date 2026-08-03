import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: "#722F37",
          dark: "#5A252C",
          light: "#9B4D55",
        },
        beige: {
          DEFAULT: "#F5F0EB",
          dark: "#E8DFD5",
        },
        text: {
          primary: "#2C1810",
          secondary: "#8B7355",
          muted: "#B8A99A",
        },
        accent: {
          hot: "#C0392B",
          new: "#27AE60",
          veg: "#059669",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
