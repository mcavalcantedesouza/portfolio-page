import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, IconComponent, ThemeToggleComponent, LanguageSelectorComponent],
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

  // Navigation bar classes
  protected readonly navClasses = computed(() => ({
    'fixed top-0 w-full z-50 border-b transition-all duration-300': true,
    'bg-slate-900/80': this.themeService.isDarkMode(),
    'bg-white/80': !this.themeService.isDarkMode(),
    'border-slate-700': this.themeService.isDarkMode(),
    'border-gray-200': !this.themeService.isDarkMode(),
  }));

  // Navigation link classes
  protected readonly navLinkClasses = computed(() => ({
    'transition-colors duration-300': true,
    'text-slate-300': this.themeService.isDarkMode(),
    'hover:text-blue-400': this.themeService.isDarkMode(),
    'text-gray-700': !this.themeService.isDarkMode(),
    'hover:text-blue-600': !this.themeService.isDarkMode(),
  }));

  // Mobile menu button classes
  protected readonly mobileMenuButtonClasses = computed(() => ({
    'md:hidden p-2 rounded-lg transition-colors': true,
    'bg-slate-800': this.themeService.isDarkMode(),
    'hover:bg-slate-700': this.themeService.isDarkMode(),
    'bg-gray-100': !this.themeService.isDarkMode(),
    'hover:bg-gray-200': !this.themeService.isDarkMode(),
  }));

  // Mobile menu classes
  protected readonly mobileMenuClasses = computed(() => ({
    'md:hidden border-t transition-all duration-300 animate-in fade-in slide-in-from-top-2': true,
    'bg-slate-800': this.themeService.isDarkMode(),
    'border-slate-700': this.themeService.isDarkMode(),
    'bg-gray-50': !this.themeService.isDarkMode(),
    'border-gray-200': !this.themeService.isDarkMode(),
  }));

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
