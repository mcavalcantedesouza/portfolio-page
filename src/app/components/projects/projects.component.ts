import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { PortfolioService } from '../../services/portfolio.service';
import { ThemeService } from '../../services/theme.service';

/**
 * Projects Component
 * Displays a grid of featured projects with descriptions and links
 */
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block'
  }
})
export class ProjectsComponent {
  private readonly portfolioService = inject(PortfolioService);
  protected readonly themeService = inject(ThemeService);

  protected readonly projects = this.portfolioService.projects$;
}
