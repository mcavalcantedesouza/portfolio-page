import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { PortfolioService } from '../../services/portfolio.service';
import { ThemeService } from '../../services/theme.service';

/**
 * Header Component
 * Main navigation bar with theme toggle and mobile menu
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconComponent, ThemeToggleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block'
  }
})
export class HeaderComponent {
  private readonly portfolioService = inject(PortfolioService);
  protected readonly themeService = inject(ThemeService);

  protected readonly mobileMenuOpen = signal(false);
  protected readonly navLinks = this.portfolioService.navLinks$;

  /**
   * Toggle mobile menu visibility
   */
  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update((value) => !value);
  }

  /**
   * Close mobile menu
   */
  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}


