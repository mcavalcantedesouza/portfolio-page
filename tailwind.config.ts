import type { Config } from 'tailwindcss';

export default {
  content: ['./src/index.html', './src/**/*.{ts,html}'],
  theme: {
    extend: {
      // Brand colors - aligned with gradient theme
      colors: {
        brand: {
          primary: '#0066ff',
          secondary: '#00d9ff',
          dark: '#0f172a',
          light: '#ffffff',
        },
        // Semantic colors
        'focus-ring': 'rgba(59, 130, 246, 0.5)',
      },
      // Custom animations for smooth transitions
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in-top': 'slideInTop 0.3s ease-out',
        'toggle-switch': 'toggleSwitch 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInTop: {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        toggleSwitch: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(24px)' },
        },
      },
      // Glass morphism utilities
      backdropBlur: {
        glass: '12px',
      },
      // Custom spacing for toggle component
      width: {
        toggle: '56px',
        'toggle-sm': '52px',
      },
      height: {
        toggle: '32px',
        'toggle-sm': '30px',
      },
      // Z-index scale
      zIndex: {
        '60': '60',
      },
      // Custom shadows for glass effect
      boxShadow: {
        glass: '0 2px 8px rgba(0, 0, 0, 0.1)',
        'glass-hover': '0 2px 12px rgba(0, 0, 0, 0.15)',
        'glass-dark': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'glass-dark-hover': '0 2px 12px rgba(0, 0, 0, 0.4)',
      },
      // Custom border radius for pill-shaped elements
      borderRadius: {
        'full-pill': '999px',
      },
    },
  },
  plugins: [
    // Custom plugin for glass morphism component
    function ({ addComponents, theme }: any) {
      addComponents({
        '.glass-effect': {
          backdropFilter: 'blur(12px)',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
        },
        '.toggle-base': {
          position: 'relative',
          cursor: 'pointer',
          borderRadius: '999px',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          userSelect: 'none',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
        '.section-base': {
          paddingTop: '5rem',
          paddingBottom: '5rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          transition: 'all 0.3s ease',
        },
        '.title-base': {
          fontWeight: '700',
          marginBottom: '1.5rem',
          transition: 'color 0.3s ease',
        },
        '.nav-link-base': {
          transition: 'color 0.3s ease',
        },
      });
    },
  ],
  darkMode: 'class',
} satisfies Config;
