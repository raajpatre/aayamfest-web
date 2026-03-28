import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        base: "#131315",
        panel: "#1c1b1e",
        cyanGlow: "#00dddd",
        pinkGlow: "#ff00ff",
        violetGlow: "#a900a9",
        amberGlow: "#fd8b00",
        textDim: "#dcbed4",
        outlineSoft: "#564052"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 24px rgba(255,0,255,0.24)",
        neon: "0 0 40px rgba(0,221,221,0.12)"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)"
      },
      animation: {
        float: "float 10s ease-in-out infinite",
        shine: "shine 4s linear infinite",
        marquee: "marquee 26s linear infinite",
        sweep: "sweep 4s linear infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" }
        },
        shine: {
          from: { backgroundPosition: "0% 50%" },
          to: { backgroundPosition: "200% 50%" }
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" }
        },
        sweep: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(180%)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
