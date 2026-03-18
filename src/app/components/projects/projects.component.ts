import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { PortfolioService } from '../../services/portfolio.service';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';

/**
 * Projects Component
 * Displays a grid of featured projects with descriptions and links
 */
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class ProjectsComponent {
  private readonly portfolioService = inject(PortfolioService);
  protected readonly themeService = inject(ThemeService);
  protected readonly languageService = inject(LanguageService);

  protected readonly projects = this.portfolioService.projects$;
  protected readonly translations = this.languageService.currentTranslations;

  // Section background classes
  protected readonly sectionClasses = computed(() => ({
    'py-20 px-4 sm:px-6 lg:px-8 transition-all duration-300': true,
    'bg-slate-800': this.themeService.isDarkMode(),
    'bg-gray-100': !this.themeService.isDarkMode(),
  }));

  // Title classes
  protected readonly titleClasses = computed(() => ({
    'text-4xl md:text-5xl font-bold mb-16 text-center transition-colors duration-300': true,
    'text-white': this.themeService.isDarkMode(),
    'text-gray-900': !this.themeService.isDarkMode(),
  }));

  // Project card classes
  protected readonly projectCardClasses = computed(() => ({
    'group rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border focus-within:ring-2 focus-within:ring-blue-500 flex flex-col': true,
    'bg-slate-700': this.themeService.isDarkMode(),
    'border-blue-500/20': this.themeService.isDarkMode(),
    'hover:border-blue-500/40': this.themeService.isDarkMode(),
    'bg-white': !this.themeService.isDarkMode(),
    'border-gray-200': !this.themeService.isDarkMode(),
    'hover:border-blue-400': !this.themeService.isDarkMode(),
  }));

  // Project image container background
  protected readonly imageContainerClasses = computed(() => ({
    'relative h-48 overflow-hidden': true,
    'bg-gradient-to-br': true,
    'from-slate-600': this.themeService.isDarkMode(),
    'to-slate-700': this.themeService.isDarkMode(),
    'from-gray-200': !this.themeService.isDarkMode(),
    'to-gray-300': !this.themeService.isDarkMode(),
  }));

  // Project title classes
  protected readonly projectTitleClasses = computed(() => ({
    'text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300': true,
    'text-white': this.themeService.isDarkMode(),
    'text-gray-900': !this.themeService.isDarkMode(),
  }));

  // Project description classes
  protected readonly projectDescriptionClasses = computed(() => ({
    'mb-4 leading-relaxed transition-colors duration-300': true,
    'text-slate-300': this.themeService.isDarkMode(),
    'text-gray-700': !this.themeService.isDarkMode(),
  }));

  // Tech badge classes
  protected readonly techBadgeClasses = computed(() => ({
    'px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 border': true,
    'bg-blue-500/20': this.themeService.isDarkMode(),
    'text-blue-300': this.themeService.isDarkMode(),
    'border-blue-500/30': this.themeService.isDarkMode(),
    'bg-blue-100': !this.themeService.isDarkMode(),
    'text-blue-900': !this.themeService.isDarkMode(),
    'border-blue-200': !this.themeService.isDarkMode(),
  }));

  // CTA link classes
  protected readonly ctaLinkClasses = computed(() => ({
    'font-semibold flex items-center gap-2 hover:gap-3 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-auto': true,
    'text-blue-400': this.themeService.isDarkMode(),
    'hover:text-blue-300': this.themeService.isDarkMode(),
    'focus:ring-offset-slate-700': this.themeService.isDarkMode(),
    'text-blue-600': !this.themeService.isDarkMode(),
    'hover:text-blue-700': !this.themeService.isDarkMode(),
    'focus:ring-offset-white': !this.themeService.isDarkMode(),
  }));
}
