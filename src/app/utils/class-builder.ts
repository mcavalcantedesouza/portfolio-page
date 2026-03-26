/**
 * Tailwind Class Builder Utility
 * Type-safe, composable utility for building Tailwind CSS classes
 * Eliminates string concatenation errors and improves maintainability
 *
 * Usage:
 * protected readonly sectionClasses = computed(() => {
 *   return new ClassBuilder()
 *     .add('section-base')
 *     .addIf(this.isDark(), 'bg-slate-900', 'bg-white')
 *     .build();
 * });
 */

export class ClassBuilder {
  private classes: string[] = [];

  /**
   * Add a single class or multiple space-separated classes
   */
  add(...classes: (string | null | undefined | false)[]): this {
    classes.forEach((cls) => {
      if (cls && typeof cls === 'string') {
        this.classes.push(...cls.split(' ').filter(Boolean));
      }
    });
    return this;
  }

  /**
   * Conditionally add classes
   * @param condition - The condition to check
   * @param trueClasses - Classes to add if condition is true
   * @param falseClasses - Classes to add if condition is false (optional)
   */
  addIf(condition: boolean, trueClasses: string, falseClasses?: string): this {
    if (condition) {
      this.add(trueClasses);
    } else if (falseClasses) {
      this.add(falseClasses);
    }
    return this;
  }

  /**
   * Conditionally add classes based on a theme state
   * @param isDark - Theme state
   * @param lightClasses - Classes for light mode
   * @param darkClasses - Classes for dark mode
   */
  theme(isDark: boolean, lightClasses: string, darkClasses: string): this {
    return this.addIf(isDark, darkClasses, lightClasses);
  }

  /**
   * Add responsive classes
   * @param responsive - Object with breakpoint keys
   */
  responsive(responsive: Record<string, string>): this {
    Object.entries(responsive).forEach(([breakpoint, classes]) => {
      if (classes) {
        const prefix = breakpoint === 'base' ? '' : `${breakpoint}:`;
        this.add(
          classes
            .split(' ')
            .map((cls) => prefix + cls)
            .join(' '),
        );
      }
    });
    return this;
  }

  /**
   * Deduplicate and build the final class string
   */
  build(): string {
    // Remove duplicates while preserving order
    const unique = new Set<string>();
    const filtered: string[] = [];

    this.classes.forEach((cls) => {
      if (!unique.has(cls) && cls.trim()) {
        unique.add(cls);
        filtered.push(cls);
      }
    });

    return filtered.join(' ');
  }

  /**
   * Get classes as array (for debugging or advanced use)
   */
  toArray(): string[] {
    return [...this.classes];
  }

  /**
   * Clear all classes (for reuse)
   */
  clear(): this {
    this.classes = [];
    return this;
  }
}

/**
 * Preset class configurations for common component patterns
 */
export const TailwindPresets = {
  // Section base styling
  section: {
    light: 'py-20 px-4 sm:px-6 lg:px-8 bg-white border-gray-100',
    dark: 'py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 border-slate-700',
  },

  // Section with gradient background
  sectionGradient: {
    light: 'py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white',
    dark: 'py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900',
  },

  // Title styling
  title: {
    base: 'font-bold transition-colors duration-300',
    light: 'text-gray-900',
    dark: 'text-white',
    sizes: {
      sm: 'text-2xl sm:text-3xl',
      md: 'text-3xl sm:text-4xl',
      lg: 'text-4xl sm:text-5xl',
      xl: 'text-5xl sm:text-6xl',
    },
  },

  // Subtitle/Description text
  description: {
    light: 'text-gray-700',
    dark: 'text-slate-300',
    base: 'text-base sm:text-lg transition-colors duration-300',
  },

  // Navigation link
  navLink: {
    base: 'transition-colors duration-300 font-medium',
    light: 'text-gray-700 hover:text-blue-600',
    dark: 'text-slate-300 hover:text-blue-400',
  },

  // Card component
  card: {
    light: 'bg-white border border-gray-200 rounded-lg shadow-sm',
    dark: 'bg-slate-800 border border-slate-700 rounded-lg shadow-lg',
  },

  // Button primary
  buttonPrimary: {
    base: 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2',
    light: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-white',
    dark: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-slate-900',
  },

  // Button secondary
  buttonSecondary: {
    base: 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2',
    light:
      'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 focus:ring-offset-white',
    dark: 'bg-slate-700 text-slate-100 hover:bg-slate-600 focus:ring-slate-500 focus:ring-offset-slate-900',
  },

  // Glass morphism effect
  glass: {
    light: 'bg-white/70 backdrop-blur-glass border border-white/20 shadow-glass',
    dark: 'bg-slate-900/70 backdrop-blur-glass border border-slate-700/30 shadow-glass-dark',
  },
} as const;

/**
 * Helper function to create themed classes using presets
 */
export function createThemedClasses(
  isDark: boolean,
  config: { light: string; dark: string },
): string {
  return isDark ? config.dark : config.light;
}

/**
 * Helper function to create responsive classes
 */
export function createResponsiveClasses(responsive: Record<string, string>): string {
  return new ClassBuilder().responsive(responsive).build();
}
