import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        violet: {
          DEFAULT: "#660066",
          50: "#f9e6f9",
          100: "#f0bff0",
          200: "#e680e6",
          300: "#d940d9",
          400: "#cc00cc",
          500: "#660066",
          600: "#520052",
          700: "#3d003d",
          800: "#290029",
          900: "#140014",
        },
        winamax: "#E40520",
      },
      fontFamily: {
        title: ["var(--font-oswald)", "sans-serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
        "dart-fly": "dartFly 0.8s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
        "ripple": "ripple 0.6s linear",
        "fade-up": "fadeUp 0.5s ease forwards",
      },
      keyframes: {
        dartFly: {
          "0%": { transform: "translateX(-100vw) rotate(-45deg)", opacity: "0" },
          "60%": { opacity: "1" },
          "100%": { transform: "translateX(0) rotate(0deg)", opacity: "1" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.6" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
        fadeUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-violet": "linear-gradient(135deg, #660066 0%, #330033 100%)",
        "gradient-hero": "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(102,0,102,0.7) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
