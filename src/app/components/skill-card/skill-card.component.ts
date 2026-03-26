import { Component, ChangeDetectionStrategy, input, inject } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { ThemeService } from '../../services/theme.service';
import { computed } from '@angular/core';

/**
 * SkillCard Component (Dumb/Presentational)
 * Pure presentational component that displays a skill card
 * Receives data via input() signals
 */
export interface SkillCardData {
  id: string;
  name: string;
  description: string;
  iconName: string;
  color: string;
}

@Component({
  selector: 'app-skill-card',
  standalone: true,
  imports: [IconComponent],
  template: `
    <!-- Icon Container -->
    <div [class]="iconContainerClasses()" role="img" [attr.aria-label]="skillData().name + ' icon'">
      <app-icon [iconName]="skillData().iconName" />
    </div>

    <!-- Title -->
    <h3 [class]="titleClasses()">
      {{ skillData().name }}
    </h3>

    <!-- Description -->
    <p [class]="descriptionClasses()">
      {{ skillData().description }}
    </p>
  `,
  styleUrl: './skill-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class SkillCardComponent {
  private readonly themeService = inject(ThemeService);

  // Input signal for skill data
  readonly skillData = input.required<SkillCardData>();

  // Host classes with dynamic border colors
  protected readonly hostClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return `rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border focus-within:ring-2 focus-within:ring-blue-500 block ${
      isDark
        ? 'border-blue-500/10 hover:border-blue-500/30'
        : 'border-gray-200 hover:border-blue-400'
    }`;
  });

  // Computed classes for icon container
  protected readonly iconContainerClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return `w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg text-white ${
      this.skillData().color
    }`;
  });

  // Computed classes for title
  protected readonly titleClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return `text-2xl font-bold mb-4 transition-colors duration-300 ${
      isDark ? 'text-white' : 'text-gray-900'
    }`;
  });

  // Computed classes for description
  protected readonly descriptionClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return `leading-relaxed transition-colors duration-300 ${
      isDark ? 'text-slate-300' : 'text-gray-700'
    }`;
  });
}
