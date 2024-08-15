import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        status: {
          normal: "hsl(var(--status-normal))",
          warning: "hsl(var(--status-warning))",
          danger: "hsl(var(--status-danger))",
        },
        back: {
          DEFAULT: "#f9f9f9",
          primary: "#f9f9f9",
        },
      },
      screens: {
        "phone-xs": "320px",
        "phone-sm": "420px",
        "phone-md": "528px",
        "phone-lg": "648px",
        "phone-xl": "768px",
        "tablet-xs": "832px",
        "tablet-sm": "896px",
        "tablet-md": "960px",
        "tablet-lg": "1024px",
        "tablet-xl": "1200px",
        "desktop-xs": "1280px",
        "desktop-sm": "1366px",
        "desktop-md": "1440px",
        "desktop-lg": "1680px",
        "desktop-xl": "1920px",
        "desktop-1.5xl": "2048px",
        "desktop-2xl": "2560px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
      "pulse": {
        "0%, 100%": { opacity: "1" },
        "50%": { opacity: "0.5" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
      "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
