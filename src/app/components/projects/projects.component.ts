import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { ProjectCardComponent } from '../project-card/project-card.component';
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
  imports: [ProjectCardComponent],
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
    return `text-4xl md:text-5xl font-bold mb-16 text-center transition-colors duration-300 ${
      isDark ? 'text-white' : 'text-gray-900'
    }`;
  });
}
