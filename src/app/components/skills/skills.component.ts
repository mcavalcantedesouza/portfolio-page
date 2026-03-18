import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { PortfolioService } from '../../services/portfolio.service';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';

/**
 * Skills Component
 * Displays skill cards with icons and descriptions
 */
@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class SkillsComponent {
  private readonly portfolioService = inject(PortfolioService);
  protected readonly themeService = inject(ThemeService);
  protected readonly languageService = inject(LanguageService);

  protected readonly skills = this.portfolioService.skills$;

  // Section background classes
  protected readonly sectionClasses = computed(() => ({
    'py-20 px-4 sm:px-6 lg:px-8 transition-all duration-300': true,
    'bg-slate-900': this.themeService.isDarkMode(),
    'bg-white': !this.themeService.isDarkMode(),
  }));

  // Title classes
  protected readonly titleClasses = computed(() => ({
    'text-4xl md:text-5xl font-bold mb-16 text-center transition-colors duration-300': true,
    'text-white': this.themeService.isDarkMode(),
    'text-gray-900': !this.themeService.isDarkMode(),
  }));

  // Skill card classes
  protected readonly skillCardClasses = computed(() => ({
    'rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border focus-within:ring-2 focus-within:ring-blue-500': true,
    'bg-slate-800': this.themeService.isDarkMode(),
    'border-blue-500/10': this.themeService.isDarkMode(),
    'hover:border-blue-500/30': this.themeService.isDarkMode(),
    'focus-within:ring-offset-slate-900': this.themeService.isDarkMode(),
    'bg-gray-50': !this.themeService.isDarkMode(),
    'border-gray-200': !this.themeService.isDarkMode(),
    'hover:border-blue-400': !this.themeService.isDarkMode(),
    'focus-within:ring-offset-white': !this.themeService.isDarkMode(),
  }));

  // Skill title classes
  protected readonly skillTitleClasses = computed(() => ({
    'text-2xl font-bold mb-4 transition-colors duration-300': true,
    'text-white': this.themeService.isDarkMode(),
    'text-gray-900': !this.themeService.isDarkMode(),
  }));

  // Skill description classes
  protected readonly skillDescriptionClasses = computed(() => ({
    'leading-relaxed transition-colors duration-300': true,
    'text-slate-300': this.themeService.isDarkMode(),
    'text-gray-700': !this.themeService.isDarkMode(),
  }));
}
