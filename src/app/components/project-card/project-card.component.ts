import { Component, ChangeDetectionStrategy, input, inject } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { ThemeService } from '../../services/theme.service';
import { ClassBuilder } from '../../utils/class-builder';
import { computed } from '@angular/core';

/**
 * ProjectCard Component (Dumb/Presentational)
 * Pure presentational component that displays a project card
 * Receives data via input() signals
 */
export interface ProjectCardData {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  tech: string[];
}

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [IconComponent],
  template: `
    <!-- Image Container -->
    <div [class]="imageContainerClasses()">
      <img
        [src]="projectData().image"
        [alt]="projectData().title"
        class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
        loading="lazy"
      />
      <div
        class="absolute inset-0 bg-blue-600/40 group-hover:bg-blue-600/50 transition-colors duration-300"
        aria-hidden="true"
      ></div>
    </div>

    <!-- Content -->
    <div class="p-6 flex flex-col flex-grow">
      <!-- Title -->
      <h3 [class]="titleClasses()">
        {{ projectData().title }}
      </h3>

      <!-- Description -->
      <p [class]="descriptionClasses()">
        {{ projectData().description }}
      </p>

      <!-- Tech Stack -->
      <div class="flex flex-wrap gap-2 mb-4">
        @for (tech of projectData().tech; track tech) {
          <span [class]="techBadgeClasses()" role="tag">
            {{ tech }}
          </span>
        }
      </div>

      <!-- CTA Link -->
      <a [href]="projectData().link" [class]="ctaLinkClasses()">
        View Project
        <app-icon iconName="external-link" class="group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  `,
  styleUrl: './project-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class ProjectCardComponent {
  private readonly themeService = inject(ThemeService);

  // Input signal for project data
  readonly projectData = input.required<ProjectCardData>();

  // Host classes with dynamic border colors using ClassBuilder
  protected readonly hostClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return new ClassBuilder()
      .add('group rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300')
      .add('hover:-translate-y-2 border focus-within:ring-2 focus-within:ring-blue-500 flex flex-col block')
      .addIf(isDark, 'border-blue-500/20 hover:border-blue-500/40', 'border-gray-200 hover:border-blue-400')
      .build();
  });

  // Computed classes for image container using ClassBuilder
  protected readonly imageContainerClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return new ClassBuilder()
      .add('relative h-48 overflow-hidden bg-gradient-to-br')
      .addIf(isDark, 'from-slate-600 to-slate-700', 'from-gray-200 to-gray-300')
      .build();
  });

  // Computed classes for title using ClassBuilder
  protected readonly titleClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return new ClassBuilder()
      .add('text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300')
      .theme(isDark, 'text-gray-900', 'text-white')
      .build();
  });

  // Computed classes for description using ClassBuilder
  protected readonly descriptionClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return new ClassBuilder()
      .add('mb-4 leading-relaxed transition-colors duration-300')
      .theme(isDark, 'text-gray-700', 'text-slate-300')
      .build();
  });

  // Computed classes for tech badge using ClassBuilder
  protected readonly techBadgeClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return new ClassBuilder()
      .add('px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 border')
      .addIf(
        isDark,
        'bg-blue-500/20 text-blue-300 border-blue-500/30',
        'bg-blue-100 text-blue-900 border-blue-200'
      )
      .build();
  });

  // Computed classes for CTA link using ClassBuilder
  protected readonly ctaLinkClasses = computed(() => {
    const isDark = this.themeService.isDarkMode();
    return new ClassBuilder()
      .add('font-semibold flex items-center gap-2 hover:gap-3 transition-all focus:outline-none')
      .add('focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-auto')
      .addIf(
        isDark,
        'text-blue-400 hover:text-blue-300 focus:ring-offset-slate-700',
        'text-blue-600 hover:text-blue-700 focus:ring-offset-white'
      )
      .build();
  });
}
