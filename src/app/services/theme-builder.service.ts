import { Injectable, signal, computed, effect } from '@angular/core';

/**
 * Custom Theme Configuration
 * Allows runtime theme customization without CSS recompilation
 */
export interface CustomTheme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    error?: string;
    warning?: string;
    success?: string;
  };
}

/**
 * Theme Builder Service
 * Manages custom theme creation and application at runtime
 * Provides type-safe theme configuration system
 *
 * Usage:
 * constructor(private themeBuilder: ThemeBuilderService) {
 *   this.themeBuilder.createTheme({
 *     name: 'ocean',
 *     colors: {
 *       primary: '#0066ff',
 *       secondary: '#00d9ff',
 *       // ...
 *     }
 *   });
 *   this.themeBuilder.applyTheme('ocean');
 * }
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeBuilderService {
  // Store of available themes
  private readonly themes = signal<Map<string, CustomTheme>>(new Map());

  // Currently active theme
  private readonly activeThemeName = signal<string>('default');

  // Current theme object
  readonly activeTheme = computed(() => {
    const themeName = this.activeThemeName();
    const themeMap = this.themes();
    return themeMap.get(themeName);
  });

  // List of all available theme names
  readonly availableThemes = computed(() => {
    return Array.from(this.themes().keys());
  });

  constructor() {
    // Apply theme changes to document
    effect(() => {
      const theme = this.activeTheme();
      if (theme) {
        this.applyThemeToDom(theme);
      }
    });

    // Initialize with default theme
    this.createTheme({
      name: 'default',
      colors: {
        primary: '#0066ff',
        secondary: '#00d9ff',
        background: '#ffffff',
        surface: '#f9fafb',
        text: '#1f2937',
        error: '#ef4444',
        warning: '#f59e0b',
        success: '#10b981',
      },
    });
  }

  /**
   * Create a new custom theme
   */
  createTheme(theme: CustomTheme): void {
    this.themes.update((map) => {
      map.set(theme.name, theme);
      return new Map(map);
    });
  }

  /**
   * Apply a theme by name
   */
  applyTheme(themeName: string): void {
    if (this.themes().has(themeName)) {
      this.activeThemeName.set(themeName);
    } else {
      console.warn(`Theme "${themeName}" not found. Available themes:`, this.availableThemes());
    }
  }

  /**
   * Get current active theme name
   */
  getCurrentThemeName(): string {
    return this.activeThemeName();
  }

  /**
   * Merge multiple themes
   */
  mergeThemes(baseThemeName: string, overrides: Partial<CustomTheme>): CustomTheme {
    const baseTheme = this.themes().get(baseThemeName);
    if (!baseTheme) {
      throw new Error(`Base theme "${baseThemeName}" not found`);
    }

    return {
      name: overrides.name || baseTheme.name,
      colors: {
        ...baseTheme.colors,
        ...(overrides.colors || {}),
      },
    };
  }

  /**
   * Delete a theme (cannot delete default)
   */
  deleteTheme(themeName: string): boolean {
    if (themeName === 'default') {
      console.warn('Cannot delete default theme');
      return false;
    }

    this.themes.update((map) => {
      map.delete(themeName);
      return new Map(map);
    });

    // Switch to default if active theme was deleted
    if (this.activeThemeName() === themeName) {
      this.activeThemeName.set('default');
    }

    return true;
  }

  /**
   * Export current theme as JSON
   */
  exportTheme(themeName?: string): string {
    const name = themeName || this.activeThemeName();
    const theme = this.themes().get(name);

    if (!theme) {
      throw new Error(`Theme "${name}" not found`);
    }

    return JSON.stringify(theme, null, 2);
  }

  /**
   * Import theme from JSON
   */
  importTheme(themeJson: string): void {
    try {
      const theme = JSON.parse(themeJson) as CustomTheme;
      this.createTheme(theme);
    } catch (error) {
      console.error('Failed to import theme:', error);
      throw new Error('Invalid theme JSON format');
    }
  }

  /**
   * Apply theme colors to DOM (CSS variables)
   */
  private applyThemeToDom(theme: CustomTheme): void {
    const root = document.documentElement;

    // Set CSS variables for the theme
    root.style.setProperty('--theme-primary', theme.colors.primary);
    root.style.setProperty('--theme-secondary', theme.colors.secondary);
    root.style.setProperty('--theme-background', theme.colors.background);
    root.style.setProperty('--theme-surface', theme.colors.surface);
    root.style.setProperty('--theme-text', theme.colors.text);

    if (theme.colors.error) {
      root.style.setProperty('--theme-error', theme.colors.error);
    }
    if (theme.colors.warning) {
      root.style.setProperty('--theme-warning', theme.colors.warning);
    }
    if (theme.colors.success) {
      root.style.setProperty('--theme-success', theme.colors.success);
    }
  }
}
