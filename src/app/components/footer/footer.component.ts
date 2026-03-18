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

  // Footer classes
  protected readonly footerClasses = computed(() => ({
    'py-8 px-4 border-t transition-all duration-300': true,
    'bg-slate-900': this.themeService.isDarkMode(),
    'text-slate-400': this.themeService.isDarkMode(),
    'border-slate-700': this.themeService.isDarkMode(),
    'bg-white': !this.themeService.isDarkMode(),
    'text-gray-600': !this.themeService.isDarkMode(),
    'border-gray-200': !this.themeService.isDarkMode(),
  }));
}
