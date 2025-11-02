/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Zista Brand Colors - Official Design System
        'golden-honey': {
          DEFAULT: '#F9C74F',
          light: '#FFDAA3',
          dark: '#E5B03B',
        },
        'deep-indigo': {
          DEFAULT: '#312E81',
          light: '#4C4799',
          dark: '#1E1B4D',
        },
        'soft-white': {
          DEFAULT: '#F5F5F7',
          dark: '#E8E8EA',
        },
        'accent-cyan': {
          DEFAULT: '#3ABFF8',
          light: '#7DD3FC',
          dark: '#0EA5E9',
        },
        // Legacy support (map to new colors)
        primary: {
          50: '#FFDAA3',
          100: '#FFDAA3',
          200: '#F9C74F',
          300: '#F9C74F',
          400: '#F9C74F',
          500: '#F9C74F',
          600: '#E5B03B',
          700: '#E5B03B',
          800: '#E5B03B',
          900: '#E5B03B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
