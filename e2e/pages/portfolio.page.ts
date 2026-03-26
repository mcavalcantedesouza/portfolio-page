import { Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Portfolio Page Object
 * Contains locators and methods for interacting with the portfolio page
 */
export class PortfolioPage extends BasePage {
  // Selectors
  readonly headerSelector = 'app-header';
  readonly heroSelector = 'app-hero';
  readonly aboutSelector = 'app-about';
  readonly skillsSelector = 'app-skills';
  readonly projectsSelector = 'app-projects';
  readonly contactSelector = 'app-contact';
  readonly footerSelector = 'app-footer';
  readonly themeToggleSelector = 'app-theme-toggle button';
  readonly languageSelectorSelector = 'app-language-selector';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to portfolio home
   */
  async navigateToHome() {
    await this.goto('/');
    await this.waitForNavigation();
  }

  /**
   * Check if header is visible
   */
  async isHeaderVisible(): Promise<boolean> {
    return this.isElementVisible(this.headerSelector);
  }

  /**
   * Check if hero section is visible
   */
  async isHeroVisible(): Promise<boolean> {
    return this.isElementVisible(this.heroSelector);
  }

  /**
   * Check if about section is visible
   */
  async isAboutVisible(): Promise<boolean> {
    return this.isElementVisible(this.aboutSelector);
  }

  /**
   * Check if skills section is visible
   */
  async isSkillsVisible(): Promise<boolean> {
    return this.isElementVisible(this.skillsSelector);
  }

  /**
   * Check if projects section is visible
   */
  async isProjectsVisible(): Promise<boolean> {
    return this.isElementVisible(this.projectsSelector);
  }

  /**
   * Check if contact section is visible
   */
  async isContactVisible(): Promise<boolean> {
    return this.isElementVisible(this.contactSelector);
  }

  /**
   * Check if footer is visible
   */
  async isFooterVisible(): Promise<boolean> {
    return this.isElementVisible(this.footerSelector);
  }

  /**
   * Toggle theme
   */
  async toggleTheme() {
    await this.click(this.themeToggleSelector);
  }

  /**
   * Scroll to about section
   */
  async scrollToAbout() {
    await this.scrollToElement(this.aboutSelector);
  }

  /**
   * Scroll to projects section
   */
  async scrollToProjects() {
    await this.scrollToElement(this.projectsSelector);
  }

  /**
   * Scroll to contact section
   */
  async scrollToContact() {
    await this.scrollToElement(this.contactSelector);
  }

  /**
   * Get all project cards count
   */
  async getProjectsCount(): Promise<number> {
    return await this.page.locator('app-project-card').count();
  }

  /**
   * Get all skill cards count
   */
  async getSkillsCount(): Promise<number> {
    return await this.page.locator('app-skill-card').count();
  }
}
