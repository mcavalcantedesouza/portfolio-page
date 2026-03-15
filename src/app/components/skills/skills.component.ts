import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { PortfolioService } from '../../services/portfolio.service';
import { ThemeService } from '../../services/theme.service';

/**
 * Skills Component
 * Displays skill cards with icons and descriptions
 */
@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block'
  }
})
export class SkillsComponent {
  private readonly portfolioService = inject(PortfolioService);
  protected readonly themeService = inject(ThemeService);

  protected readonly skills = this.portfolioService.skills$;
}
