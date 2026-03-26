import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { PortfolioService } from '../../services/portfolio.service';
import { ThemeService } from '../../services/theme.service';
import { ClassBuilder } from '../../utils/class-builder';

/**
 * Hero Component
 * Main hero section with title, subtitle, and call-to-action buttons
 */
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class HeroComponent {
  private readonly portfolioService = inject(PortfolioService);
  protected readonly themeService = inject(ThemeService);
  protected readonly portfolio = this.portfolioService.portfolio$;

  // Computed signal for hero background classes - optimizes theme-dependent styling
  protected readonly heroBackgroundClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return new ClassBuilder()
      .add('pt-32 pb-20 px-4 sm:px-6 lg:px-8 transition-all duration-300 bg-gradient-to-br')
      .addIf(
        isDark,
        'from-slate-900 via-slate-950 to-slate-900',
        'from-gray-50 via-white to-gray-100',
      )
      .build();
  });

  // Title styling classes using ClassBuilder
  protected readonly titleClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return new ClassBuilder()
      .add('text-5xl md:text-7xl font-bold mb-6 transition-colors duration-300')
      .theme(isDark, 'text-gray-900', 'text-white')
      .build();
  });

  // Subtitle styling classes using ClassBuilder
  protected readonly subtitleClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return new ClassBuilder()
      .add(
        'text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed transition-colors duration-300',
      )
      .theme(isDark, 'text-gray-700', 'text-slate-300')
      .build();
  });
}
