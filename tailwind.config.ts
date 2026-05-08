import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "neon-pink": "#ff007f",
        "neon-blue": "#00cfff",
        "neon-green": "#39ff14",
        "deep-black": "#050508",
        charcoal: "#0d0d14",
        "glass-white": "rgba(255,255,255,0.06)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "neon-pink": "0 0 20px rgba(255,0,127,0.6), 0 0 60px rgba(255,0,127,0.2)",
        "neon-blue": "0 0 20px rgba(0,207,255,0.6), 0 0 60px rgba(0,207,255,0.2)",
        "neon-green": "0 0 20px rgba(57,255,20,0.6), 0 0 60px rgba(57,255,20,0.2)",
        "glow-sm": "0 0 10px rgba(0,207,255,0.4)",
        "glow-lg": "0 0 40px rgba(0,207,255,0.3), 0 0 80px rgba(255,0,127,0.15)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(135deg, #050508 0%, #0d0d20 50%, #050508 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        "pink-blue":
          "linear-gradient(135deg, #ff007f 0%, #00cfff 100%)",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%) skewX(-15deg)" },
          "100%": { transform: "translateX(200%) skewX(-15deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.5s infinite",
        float: "float 4s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
