import { test as base, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { PortfolioPage } from '../pages';

/**
 * Fixture for portfolio page
 * Extends base test with portfolio page instance
 */
export type PortfolioFixtures = {
  portfolioPage: PortfolioPage;
};

export const test = base.extend<PortfolioFixtures>({
  portfolioPage: async ({ page }: { page: Page }, use: (value: PortfolioPage) => Promise<void>) => {
    const portfolioPage = new PortfolioPage(page);
    await use(portfolioPage);
  },
});

export { expect };
