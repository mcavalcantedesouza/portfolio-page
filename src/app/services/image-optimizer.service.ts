import { Injectable } from '@angular/core';

/**
 * Image Optimization Service
 * Provides utilities for optimized image loading with responsive breakpoints
 * and lazy loading
 *
 * Usage:
 * constructor(private imgOptimizer: ImageOptimizerService) {}
 *
 * getImageSizes(imageName: string) {
 *   return this.imgOptimizer.createResponsiveImage(
 *     imageName,
 *     [320, 640, 1024, 1920]
 *   );
 * }
 */
@Injectable({
  providedIn: 'root',
})
export class ImageOptimizerService {
  private readonly baseImagePath = '/images';

  /**
   * Generate responsive image sources for different breakpoints
   * @param imageName - Name of the image file without extension
   * @param breakpoints - Array of breakpoint widths in pixels
   * @returns Object with responsive image configuration
   */
  createResponsiveImage(
    imageName: string,
    breakpoints: number[] = [320, 640, 1024, 1920]
  ): {
    srcset: string;
    sizes: string;
    src: string;
  } {
    const srcset = breakpoints
      .map((bp) => `${this.baseImagePath}/${imageName}-${bp}w.webp ${bp}w`)
      .join(', ');

    const sizes = this.generateSizeHints(breakpoints);
    const src = `${this.baseImagePath}/${imageName}.webp`;

    return { srcset, sizes, src };
  }

  /**
   * Generate CSS media query hints for responsive images
   */
  private generateSizeHints(breakpoints: number[]): string {
    if (breakpoints.length === 0) return '100vw';

    const hints: string[] = [];

    // Mobile first approach
    hints.push(`(max-width: 640px) 100vw`);
    hints.push(`(max-width: 1024px) 80vw`);
    hints.push(`(max-width: 1920px) 60vw`);
    hints.push(`40vw`);

    return hints.join(', ');
  }

  /**
   * Get image dimensions for aspect ratio preservation
   */
  getImageDimensions(
    imageName: string
  ): { width: number; height: number } {
    // Default to 16:9 aspect ratio
    return {
      width: 1920,
      height: 1080,
    };
  }

  /**
   * Generate image loading placeholder (LQIP)
   * Low Quality Image Placeholder
   */
  generatePlaceholder(imageName: string): string {
    // In production, this would be a low-quality base64 image
    // For now, returning a gradient placeholder
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad'%3E%3Cstop offset='0%25' style='stop-color:rgb(200,200,200);stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:rgb(100,100,100);stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad)'/%3E%3C/svg%3E`;
  }

  /**
   * Get optimal image format based on browser support
   * Returns WebP for modern browsers, fallback to JPEG/PNG
   */
  getOptimalFormat(imageName: string): {
    webp: string;
    jpg: string;
    png: string;
  } {
    return {
      webp: `${this.baseImagePath}/${imageName}.webp`,
      jpg: `${this.baseImagePath}/${imageName}.jpg`,
      png: `${this.baseImagePath}/${imageName}.png`,
    };
  }

  /**
   * Calculate image dimensions for lazy loading
   * Helps prevent layout shift
   */
  calculateDimensions(
    containerWidth: number,
    aspectRatio: number = 16 / 9
  ): { width: number; height: number } {
    return {
      width: containerWidth,
      height: Math.round(containerWidth / aspectRatio),
    };
  }
}
