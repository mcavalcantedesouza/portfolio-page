import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { SkillCardComponent } from '../skill-card/skill-card.component';
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
  imports: [SkillCardComponent],
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

  // Section background classes using template literals
  protected readonly sectionClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return `py-20 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
      isDark ? 'bg-slate-900' : 'bg-white'
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
