import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { PortfolioService } from '../../services/portfolio.service';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';

/**
 * Contact Component
 * Displays call-to-action section with social media links
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class ContactComponent {
  private readonly portfolioService = inject(PortfolioService);
  protected readonly themeService = inject(ThemeService);
  protected readonly languageService = inject(LanguageService);

  protected readonly socialLinks = this.portfolioService.socialLinks$;
  protected readonly translations = this.languageService.currentTranslations;

  // Section background classes
  protected readonly sectionClasses = computed(() => ({
    'py-20 px-4 sm:px-6 lg:px-8 text-white border-t transition-all duration-300': true,
    'bg-gradient-to-br': true,
    'from-blue-600/20': this.themeService.isDarkMode(),
    'via-slate-900': this.themeService.isDarkMode(),
    'to-cyan-600/20': this.themeService.isDarkMode(),
    'border-blue-500/30': this.themeService.isDarkMode(),
    'from-blue-100': !this.themeService.isDarkMode(),
    'via-gray-50': !this.themeService.isDarkMode(),
    'to-cyan-100': !this.themeService.isDarkMode(),
    'border-blue-200': !this.themeService.isDarkMode(),
  }));

  // Title classes
  protected readonly titleClasses = computed(() => ({
    'text-4xl md:text-5xl font-bold mb-6 transition-colors duration-300': true,
    'text-white': this.themeService.isDarkMode(),
    'text-gray-900': !this.themeService.isDarkMode(),
  }));

  // Description classes
  protected readonly descriptionClasses = computed(() => ({
    'text-xl mb-12 leading-relaxed transition-colors duration-300': true,
    'text-slate-300': this.themeService.isDarkMode(),
    'text-gray-700': !this.themeService.isDarkMode(),
  }));

  // Social button classes
  protected readonly socialButtonClasses = computed(() => ({
    'inline-flex items-center gap-4 text-white px-10 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap': true,
    'bg-blue-600': this.themeService.isDarkMode(),
    'hover:bg-blue-700': this.themeService.isDarkMode(),
    'focus:ring-offset-slate-900': this.themeService.isDarkMode(),
    'bg-blue-700': !this.themeService.isDarkMode(),
    'hover:bg-blue-800': !this.themeService.isDarkMode(),
    'focus:ring-offset-gray-50': !this.themeService.isDarkMode(),
  }));
}
