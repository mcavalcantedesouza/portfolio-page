import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block'
  }
})
export class App {
  // Injetar o theme service para inicializar o tema
  private readonly themeService = inject(ThemeService);
}

