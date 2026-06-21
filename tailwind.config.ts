// Avoid requiring tailwindcss types to prevent TypeScript errors when they're not installed
// @ts-expect-error: tailwindcss-animate may not have type declarations
import animatePlugin from 'tailwindcss-animate';
type Config = any;

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        coral: {
          DEFAULT: '#E8856A',
          50: '#FEF5F2',
          100: '#FDEAE5',
          200: '#F9D4CB',
          300: '#F4A191',
          400: '#EE8E78',
          500: '#E8856A',
          600: '#C96A50',
          700: '#A85540',
          800: '#7A3C2D',
          900: '#4D251C',
        },
        peach: {
          DEFAULT: '#FDF0EC',
          50: '#FEFCFB',
          100: '#FDF8F6',
          200: '#FDF0EC',
          300: '#F9D4CB',
          400: '#F4C0B5',
          500: '#EDAA9D',
          600: '#E08E80',
        },
        success: {
          DEFAULT: '#4CAF82',
          50: '#F0FBF5',
          100: '#D6F5E5',
          500: '#4CAF82',
          600: '#3D9B6F',
        },
        warning: {
          DEFAULT: '#F5A623',
          50: '#FEF9EE',
          100: '#FDF0D3',
          500: '#F5A623',
          600: '#D4881A',
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'coral-sm': '0 2px 8px rgba(232, 133, 106, 0.15)',
        'coral-md': '0 8px 24px rgba(232, 133, 106, 0.2)',
        'coral-lg': '0 16px 48px rgba(232, 133, 106, 0.25)',
        'card': '0 2px 16px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'sidebar': '4px 0 24px rgba(0, 0, 0, 0.05)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
      },
    },
  },
  plugins: [animatePlugin],
};
export default config;
