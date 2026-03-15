import { Injectable, effect, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  // Signal para armazenar o tema atual
  private readonly currentTheme = signal<Theme>(this.getInitialTheme());

  // Sinais públicos
  readonly theme$ = this.currentTheme.asReadonly();
  readonly isDarkMode$ = this.currentTheme.asReadonly();

  constructor() {
    // Efeito para aplicar o tema ao DOM sempre que mudar
    effect(() => {
      const theme = this.currentTheme();
      this.applyTheme(theme);
      this.persistTheme(theme);
    });
  }

  /**
   * Obtém o tema inicial baseado em localStorage ou preferência do sistema
   */
  private getInitialTheme(): Theme {
    // Verificar se há tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme;
    }

    // Detectar preferência do sistema
    const prefersDark = this.document.defaultView?.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches ?? true;

    return prefersDark ? 'dark' : 'light';
  }

  /**
   * Aplica o tema ao elemento raiz do documento
   */
  private applyTheme(theme: Theme): void {
    const htmlElement = this.document.documentElement;
    
    // Remover ambas as classes e adicionar a correta
    htmlElement.classList.remove('light', 'dark');
    htmlElement.classList.add(theme);
    
    // Também adicionar ao body para compatibilidade
    const bodyElement = this.document.body;
    bodyElement.classList.remove('light', 'dark');
    bodyElement.classList.add(theme);

    // Definir atributo data-theme
    htmlElement.setAttribute('data-theme', theme);
  }

  /**
   * Persiste o tema no localStorage
   */
  private persistTheme(theme: Theme): void {
    localStorage.setItem('theme', theme);
  }

  /**
   * Obtém o tema atual
   */
  getTheme(): Theme {
    return this.currentTheme();
  }

  /**
   * Define um tema específico
   */
  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
  }

  /**
   * Alterna entre tema claro e escuro
   */
  toggleTheme(): void {
    const newTheme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  /**
   * Verifica se está em modo escuro
   */
  isDarkMode(): boolean {
    return this.currentTheme() === 'dark';
  }
}
