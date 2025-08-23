import { heroui } from '@heroui/theme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-ibm-plex-sans)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      mono: ['var(--font-ibm-plex-mono)', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
    },
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          DEFAULT: '#b31b34', // Allied World Red
          foreground: '#ffffff',
        },
        success: {
          50: '#f0fdf9',
          100: '#ccfbef',
          200: '#99f6e0',
          300: '#5de9c7',
          400: '#2dd4aa',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#006263', // Your specified color
          900: '#004d4e',
          DEFAULT: '#006263', // Your specified color as default
          foreground: '#ffffff',
        },
        // Semantic colors using your brand
        warning: '#f59e0b',
        error: '#b31b34', // Using your brand red for errors
        info: '#3b82f6',
        // Custom input text color
        'input-text': '#979797',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              50: '#fef2f2',
              100: '#fee2e2',
              200: '#fecaca',
              300: '#fca5a5',
              400: '#f87171',
              500: '#ef4444',
              600: '#dc2626',
              700: '#b91c1c',
              800: '#991b1b',
              900: '#7f1d1d',
              DEFAULT: '#b31b34', // Allied World Red
              foreground: '#ffffff',
            },
            success: '#10b981',
            warning: '#f59e0b',
            danger: '#b31b34', // Using your brand red
            secondary: '#6b7280',
          },
        },
      },
    }),
  ],
};
