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
        "deep-black": "#03030a",
        charcoal: "#080810",
        "surface": "#0c0c18",
        "surface-2": "#10101e",
        "glass-white": "rgba(255,255,255,0.06)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "neon-pink": "0 0 25px rgba(255,0,127,0.7), 0 0 80px rgba(255,0,127,0.25)",
        "neon-pink-sm": "0 0 12px rgba(255,0,127,0.5), 0 0 30px rgba(255,0,127,0.15)",
        "neon-blue": "0 0 25px rgba(0,207,255,0.7), 0 0 80px rgba(0,207,255,0.25)",
        "neon-blue-sm": "0 0 12px rgba(0,207,255,0.5), 0 0 30px rgba(0,207,255,0.15)",
        "neon-green": "0 0 25px rgba(57,255,20,0.7), 0 0 80px rgba(57,255,20,0.25)",
        "neon-green-sm": "0 0 12px rgba(57,255,20,0.5), 0 0 30px rgba(57,255,20,0.15)",
        "glow-sm": "0 0 14px rgba(0,207,255,0.5)",
        "glow-lg": "0 0 60px rgba(0,207,255,0.3), 0 0 120px rgba(255,0,127,0.15)",
        "card": "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
        "card-hover": "0 16px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,207,255,0.2)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(160deg, #03030a 0%, #0a0518 40%, #030310 70%, #03030a 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        "pink-blue": "linear-gradient(135deg, #ff007f 0%, #00cfff 100%)",
        "blue-green": "linear-gradient(135deg, #00cfff 0%, #39ff14 100%)",
        "section-dark": "linear-gradient(180deg, #03030a 0%, #08080f 50%, #03030a 100%)",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-150%) skewX(-20deg)" },
          "100%": { transform: "translateX(250%) skewX(-20deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(255,0,127,0.3)" },
          "50%": { borderColor: "rgba(0,207,255,0.6)" },
        },
        "ping-slow": {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite",
        float: "float 4s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2.5s ease-in-out infinite",
        "border-glow": "border-glow 3s ease-in-out infinite",
        "ping-slow": "ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
