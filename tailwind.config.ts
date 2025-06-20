
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
      },
    },
    extend: {
      fontFamily: {
        body: ['Inter', 'system-ui', 'sans-serif'],
        headline: ['Inter', 'system-ui', 'sans-serif'],
        code: ['monospace'],
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
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 0.25rem)',
        sm: 'calc(var(--radius) - 0.375rem)',
        xl: 'calc(var(--radius) + 0.25rem)',
        '2xl': 'calc(var(--radius) + 0.5rem)',
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
        'blob': {
          '0%': { transform: 'scale(1) translate(0px, 0px)' },
          '33%': { transform: 'scale(1.1) translate(30px, -20px)' },
          '66%': { transform: 'scale(0.9) translate(-20px, 30px)' },
          '100%': { transform: 'scale(1) translate(0px, 0px)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up-fade': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'subtle-scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 hsla(var(--primary)/0.7)' },
          '50%': { boxShadow: '0 0 20px 10px hsla(var(--primary)/0)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'blob': 'blob 7s infinite alternate',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-up-fade': 'slide-up-fade 0.5s ease-out forwards',
        'subtle-scale': 'subtle-scale 0.3s ease-in-out',
        'pulse-glow': 'pulse-glow 2s infinite ease-out',
      },
      boxShadow: {
        'soft': '0 4px 12px hsla(var(--primary)/0.05), 0 2px 6px hsla(var(--primary)/0.08)',
        'medium': '0 8px 16px hsla(var(--primary)/0.07), 0 4px 8px hsla(var(--primary)/0.1)',
        'hard': '0 12px 24px hsla(var(--primary)/0.1), 0 6px 12px hsla(var(--primary)/0.12)',
        'primary-glow': '0 0 15px hsla(var(--primary)/0.5), 0 0 30px hsla(var(--primary)/0.3)',
        'accent-glow': '0 0 15px hsla(var(--accent)/0.5), 0 0 30px hsla(var(--accent)/0.3)',
      },
      typography: (theme: (arg0: string) => any) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'hsl(var(--foreground))',
            '--tw-prose-headings': 'hsl(var(--foreground))',
            '--tw-prose-lead': 'hsl(var(--muted-foreground))',
            '--tw-prose-links': 'hsl(var(--primary))',
            '--tw-prose-bold': 'hsl(var(--foreground))',
            '--tw-prose-counters': 'hsl(var(--muted-foreground))',
            '--tw-prose-bullets': 'hsl(var(--border))',
            '--tw-prose-hr': 'hsl(var(--border))',
            '--tw-prose-quotes': 'hsl(var(--foreground))',
            '--tw-prose-quote-borders': 'hsl(var(--border))',
            '--tw-prose-captions': 'hsl(var(--muted-foreground))',
            '--tw-prose-code': 'hsl(var(--accent-foreground))',
            '--tw-prose-pre-code': 'hsl(var(--accent-foreground))',
            '--tw-prose-pre-bg': 'hsl(var(--accent) / 0.15)', // Slightly increased opacity for pre background
            '--tw-prose-th-borders': 'hsl(var(--border))',
            '--tw-prose-td-borders': 'hsl(var(--border))',
            // Ensure inline code also uses a background for clarity, if desired,
            // by styling the <code> tag directly, but usually --tw-prose-code handles text color.
            // The plugin typically applies background to <pre><code> not inline <code> by default via --tw-prose-pre-bg.
            // If inline code needs a background, it might be better to customize the plugin's output or add specific CSS.
            // For now, relying on the prose variables.
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
          },
        },
      }),
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;

    