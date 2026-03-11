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
        primary: {
          50: "#f8fafc",
          500: "#64748b",
          700: "#334155",
          900: "#0f172a",
        },
        accent: {
          500: "#14b8a6",
          600: "#0d9488", // Open Worship 브랜드 틸
          700: "#0f766e",
        },
        brand: {
          teal: "#0d9488",
          tealDark: "#0f766e",
          gray: "#4d4d4d",
        },
        background: "#fefefe",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-pretendard)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-cta":
          "linear-gradient(135deg, #f0fdfa 0%, #fefefe 50%, #ccfbf1 30%)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
