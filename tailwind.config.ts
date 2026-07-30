import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#F26522",
          "orange-hover": "#D9541A",
          "orange-tint": "#FDE8DA",
          black: "#111111",
          "black-2": "#1A1A1A",
          gray: "#5A5A5A",
          "gray-2": "#6B7280",
        },
        whatsapp: "#25D366",
      },
      fontFamily: {
        display: ["var(--font-display)", "Anton", "Bebas Neue", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1280px",
      },
      boxShadow: {
        card: "0 2px 12px rgba(17,17,17,0.06)",
        "card-hover": "0 6px 24px rgba(17,17,17,0.10)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
