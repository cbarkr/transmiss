import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#f2f5fb',
          100: '#e7edf8',
          200: '#d3ddf2',
          300: '#b8c6e9',
          400: '#9ba9de',
          500: '#7c88d0',
          600: '#696fc2',        
          700: '#585caa',
          800: '#494d8a',
          900: '#40446f',
          950: '#252641',
        },
        'secondary': {
          50: '#f1f2fc',
          100: '#e5e8fa',
          200: '#cfd3f6',
          300: '#b2b7ef',
          400: '#9898e7',
          500: '#8079db',
          600: '#6e5ecd',
          700: '#5f4eb4',
          800: '#4d4291',
          900: '#423b74',
          950: '#272244',
        },
        'tertiary': {
          50: '#fbf4f8',
          100: '#f8ebf2',
          200: '#f2d8e6',
          300: '#e9b8d2',
          400: '#e09ebf',
          500: '#cb6997',
          600: '#b74b79',
          700: '#9d3961',
          800: '#823250',
          900: '#6e2d46',
          950: '#421526',
        },
        'success': {
          50: '#effaf1',
          100: '#d9f2dc',
          200: '#b5e5be',
          300: '#7ece92',
          400: '#52b56e',
          500: '#2f9a50',
          600: '#207b3f',
          700: '#1a6235',
          800: '#174e2c',
          900: '#134125',
          950: '#0a2415',
        },
        'error': {
          50: '#fbf5f5',
          100: '#f8e8e8',
          200: '#f3d5d5',
          300: '#e9b8b8',
          400: '#da8f8f',
          500: '#d07c7c',
          600: '#b44e4e',
          700: '#963f3f',
          800: '#7d3737',
          900: '#693333',
          950: '#381717',
        },
      }
    }
  },
  plugins: [],
}
export default config
