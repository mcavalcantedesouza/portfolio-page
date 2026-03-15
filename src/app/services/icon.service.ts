import { Injectable } from '@angular/core';

/**
 * Maps icon names to Google Material Icons names
 * Provides a centralized location for icon name management
 */
@Injectable({
  providedIn: 'root'
})
export class IconService {
  private readonly iconMap: Record<string, string> = {
    code: 'code',
    palette: 'palette',
    rocket: 'rocket_launch',
    github: 'code',
    linkedin: 'domain',
    mail: 'mail',
    'external-link': 'open_in_new',
    menu: 'menu',
    x: 'close',
    'arrow-right': 'arrow_forward',
    sun: 'light_mode',
    moon: 'dark_mode'
  };

  /**
   * Get Material Icons icon name by alias
   * @param name - The icon alias
   * @returns The Material Icons name
   */
  getIcon(name: string): string {
    return this.iconMap[name] || name;
  }
}
