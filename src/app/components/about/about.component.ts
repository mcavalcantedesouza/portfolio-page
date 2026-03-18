import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';

/**
 * About Component
 * Displays biography and additional information about the portfolio owner
 */
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class AboutComponent {
  private readonly portfolioService = inject(PortfolioService);
  protected readonly themeService = inject(ThemeService);
  protected readonly languageService = inject(LanguageService);

  protected readonly portfolio = this.portfolioService.portfolio$;
  protected readonly translations = this.languageService.currentTranslations;

  // Section background classes
  protected readonly sectionClasses = computed(() => ({
    'py-20 px-4 sm:px-6 lg:px-8 transition-all duration-300': true,
    'bg-slate-800': this.themeService.isDarkMode(),
    'bg-gray-100': !this.themeService.isDarkMode(),
  }));

  // Title classes
  protected readonly titleClasses = computed(() => ({
    'text-4xl md:text-5xl font-bold mb-12 text-center transition-colors duration-300': true,
    'text-white': this.themeService.isDarkMode(),
    'text-gray-900': !this.themeService.isDarkMode(),
  }));

  // Card classes
  protected readonly cardClasses = computed(() => ({
    'rounded-2xl p-8 md:p-12 shadow-xl border transition-all duration-300': true,
    'bg-gradient-to-br': true,
    'from-slate-700': this.themeService.isDarkMode(),
    'to-slate-700': this.themeService.isDarkMode(),
    'border-blue-500/20': this.themeService.isDarkMode(),
    'from-gray-50': !this.themeService.isDarkMode(),
    'to-gray-50': !this.themeService.isDarkMode(),
    'border-blue-200': !this.themeService.isDarkMode(),
  }));

  // Text classes
  protected readonly textClasses = computed(() => ({
    'text-lg leading-relaxed transition-colors duration-300': true,
    'text-slate-200': this.themeService.isDarkMode(),
    'text-gray-700': !this.themeService.isDarkMode(),
  }));
}
