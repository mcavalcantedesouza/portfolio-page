import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { PortfolioService } from '../../services/portfolio.service';
import { ThemeService } from '../../services/theme.service';

/**
 * Contact Component
 * Displays call-to-action section with social media links
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block'
  }
})
export class ContactComponent {
  private readonly portfolioService = inject(PortfolioService);
  protected readonly themeService = inject(ThemeService);

  protected readonly socialLinks = this.portfolioService.socialLinks$;
}
