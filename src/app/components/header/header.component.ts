import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { PortfolioService } from '../../services/portfolio.service';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';
import { ClassBuilder } from '../../utils/class-builder';

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

  // Navigation bar classes using ClassBuilder for type-safety
  protected readonly navClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return new ClassBuilder()
      .add('fixed top-0 w-full z-50 border-b transition-all duration-300')
      .theme(isDark, 'bg-white/80 border-gray-200', 'bg-slate-900/80 border-slate-700')
      .build();
  });

  // Navigation link classes using ClassBuilder
  protected readonly navLinkClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return new ClassBuilder()
      .add('transition-colors duration-300')
      .theme(isDark, 'text-gray-700 hover:text-blue-600', 'text-slate-300 hover:text-blue-400')
      .build();
  });

  // Mobile menu button classes using ClassBuilder
  protected readonly mobileMenuButtonClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return new ClassBuilder()
      .add('md:hidden p-2 rounded-lg transition-colors')
      .theme(isDark, 'bg-gray-100 hover:bg-gray-200', 'bg-slate-800 hover:bg-slate-700')
      .build();
  });

  // Mobile menu classes using ClassBuilder
  protected readonly mobileMenuClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return new ClassBuilder()
      .add('md:hidden border-t transition-all duration-300 animate-fade-in')
      .theme(isDark, 'bg-gray-50 border-gray-200', 'bg-slate-800 border-slate-700')
      .build();
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
