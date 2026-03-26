import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { PortfolioService } from '../../services/portfolio.service';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';

/**
 * Header Component
 * Main navigation bar with theme toggle, language selector, and mobile menu
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconComponent, ThemeToggleComponent, LanguageSelectorComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class HeaderComponent {
  private readonly portfolioService = inject(PortfolioService);
  protected readonly themeService = inject(ThemeService);
  protected readonly languageService = inject(LanguageService);

  protected readonly mobileMenuOpen = signal(false);
  protected readonly navLinks = this.portfolioService.navLinks$;
  protected readonly currentTranslations = this.languageService.currentTranslations;

  // Navigation bar classes using template literals
  protected readonly navClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return `fixed top-0 w-full z-50 border-b transition-all duration-300 ${
      isDark ? 'bg-slate-900/80 border-slate-700' : 'bg-white/80 border-gray-200'
    }`;
  });

  // Navigation link classes using template literals
  protected readonly navLinkClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return `transition-colors duration-300 ${
      isDark ? 'text-slate-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
    }`;
  });

  // Mobile menu button classes using template literals
  protected readonly mobileMenuButtonClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return `md:hidden p-2 rounded-lg transition-colors ${
      isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'
    }`;
  });

  // Mobile menu classes using template literals
  protected readonly mobileMenuClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return `md:hidden border-t transition-all duration-300 animate-in fade-in slide-in-from-top-2 ${
      isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'
    }`;
  });

  /**
   * Toggle mobile menu visibility
   */
  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update((value) => !value);
  }

  /**
   * Close mobile menu
   */
  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  /**
   * Scroll to top of page
   */
  protected scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
