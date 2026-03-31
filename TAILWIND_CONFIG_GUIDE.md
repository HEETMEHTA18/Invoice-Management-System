/**
 * Tailwind CSS Configuration Extension for InvoiceFlow Landing Page
 * 
 * Add the following to your tailwind.config.ts file to ensure all
 * custom animations, colors, and utilities work correctly.
 * 
 * This file shows what should be added to the existing config.
 */

// ============================================================================
// EXAMPLE TAILWIND CONFIG - Add these to your existing tailwind.config.ts
// ============================================================================

/*
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './app/**\/*.{js,ts,jsx,tsx}',
    './components/**\/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      // Colors
      colors: {
        // Primary Brand Colors
        primary: {
          DEFAULT: '#596778',
          50: '#f4f5f7',
          100: '#e5e7eb',
          200: '#cbd5e1',
          300: '#8691A6',
          400: '#596778',
          500: '#4a5568',
          600: '#3d4657',
          700: '#2C3E50',
          800: '#1f2937',
          900: '#111827',
        },
        secondary: '#8691A6',
        accent: {
          green: '#10B981',
          blue: '#3B82F6',
          purple: '#8B5CF6',
          orange: '#F97316',
          yellow: '#FBBF24',
          cyan: '#06B6D4',
        },
      },

      // Font Family
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        mono: ['Fira Code', ...defaultTheme.fontFamily.mono],
      },

      // Font Sizes
      fontSize: {
        // Headings
        'h1': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['36px', { lineHeight: '1.3', fontWeight: '700' }],
        'h3': ['28px', { lineHeight: '1.4', fontWeight: '600' }],
        'h4': ['24px', { lineHeight: '1.5', fontWeight: '600' }],
        // Body
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'label': ['12px', { lineHeight: '1.4', fontWeight: '500' }],
      },

      // Spacing
      spacing: {
        '0': '0px',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
      },

      // Animations
      animation: {
        // Entrance animations
        'fade-in': 'fadeIn 300ms ease-out forwards',
        'slide-up': 'slideUp 300ms ease-out forwards',
        'slide-down': 'slideDown 300ms ease-out forwards',
        'slide-in-left': 'slideInLeft 300ms ease-out forwards',
        'slide-in-right': 'slideInRight 300ms ease-out forwards',
        'scale-in': 'scaleIn 300ms ease-out forwards',
        // Continuous animations
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      // Keyframes
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideDown: {
          'from': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInLeft: {
          'from': {
            opacity: '0',
            transform: 'translateX(-30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideInRight: {
          'from': {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        scaleIn: {
          'from': {
            opacity: '0',
            transform: 'scale(0.95)',
          },
          'to': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },

      // Box Shadow
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'base': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },

      // Border Radius
      borderRadius: {
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
      },

      // Transitions
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
      },

      // Transition Timing Functions
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0.0, 0.0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
      },

      // Backdrop Filter
      backdropFilter: {
        'md': 'blur(12px)',
      },

      // Gradient Stops
      gradientColorStops: {
        'transparent': 'transparent',
      },

      // Container
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },

      // Min/Max Width
      maxWidth: {
        '7xl': '80rem',
        '8xl': '88rem',
      },

      // Opacity
      opacity: {
        '0': '0',
        '5': '0.05',
        '10': '0.1',
        '20': '0.2',
        '25': '0.25',
        '30': '0.3',
        '40': '0.4',
        '50': '0.5',
        '60': '0.6',
        '70': '0.7',
        '75': '0.75',
        '80': '0.8',
        '90': '0.9',
        '95': '0.95',
        '100': '1',
      },
    },
  },

  plugins: [
    // Add animation utilities
    require('tailwindcss/plugin')(function ({ addBase, addComponents, addUtilities, theme }) {
      // Custom utilities for common patterns
      addUtilities({
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.transition-fast': {
          '@apply transition-all duration-150': {},
        },
        '.transition-normal': {
          '@apply transition-all duration-200': {},
        },
        '.transition-slow': {
          '@apply transition-all duration-300': {},
        },
        '.focus-ring': {
          '@apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary': {},
        },
        '.btn-focus': {
          '@apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2': {},
        },
        '.gradient-text': {
          '@apply bg-gradient-to-r bg-clip-text text-transparent': {},
        },
        '.card-base': {
          '@apply rounded-lg bg-white border border-gray-200 shadow-sm': {},
        },
        '.card-hover': {
          '@apply hover:border-gray-300 hover:shadow-lg transition-all duration-200 hover:-translate-y-1': {},
        },
      });
    }),
  ],

  // SafeList for dynamic colors
  safelist: [
    // Dynamic color classes
    'bg-[#596778]',
    'bg-[#8691A6]',
    'bg-[#10B981]',
    'bg-[#3B82F6]',
    'bg-[#8B5CF6]',
    'bg-[#F97316]',
    'text-[#596778]',
    'text-[#8691A6]',
    'text-[#10B981]',
    'text-[#3B82F6]',
    'text-[#8B5CF6]',
    'border-[#596778]',
    'border-[#8691A6]',
    'bg-[#596778]/5',
    'bg-[#596778]/10',
    'bg-[#8B5CF6]/10',
    'bg-[#10B981]/10',
  ],
};

export default config;
*/

// ============================================================================
// CSS LAYERS & CUSTOM STYLES
// ============================================================================

/*
// Add this to your global CSS file (app/globals.css)

@layer base {
  /* HTML & Body Defaults */
  html {
    scroll-behavior: smooth;
    @apply antialiased;
  }

  body {
    @apply bg-white text-[#2C3E50] font-sans;
  }

  /* Headings */
  h1 {
    @apply text-h1 font-bold;
  }

  h2 {
    @apply text-h2 font-bold;
  }

  h3 {
    @apply text-h3 font-semibold;
  }

  h4 {
    @apply text-h4 font-semibold;
  }

  /* Paragraphs */
  p {
    @apply text-body leading-relaxed;
  }

  /* Links */
  a {
    @apply text-primary hover:text-primary/80 transition-colors;
  }

  /* Inputs */
  input,
  textarea,
  select {
    @apply font-sans;
  }

  /* Buttons */
  button {
    @apply transition-all duration-200;
  }
}

@layer components {
  /* Container */
  .container {
    @apply max-w-7xl mx-auto px-4 md:px-6 lg:px-8;
  }

  /* Section */
  .section {
    @apply py-16 md:py-24 lg:py-32;
  }

  /* Section Header */
  .section-header {
    @apply text-center space-y-4 md:space-y-6 mb-12 md:mb-16 lg:mb-20;
  }

  /* Section Title */
  .section-title {
    @apply text-3xl md:text-4xl lg:text-5xl font-bold text-[#2C3E50];
  }

  /* Section Description */
  .section-description {
    @apply text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto;
  }

  /* Button Base */
  .btn {
    @apply inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2;
  }

  /* Primary Button */
  .btn-primary {
    @apply btn bg-primary text-white hover:bg-primary/90 focus-visible:ring-accent-purple;
  }

  /* Secondary Button */
  .btn-secondary {
    @apply btn bg-light-gray text-primary border border-secondary hover:bg-gray-300;
  }

  /* Card */
  .card {
    @apply rounded-xl p-6 md:p-8 border border-border-gray bg-white shadow-base hover:shadow-lg transition-all duration-200;
  }

  /* Badge */
  .badge {
    @apply inline-flex items-center gap-2 bg-light-gray rounded-full px-4 py-2 w-fit;
  }

  /* Grid */
  .grid-features {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8;
  }

  .grid-stats {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6;
  }

  /* Gradients */
  .gradient-primary {
    @apply bg-gradient-to-r from-primary to-accent-purple;
  }

  .gradient-text {
    @apply bg-gradient-to-r from-primary to-accent-purple bg-clip-text text-transparent;
  }

  /* Animations */
  .animate-fade-in {
    @apply animate-fade-in;
  }

  .animate-slide-up {
    @apply animate-slide-up;
  }

  .animate-scale-in {
    @apply animate-scale-in;
  }

  /* Utilities */
  .truncate-lines {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .smooth-transition {
    @apply transition-all duration-200;
  }

  .focus-ring {
    @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-purple;
  }
}

@layer utilities {
  /* Responsive Text */
  .text-responsive {
    @apply text-base md:text-lg lg:text-xl;
  }

  .text-responsive-lg {
    @apply text-lg md:text-xl lg:text-2xl;
  }

  /* Spacing Utilities */
  .section-px {
    @apply px-4 md:px-6 lg:px-8;
  }

  .section-py {
    @apply py-16 md:py-24 lg:py-32;
  }

  /* Layout */
  .flex-center {
    @apply flex items-center justify-center;
  }

  .flex-between {
    @apply flex items-center justify-between;
  }

  /* Typography */
  .font-heading {
    @apply font-bold tracking-tight;
  }

  .font-body {
    @apply font-regular tracking-normal;
  }

  /* Accessibility */
  .sr-only {
    @apply absolute w-1 h-1 p-0 -m-1 overflow-hidden clip-path-inset-50% whitespace-nowrap border-0;
  }

  /* Backdrop */
  .backdrop-blur-md {
    @apply backdrop-filter backdrop-blur-12px;
  }

  /* Gradient backgrounds */
  .bg-grid-pattern {
    background-image:
      linear-gradient(rgba(229, 231, 235, 0.2) 1px, transparent 1px),
      linear-gradient(90deg, rgba(229, 231, 235, 0.2) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  /* Prefers reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}
*/

// ============================================================================
// NOTES & BEST PRACTICES
// ============================================================================

/**
 * 1. Component Library Integration:
 *    - Uses Radix UI for accessible components
 *    - Class Variance Authority (CVA) for variant styling
 *    - lucide-react for icons
 *
 * 2. Color System:
 *    - Primary: #596778 (Slate Blue)
 *    - Secondary: #8691A6 (Slate Gray)
 *    - Accents: Green, Blue, Purple, Orange
 *    - Use semantic colors for states
 *
 * 3. Animations:
 *    - All animations respect prefers-reduced-motion
 *    - Use useInView hook for scroll animations
 *    - Fast (150ms), Standard (200ms), Slow (300ms)
 *
 * 4. Accessibility:
 *    - Focus visible on all interactive elements
 *    - Proper ARIA labels
 *    - Color contrast 4.5:1 minimum
 *    - Touch targets 44px minimum
 *
 * 5. Responsive Design:
 *    - Mobile-first approach
 *    - Breakpoints: sm (640), md (768), lg (1024), xl (1280)
 *    - Fluid typography using responsive text utilities
 *
 * 6. Performance:
 *    - Lazy load images
 *    - Code splitting for routes
 *    - Tailwind purges unused CSS in production
 *    - SVG icons with lucide-react
 */

export const tailwindConfigGuide = {
  note: 'This is a reference file showing what to add to your tailwind.config.ts',
  location: 'See commented code above',
};
