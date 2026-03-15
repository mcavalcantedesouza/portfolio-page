import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { ThemeService } from '../../services/theme.service';

/**
 * Theme Toggle Component
 * Provides an interactive toggle button to switch between light and dark themes
 * Supports both click and drag interactions
 */
@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:mouseup)': 'endDrag()',
    '(document:touchend)': 'endDrag()',
    '(document:mousemove)': 'onDrag($event)',
    '(document:touchmove)': 'onDrag($event)'
  }
})
export class ThemeToggleComponent {
  protected readonly themeService = inject(ThemeService);

  private readonly isDragging = signal(false);
  private readonly dragStartX = signal(0);

  /**
   * Toggle theme on button click
   */
  protected toggleTheme(): void {
    if (!this.isDragging()) {
      this.themeService.toggleTheme();
    }
  }

  /**
   * Start dragging interaction
   */
  protected startDrag(event: MouseEvent | TouchEvent): void {
    this.isDragging.set(true);
    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    this.dragStartX.set(clientX);
  }

  /**
   * End dragging interaction
   */
  protected endDrag(): void {
    this.isDragging.set(false);
  }

  /**
   * Handle drag movement to toggle theme
   */
  protected onDrag(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging()) return;

    const clientX = event instanceof MouseEvent ? event.clientX : (event as TouchEvent).touches[0]?.clientX;
    if (!clientX) return;

    const dragDistance = clientX - this.dragStartX();
    const threshold = 15;

    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0 && this.themeService.isDarkMode()) {
        this.themeService.setTheme('light');
        this.isDragging.set(false);
      } else if (dragDistance < 0 && !this.themeService.isDarkMode()) {
        this.themeService.setTheme('dark');
        this.isDragging.set(false);
      }
    }
  }
}
