import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { PortfolioService } from '../../services/portfolio.service';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';
import { ClassBuilder } from '../../utils/class-builder';

/**
 * Contact Component
 * Displays call-to-action section with social media links
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [IconComponent],
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

  // Section background classes using ClassBuilder
  protected readonly sectionClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return new ClassBuilder()
      .add(
        'py-20 px-4 sm:px-6 lg:px-8 text-white border-t transition-all duration-300 bg-gradient-to-br',
      )
      .addIf(
        isDark,
        'from-blue-600/20 via-slate-900 to-cyan-600/20 border-blue-500/30',
        'from-blue-100 via-gray-50 to-cyan-100 border-blue-200',
      )
      .build();
  });

  // Title classes using ClassBuilder
  protected readonly titleClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return new ClassBuilder()
      .add('text-4xl md:text-5xl font-bold mb-6 transition-colors duration-300')
      .theme(isDark, 'text-gray-900', 'text-white')
      .build();
  });

  // Description classes using ClassBuilder
  protected readonly descriptionClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return new ClassBuilder()
      .add('text-xl mb-12 leading-relaxed transition-colors duration-300')
      .theme(isDark, 'text-gray-700', 'text-slate-300')
      .build();
  });

  // Social button classes using ClassBuilder
  protected readonly socialButtonClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return new ClassBuilder()
      .add('inline-flex items-center gap-4 text-white px-10 py-3 rounded-full')
      .add('transition-all duration-300 shadow-lg hover:shadow-xl font-semibold')
      .add(
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap',
      )
      .addIf(
        isDark,
        'bg-blue-600 hover:bg-blue-700 focus:ring-offset-slate-900',
        'bg-blue-700 hover:bg-blue-800 focus:ring-offset-gray-50',
      )
      .build();
  });
}
