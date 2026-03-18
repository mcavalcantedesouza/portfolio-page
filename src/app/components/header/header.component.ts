import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
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
