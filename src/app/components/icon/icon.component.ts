import { Component, ChangeDetectionStrategy, input, inject } from '@angular/core';
import { IconService } from '../../services/icon.service';

/**
 * Icon Component
 * Renders Google Material Icons with dynamic icon names
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': '"img"'
  }
})
export class IconComponent {
  protected readonly iconService = inject(IconService);
  readonly iconName = input.required<string>();
}
