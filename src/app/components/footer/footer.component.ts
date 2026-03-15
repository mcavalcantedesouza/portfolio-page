import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { ThemeService } from '../../services/theme.service';

/**
 * Footer Component
 * Displays footer with copyright information
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block'
  }
})
export class FooterComponent {
  private readonly portfolioService = inject(PortfolioService);
  protected readonly themeService = inject(ThemeService);
  protected readonly portfolio = this.portfolioService.portfolio$;
}
