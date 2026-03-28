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
        base: "#050816",
        panel: "#0B1226",
        cyanGlow: "#54f3ff",
        pinkGlow: "#ff5edb",
        violetGlow: "#8c68ff",
        textDim: "#9eb3d9"
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "\"Segoe UI\"",
          "sans-serif"
        ],
        display: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "\"Segoe UI\"",
          "sans-serif"
        ]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(84,243,255,0.22), 0 0 32px rgba(140,104,255,0.2)",
        neon: "0 0 28px rgba(255,94,219,0.28)"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)"
      },
      animation: {
        float: "float 10s ease-in-out infinite",
        shine: "shine 4s linear infinite",
        marquee: "marquee 26s linear infinite"
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
        }
      }
    }
  },
  plugins: []
};

export default config;
