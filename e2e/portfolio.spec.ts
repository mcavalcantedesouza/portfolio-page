import { test, expect } from './fixtures';
import type { Page } from '@playwright/test';

test.describe('Portfolio - Navigation and Layout', () => {
  test('should load portfolio page successfully', async ({ portfolioPage }) => {
    // Given: User navigates to portfolio
    await portfolioPage.navigateToHome();

    // Then: Page should load correctly
    const title = await portfolioPage.getTitle();
    expect(title).toContain('Portfolio');
  });

  test('should display all main sections', async ({ portfolioPage }) => {
    // Given: User is on portfolio home
    await portfolioPage.navigateToHome();

    // Then: All main sections should be visible
    await expect(portfolioPage.getPage.locator(portfolioPage['headerSelector'])).toBeVisible();
    await expect(portfolioPage.getPage.locator(portfolioPage['heroSelector'])).toBeVisible();
    await expect(portfolioPage.getPage.locator(portfolioPage['footerSelector'])).toBeVisible();
  });

  test('should navigate to about section on scroll', async ({ portfolioPage }) => {
    // Given: User is on portfolio home
    await portfolioPage.navigateToHome();

    // When: User scrolls to about section
    await portfolioPage.scrollToAbout();

    // Then: About section should be in viewport
    await expect(portfolioPage.getPage.locator(portfolioPage['aboutSelector'])).toBeInViewport();
  });

  test('should navigate to projects section on scroll', async ({ portfolioPage }) => {
    // Given: User is on portfolio home
    await portfolioPage.navigateToHome();

    // When: User scrolls to projects section
    await portfolioPage.scrollToProjects();

    // Then: Projects section should be in viewport
    await expect(portfolioPage.getPage.locator(portfolioPage['projectsSelector'])).toBeInViewport();
  });

  test('should navigate to contact section on scroll', async ({ portfolioPage }) => {
    // Given: User is on portfolio home
    await portfolioPage.navigateToHome();

    // When: User scrolls to contact section
    await portfolioPage.scrollToContact();

    // Then: Contact section should be in viewport
    await expect(portfolioPage.getPage.locator(portfolioPage['contactSelector'])).toBeInViewport();
  });

  test('should have correct page URL', async ({ portfolioPage }) => {
    // When: User navigates home
    await portfolioPage.navigateToHome();

    // Then: URL should be correct
    const url = await portfolioPage.getCurrentUrl();
    expect(url).toContain('localhost');
  });
});

test.describe('Portfolio - Responsive Design', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should be responsive on mobile viewport', async ({ portfolioPage }) => {
    // Given: User is on mobile device
    // When: User navigates to portfolio
    await portfolioPage.navigateToHome();

    // Then: Page should be visible on mobile
    await expect(portfolioPage.getPage.locator(portfolioPage['headerSelector'])).toBeVisible();
  });
});

test.describe('Portfolio - Performance', () => {
  test('should load within acceptable time', async ({ portfolioPage }) => {
    // Given: Perf measurement starts
    const startTime = Date.now();

    // When: User navigates to portfolio
    await portfolioPage.navigateToHome();

    // Then: Load time should be acceptable (< 5s)
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(5000);
  });

  test('should handle network idle state properly', async ({ portfolioPage }) => {
    // When: User navigates to portfolio
    await portfolioPage.navigateToHome();
    await portfolioPage.waitForNavigation();

    // Then: Network should be idle
    await expect(portfolioPage.getPage.locator(portfolioPage['projectsSelector'])).toBeVisible();
  });
});

test.describe('Portfolio - SEO and Accessibility', () => {
  test('should have valid heading structure', async ({ portfolioPage }) => {
    // When: User navigates to portfolio
    await portfolioPage.navigateToHome();

    // Then: Page should have proper heading hierarchy
    const h1Elements = await portfolioPage.getPage.locator('h1').count();
    expect(h1Elements).toBeGreaterThan(0);
  });

  test('should have alt text for images', async ({ portfolioPage }) => {
    // When: User navigates to portfolio
    await portfolioPage.navigateToHome();

    // Then: All images should have alt text
    const imagesWithoutAlt = await portfolioPage.getPage
      .locator('img:not([alt]), img[alt=""]')
      .count();

    // Note: This depends on your actual implementation
    // Adjust based on your portfolio structure
    expect(imagesWithoutAlt).toBe(0);
  });

  test('should have proper link structure', async ({ portfolioPage }) => {
    // When: User navigates to portfolio
    await portfolioPage.navigateToHome();

    // Then: Links should be accessible
    const links = await portfolioPage.getPage.locator('a').count();
    expect(links).toBeGreaterThan(0);
  });
});
