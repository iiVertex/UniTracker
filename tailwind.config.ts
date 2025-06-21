import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        lightGray: '#F5F6FA',
        black: '#171717',
        red: {
          DEFAULT: '#E53935',
          light: '#FFEBEE',
          dark: '#B71C1C',
        },
        card: '#F5F6FA',
      },
      fontFamily: {
        primary: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        secondary: ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
        '5xl': '48px',
        '6xl': '64px',
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
      },
      maxWidth: {
        'container-sm': '640px',
        'container-md': '768px',
        'container-lg': '1024px',
        'container-xl': '1280px',
        'container-2xl': '1536px',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
      },
      boxShadow: {
        subtle: '0 2px 8px rgba(30,136,229,0.10)',
        card: '0 4px 16px rgba(30,136,229,0.12)',
        'card-hover': '0 8px 32px rgba(30,136,229,0.18)',
      },
      backgroundImage: {
        'gradient-vibrant': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'gradient-purple': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      },
      animation: {
        'pulse-subtle': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionDuration: {
        '200': '200ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config 