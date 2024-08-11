import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "slide-in-right": "slideInRight 0.3s cubic-bezier(0.2, 0, 0, 1)",
        scaleXIn: "scaleXIn 0.3s ease",
        fadeIn: "fadeIn 0.5s ease",
        spin: "spin 2s linear infinite",
        "gradient-x": "gradient 2s ease infinite",
        typing: "typing 0.3s steps(30,end) forwards",
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
          },
          "100%": {
            width: "100%",
          },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        spin: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        scaleXIn: {
          "0%": {
            transform: "scaleX(0)",
            opacity: "0",
          },
          "100%": {
            transform: "scaleX(1)",
            opacity: "1",
          },
        },
        slideInRight: {
          "0%": {
            transform: "translateX(100%) scaleX(0)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0) scaleX(1)",
            opacity: "1",
          },
        },
      },
      colors: {
        grey1: "#f0f4f9",
        grey2: "#e9eef6",
        grey3: "#E8ECF2",
        grey4: "#c4c7c5",
        grey5: "#dde3ea",
        grey6: "#444746",
        "list-item-text": "#3c4043",
        blue1: "#d3e3fd",
      },
      backgroundImage: {
        "gradient-text":
          "linear-gradient(74deg, var(--bard-color-brand-text-gradient-stop-1) 0, var(--bard-color-brand-text-gradient-stop-2) 9%, var(--bard-color-brand-text-gradient-stop-3) 20%, var(--bard-color-brand-text-gradient-stop-3) 24%, var(--bard-color-brand-text-gradient-stop-2) 35%, var(--bard-color-brand-text-gradient-stop-1) 44%, var(--bard-color-brand-text-gradient-stop-2) 50%, var(--bard-color-brand-text-gradient-stop-3) 56%, var(--gem-sys-color--surface) 75%, var(--gem-sys-color--surface) 100%);",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
