import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { ThemeService } from '../../services/theme.service';

/**
 * Footer Component
 * Displays footer with copyright information
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class FooterComponent {
  private readonly portfolioService = inject(PortfolioService);
  protected readonly themeService = inject(ThemeService);
  protected readonly portfolio = this.portfolioService.portfolio$;

  // Current year for copyright
  protected readonly currentYear = new Date().getFullYear();

  // Footer classes using template literals
  protected readonly footerClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return `py-8 px-4 border-t transition-all duration-300 ${
      isDark
        ? 'bg-slate-900 text-slate-400 border-slate-700'
        : 'bg-white text-gray-600 border-gray-200'
    }`;
  });
}
