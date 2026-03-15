import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { PortfolioService } from '../../services/portfolio.service';
import { ThemeService } from '../../services/theme.service';

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
    class: 'block'
  }
})
export class HeroComponent {
  private readonly portfolioService = inject(PortfolioService);
  protected readonly themeService = inject(ThemeService);
  protected readonly portfolio = this.portfolioService.portfolio$;
}
