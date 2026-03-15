import { ApplicationConfig, ErrorHandler } from '@angular/core';
import {
  provideRouter,
  withHashLocation,
  withPreloading,
  PreloadAllModules,
  withComponentInputBinding
} from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

/**
 * Global error handler for unexpected errors
 * Logs errors to console for debugging in development
 */
class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Error | null): void {
    if (error instanceof Error) {
      console.error('Application Error:', error.message);
    }
  }
}

/**
 * Application configuration with router, HTTP, and error handling
 * Optimized for performance and best practices
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Router configuration with lazy loading optimization
    provideRouter(
      routes,
      withHashLocation(), // Use hash-based routing for static hosting
      withComponentInputBinding(), // Enable input binding with route parameters
      withPreloading(PreloadAllModules) // Preload lazy-loaded modules for better UX
    ),
    // HTTP client for API communication
    provideHttpClient(),
    // Global error handling
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ]
};

