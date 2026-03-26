import { Page } from '@playwright/test';

/**
 * Base Page Object containing common methods and selectors
 */
export class BasePage {
  constructor(protected page: Page) {}

  /**
   * Navigate to a path relative to baseURL
   */
  async goto(path: string = '/') {
    await this.page.goto(path);
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(selector: string, timeout = 5000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(selector: string): Promise<boolean> {
    return this.page.isVisible(selector);
  }

  /**
   * Click element
   */
  async click(selector: string) {
    await this.page.click(selector);
  }

  /**
   * Fill input field
   */
  async fill(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  /**
   * Get element text
   */
  async getText(selector: string): Promise<string> {
    return (await this.page.textContent(selector)) || '';
  }

  /**
   * Wait for navigation
   */
  async waitForNavigation() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get page URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Scroll to element
   */
  async scrollToElement(selector: string) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }
}
