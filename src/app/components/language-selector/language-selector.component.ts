import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, Language } from '../../services/language.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="relative">
      <button
        (click)="toggleDropdown()"
        class="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-300"
        [class.bg-slate-700]="themeService.isDarkMode()"
        [class.hover:bg-slate-600]="themeService.isDarkMode()"
        [class.bg-gray-200]="!themeService.isDarkMode()"
        [class.hover:bg-gray-300]="!themeService.isDarkMode()"
      >
        <span class="text-xl">{{ currentFlagEmoji() }}</span>
        <span class="text-sm font-medium hidden sm:inline">{{ currentLanguageName() }}</span>
        <app-icon iconName="expand_more" />
      </button>

      @if (isDropdownOpen()) {
        <div
          class="absolute right-0 mt-2 w-48 rounded-lg shadow-xl z-50 border transition-all duration-300"
          [class.bg-slate-700]="themeService.isDarkMode()"
          [class.border-slate-600]="themeService.isDarkMode()"
          [class.bg-white]="!themeService.isDarkMode()"
          [class.border-gray-200]="!themeService.isDarkMode()"
        >
          @for (lang of languages; track lang.code) {
            <button
              (click)="selectLanguage(lang.code)"
              class="w-full text-left px-4 py-3 flex items-center gap-3 transition-colors duration-300 border-b last:border-b-0"
              [class.bg-slate-600]="
                themeService.isDarkMode() && languageService.getLanguage() === lang.code
              "
              [class.bg-blue-100]="
                !themeService.isDarkMode() && languageService.getLanguage() === lang.code
              "
              [class.hover:bg-slate-600]="themeService.isDarkMode()"
              [class.hover:bg-gray-100]="!themeService.isDarkMode()"
            >
              <span class="text-xl">{{ lang.flag }}</span>
              <span class="text-sm font-medium">{{ lang.name }}</span>
              @if (languageService.getLanguage() === lang.code) {
                <app-icon iconName="check" class="ml-auto" />
              }
            </button>
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSelectorComponent {
  readonly languageService = inject(LanguageService);
  readonly themeService = inject(ThemeService);

  protected readonly isDropdownOpen = signal(false);
  protected readonly languages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'pt' as Language, name: 'Português', flag: '🇧🇷' },
  ];

  protected currentFlagEmoji = (): string => {
    const lang = this.languageService.getLanguage();
    return lang === 'pt' ? '🇧🇷' : '🇺🇸';
  };

  protected currentLanguageName = (): string => {
    const lang = this.languageService.getLanguage();
    return lang === 'pt' ? 'Português' : 'English';
  };

  protected toggleDropdown(): void {
    this.isDropdownOpen.update((v) => !v);
  }

  protected selectLanguage(lang: Language): void {
    this.languageService.setLanguage(lang);
    this.isDropdownOpen.set(false);
  }
}

import { ThemeService } from '../../services/theme.service';
