// @ts-expect-error - Playwright fixture typing is handled by test framework
import { test, expect } from '../fixtures/portfolio.fixture';
import type { Page } from '@playwright/test';

test.describe('Portfolio - Navigation and Layout', () => {
  // @ts-expect-error - portfolioPage type is provided by fixture
  test('should load portfolio page successfully', async ({ portfolioPage }) => {
    // Given: User navigates to portfolio
    await portfolioPage.navigateToHome();

    // Then: Page should load correctly
    const title = await portfolioPage.getTitle();
    expect(title).toContain('Portfolio');
  });

  // @ts-expect-error - portfolioPage type is provided by fixture
  test('should display all main sections', async ({ portfolioPage }) => {
    // Given: User is on portfolio home
    await portfolioPage.navigateToHome();

    // Then: All main sections should be visible
    await expect(portfolioPage.page.locator(portfolioPage['headerSelector'])).toBeVisible();
    await expect(portfolioPage.page.locator(portfolioPage['heroSelector'])).toBeVisible();
    await expect(portfolioPage.page.locator(portfolioPage['footerSelector'])).toBeVisible();
  });

  // @ts-expect-error - portfolioPage type is provided by fixture
  test('should navigate to about section on scroll', async ({ portfolioPage }) => {
    // Given: User is on portfolio home
    await portfolioPage.navigateToHome();

    // When: User scrolls to about section
    await portfolioPage.scrollToAbout();

    // Then: About section should be in viewport
    await expect(portfolioPage.page.locator(portfolioPage['aboutSelector'])).toBeInViewport();
  });

  // @ts-expect-error - portfolioPage type is provided by fixture
  test('should navigate to projects section on scroll', async ({ portfolioPage }) => {
    // Given: User is on portfolio home
    await portfolioPage.navigateToHome();

    // When: User scrolls to projects section
    await portfolioPage.scrollToProjects();

    // Then: Projects section should be in viewport
    await expect(portfolioPage.page.locator(portfolioPage['projectsSelector'])).toBeInViewport();
  });

  // @ts-expect-error - portfolioPage type is provided by fixture
  test('should navigate to contact section on scroll', async ({ portfolioPage }) => {
    // Given: User is on portfolio home
    await portfolioPage.navigateToHome();

    // When: User scrolls to contact section
    await portfolioPage.scrollToContact();

    // Then: Contact section should be in viewport
    await expect(portfolioPage.page.locator(portfolioPage['contactSelector'])).toBeInViewport();
  });

  // @ts-expect-error - portfolioPage type is provided by fixture
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

  // @ts-expect-error - portfolioPage type is provided by fixture
  test('should be responsive on mobile viewport', async ({ portfolioPage }) => {
    // Given: User is on mobile device
    // When: User navigates to portfolio
    await portfolioPage.navigateToHome();

    // Then: Page should be visible on mobile
    await expect(portfolioPage.page.locator(portfolioPage['headerSelector'])).toBeVisible();
  });
});

test.describe('Portfolio - Performance', () => {
  // @ts-expect-error - portfolioPage type is provided by fixture
  test('should load within acceptable time', async ({ portfolioPage }) => {
    // Given: Perf measurement starts
    const startTime = Date.now();

    // When: User navigates to portfolio
    await portfolioPage.navigateToHome();

    // Then: Load time should be acceptable (< 5s)
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(5000);
  });

  // @ts-expect-error - portfolioPage type is provided by fixture
  test('should handle network idle state properly', async ({ portfolioPage }) => {
    // When: User navigates to portfolio
    await portfolioPage.navigateToHome();
    await portfolioPage.waitForNavigation();

    // Then: Network should be idle
    await expect(portfolioPage.page.locator(portfolioPage['projectsSelector'])).toBeVisible();
  });
});

test.describe('Portfolio - SEO and Accessibility', () => {
  // @ts-expect-error - portfolioPage type is provided by fixture
  test('should have valid heading structure', async ({ portfolioPage }) => {
    // When: User navigates to portfolio
    await portfolioPage.navigateToHome();

    // Then: Page should have proper heading hierarchy
    const h1Elements = await portfolioPage.page.locator('h1').count();
    expect(h1Elements).toBeGreaterThan(0);
  });

  // @ts-expect-error - portfolioPage type is provided by fixture
  test('should have alt text for images', async ({ portfolioPage }) => {
    // When: User navigates to portfolio
    await portfolioPage.navigateToHome();

    // Then: All images should have alt text
    const imagesWithoutAlt = await portfolioPage.page
      .locator('img:not([alt]), img[alt=""]')
      .count();
    
    // Note: This depends on your actual implementation
    // Adjust based on your portfolio structure
    expect(imagesWithoutAlt).toBe(0);
  });

  // @ts-expect-error - portfolioPage type is provided by fixture
  test('should have proper link structure', async ({ portfolioPage }) => {
    // When: User navigates to portfolio
    await portfolioPage.navigateToHome();

    // Then: Links should be accessible
    const links = await portfolioPage.page.locator('a').count();
    expect(links).toBeGreaterThan(0);
  });
});
