import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
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
  imports: [],
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

  // Section background classes using template literals
  protected readonly sectionClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return `py-20 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
      isDark ? 'bg-slate-800' : 'bg-gray-100'
    }`;
  });

  // Title classes using template literals
  protected readonly titleClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return `text-4xl md:text-5xl font-bold mb-12 text-center transition-colors duration-300 ${
      isDark ? 'text-white' : 'text-gray-900'
    }`;
  });

  // Card classes using template literals
  protected readonly cardClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return `rounded-2xl p-8 md:p-12 shadow-xl border transition-all duration-300 bg-gradient-to-br ${
      isDark
        ? 'from-slate-700 to-slate-700 border-blue-500/20'
        : 'from-gray-50 to-gray-50 border-blue-200'
    }`;
  });

  // Text classes using template literals
  protected readonly textClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return `text-lg leading-relaxed transition-colors duration-300 ${
      isDark ? 'text-slate-200' : 'text-gray-700'
    }`;
  });
}
