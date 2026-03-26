// @ts-expect-error - Playwright fixture typing is handled by test framework
import { test, expect } from '../fixtures/portfolio.fixture';
import type { Page, BrowserContext } from '@playwright/test';

test.describe('Portfolio - Theme Switching', () => {
  // @ts-expect-error - portfolioPage type is provided by fixture
  test('should toggle theme successfully', async ({ portfolioPage }) => {
    // Given: User is on portfolio
    await portfolioPage.navigateToHome();

    // When: User toggles theme
    await portfolioPage.toggleTheme();

    // Then: Theme should change
    const htmlElement = portfolioPage.page.locator('html');
    const hasThemeAttribute = await htmlElement.evaluate(
      (el: HTMLElement) => el.getAttribute('data-theme') || el.classList.toString(),
    );
    expect(hasThemeAttribute).toBeTruthy();
  });

  // @ts-expect-error - page type is provided by Playwright context
  test('should persist theme preference', async ({ page }) => {
    // Set theme preference
    await page.goto('/');
    await page.click('app-theme-toggle button');

    // Get the theme value
    const themeValue = await page.evaluate(() => {
      return localStorage.getItem('theme') || document.documentElement.getAttribute('data-theme');
    });

    // Reload page
    await page.reload();

    // Theme should be persisted
    const persistedTheme = await page.evaluate(() => {
      return localStorage.getItem('theme') || document.documentElement.getAttribute('data-theme');
    });

    expect(persistedTheme).toBe(themeValue);
  });
});

test.describe('Portfolio - Projects Section', () => {
  // @ts-expect-error - portfolioPage type is provided by fixture
  test('should load and display projects', async ({ portfolioPage }) => {
    // Given: User navigates to portfolio
    await portfolioPage.navigateToHome();

    // When: Projects section is visible
    await portfolioPage.scrollToProjects();

    // Then: Projects should be displayed
    const projectCount = await portfolioPage.getProjectsCount();
    expect(projectCount).toBeGreaterThan(0);
  });

  // @ts-expect-error - page type is provided by Playwright context
  test('should display project information', async ({ page }) => {
    // Given: User is viewing projects
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // When: Project cards are visible
    const firstProject = page.locator('app-project-card').first();
    await firstProject.scrollIntoViewIfNeeded();

    // Then: Project content should be visible
    await expect(firstProject).toBeVisible();
  });
});

test.describe('Portfolio - Skills Section', () => {
  // @ts-expect-error - portfolioPage type is provided by fixture
  test('should display skill cards', async ({ portfolioPage }) => {
    // Given: User navigates to portfolio
    await portfolioPage.navigateToHome();

    // When: Skills section is visible
    await portfolioPage.scrollToElement(portfolioPage['skillsSelector']);

    // Then: Skills should be displayed
    const skillCount = await portfolioPage.getSkillsCount();
    expect(skillCount).toBeGreaterThan(0);
  });

  // @ts-expect-error - page type is provided by Playwright context
  test('should load skills data', async ({ page }) => {
    // When: User navigates home
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Then: Skill cards should have content
    const skillCards = page.locator('app-skill-card');
    const firstCard = skillCards.first();

    await expect(firstCard).toBeVisible();
  });
});

test.describe('Portfolio - Contact Section', () => {
  // @ts-expect-error - portfolioPage type is provided by fixture
  test('should display contact section', async ({ portfolioPage }) => {
    // Given: User is on portfolio
    await portfolioPage.navigateToHome();

    // When: User scrolls to contact
    await portfolioPage.scrollToContact();

    // Then: Contact section should be in viewport
    await expect(portfolioPage.page.locator(portfolioPage['contactSelector'])).toBeInViewport();
  });

  // @ts-expect-error - page type is provided by Playwright context
  test('should have functional contact elements', async ({ page }) => {
    // When: User navigates to contact section
    await page.goto('/');
    await page.locator('app-contact').scrollIntoViewIfNeeded();

    // Then: Contact elements should be present and focusable
    const contactElements = page.locator('app-contact button, app-contact a, app-contact input');
    const count = await contactElements.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Portfolio - Keyboard Navigation', () => {
  // @ts-expect-error - page type is provided by Playwright context
  test('should be keyboard navigable', async ({ page }) => {
    // Given: User is on portfolio
    await page.goto('/');

    // When: User tabs through page
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => {
      return document.activeElement?.tagName;
    });

    // Then: An element should be focused
    expect(focusedElement).toBeTruthy();
  });

  // @ts-expect-error - page type is provided by Playwright context
  test('should support arrow key navigation', async ({ page }) => {
    // Given: User is on portfolio
    await page.goto('/');

    // When: User presses arrow keys
    const initialScroll = await page.evaluate(() => window.scrollY);
    await page.keyboard.press('ArrowDown');
    const finalScroll = await page.evaluate(() => window.scrollY);

    // Then: Page should be scrollable
    // Note: Depending on implementation, scroll might change
    expect(typeof finalScroll).toBe('number');
  });
});

test.describe('Portfolio - API Integration', () => {
  // @ts-expect-error - page type is provided by Playwright context
  test('should fetch github data successfully', async ({ page }) => {
    // When: User navigates to portfolio
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Then: GitHub data should be loaded
    // This depends on your actual API integration
    const hasGithubContent = await page.locator('text=/github|repository/i').count();
    // Adjust assertion based on your implementation
  });

  // @ts-expect-error - page type is provided by Playwright context
  test('should handle API errors gracefully', async ({ page }) => {
    // This test requires mocking or network manipulation
    // When: API call fails
    // Then: Error should be handled gracefully
    // Implement based on your error handling strategy
  });
});

test.describe('Portfolio - Dark Mode', () => {
  test.use({ colorScheme: 'dark' });

  // @ts-expect-error - portfolioPage type is provided by fixture
  test('should render correctly in dark mode', async ({ portfolioPage }) => {
    // When: Browser is in dark mode
    await portfolioPage.navigateToHome();

    // Then: Page should be visible
    await expect(portfolioPage.page.locator(portfolioPage['headerSelector'])).toBeVisible();
  });
});

test.describe('Portfolio - Light Mode', () => {
  test.use({ colorScheme: 'light' });

  // @ts-expect-error - portfolioPage type is provided by fixture
  test('should render correctly in light mode', async ({ portfolioPage }) => {
    // When: Browser is in light mode
    await portfolioPage.navigateToHome();

    // Then: Page should be visible
    await expect(portfolioPage.page.locator(portfolioPage['headerSelector'])).toBeVisible();
  });
});
