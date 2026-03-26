---
name: e2e-testing
description: Create, run, and manage Playwright e2e tests following industry best practices
applyTo: ^e2e/.*\.(spec|test|steps)\.ts$|^playwright\.config\.ts$|^E2E-TESTING\.md$
keywords:
  - e2e
  - testing
  - playwright
  - automation
  - quality assurance
---

# 🎭 E2E Testing with Playwright - Industry Standard Skill

## Overview

This skill guides you through creating and maintaining end-to-end tests using Playwright following modern industry best practices. It includes:

- **Page Object Model (POM)** - Decoupling locators from test logic
- **Fixtures** - Reusable test setup and teardown
- **Step Definition Pattern** - BDD-style test organization
- **Best Practices** - Timeouts, waits, error handling, and reporting
- **CI/CD Integration** - Ready for production pipelines

## Quick Commands

```bash
# Run all tests
npm run e2e

# Interactive UI mode
npm run e2e:ui

# Debug mode
npm run e2e:debug

# View results
npm run e2e:report

# Specific browser
npm run e2e:chromium
npm run e2e:firefox
npm run e2e:webkit
npm run e2e:mobile
```

## Project Structure

```
e2e/
├── pages/              # Page Object Models
│   ├── base.page.ts    # Base page with common methods
│   ├── portfolio.page.ts  # Specific page objects
│   └── index.ts        # Export all pages
├── fixtures/           # Custom test fixtures
│   ├── portfolio.fixture.ts  # Portfolio page fixture
│   └── index.ts        # Export all fixtures
├── steps/              # Step definitions (optional BDD pattern)
│   ├── portfolio.steps.ts
│   └── index.ts
└── *.spec.ts          # Test files
playwright.config.ts    # Playwright configuration
test-results/          # Generated test reports
```

## Pattern: Page Object Model (POM)

Encapsulate page interactions and locators in reusable classes:

### Base Page Class

```typescript
// e2e/pages/base.page.ts
export class BasePage {
  constructor(protected page: Page) {}

  async goto(path: string = '/') {
    await this.page.goto(path);
  }

  async click(selector: string) {
    await this.page.click(selector);
  }

  async fill(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  async getText(selector: string): Promise<string> {
    return (await this.page.textContent(selector)) || '';
  }

  async isElementVisible(selector: string): Promise<boolean> {
    return this.page.isVisible(selector);
  }

  async waitForNavigation() {
    await this.page.waitForLoadState('networkidle');
  }
}
```

### Page-Specific Class

```typescript
// e2e/pages/portfolio.page.ts
export class PortfolioPage extends BasePage {
  readonly headerSelector = 'app-header';
  readonly projectsSelector = 'app-projects';

  async navigateToHome() {
    await this.goto('/');
    await this.waitForNavigation();
  }

  async isHeaderVisible(): Promise<boolean> {
    return this.isElementVisible(this.headerSelector);
  }

  async scrollToProjects() {
    await this.page.locator(this.projectsSelector).scrollIntoViewIfNeeded();
  }

  async getProjectsCount(): Promise<number> {
    return await this.page.locator('app-project-card').count();
  }
}
```

## Pattern: Fixtures

Use fixtures for dependency injection and automatic cleanup:

```typescript
// e2e/fixtures/portfolio.fixture.ts
import { test as base } from '@playwright/test';
import { PortfolioPage } from '../pages';

type PortfolioFixtures = {
  portfolioPage: PortfolioPage;
};

export const test = base.extend<PortfolioFixtures>({
  portfolioPage: async ({ page }, use) => {
    const portfolioPage = new PortfolioPage(page);
    await use(portfolioPage);
  },
});

export { expect } from '@playwright/test';
```

### Using Fixtures in Tests

```typescript
// e2e/portfolio.spec.ts
import { test, expect } from '../fixtures/portfolio.fixture';

test('should load portfolio', async ({ portfolioPage }) => {
  // portfolioPage is automatically injected
  await portfolioPage.navigateToHome();
  expect(await portfolioPage.isHeaderVisible()).toBe(true);
});
```

## Essential Best Practices

### ✅ Do

```typescript
// Wait for conditions, not time
await page.waitForLoadState('networkidle');
await page.locator('button').isVisible();

// Use semantic selectors
await page.locator('button:has-text("Submit")').click();
await page.locator('input[type="email"]').fill('test@example.com');

// Meaningful assertions
await expect(page.locator('h1')).toHaveText('Portfolio');
await expect(page.locator('button')).toBeVisible();

// Organize with describe blocks
test.describe('Portfolio - Navigation', () => {
  test('should navigate', async ({ portfolioPage }) => {
    // ...
  });
});

// Use hooks for setup/teardown
test.beforeEach(async ({ portfolioPage }) => {
  await portfolioPage.navigateToHome();
});
```

### ❌ Don't

```typescript
// Don't use arbitrary timeouts
await page.waitForTimeout(5000);

// Don't use fragile selectors
await page.click('.btn-1234');
await page.locator('button').click(); // Ambiguous

// Don't couple tests
test.only('assumes previous test ran');

// Don't suppress errors silently
await page.goto('/').catch(() => {}); // Wrong!
```

## Common Test Scenarios

### Navigation Tests

```typescript
test('should navigate through sections', async ({ portfolioPage }) => {
  await portfolioPage.navigateToHome();
  expect(await portfolioPage.page.title()).toContain('Portfolio');

  await portfolioPage.scrollToProjects();
  await expect(portfolioPage.page.locator('app-projects')).toBeInViewport();
});
```

### User Interaction Tests

```typescript
test('should toggle dark mode', async ({ portfolioPage }) => {
  await portfolioPage.navigateToHome();

  const initialMode = await portfolioPage.page.evaluate(() =>
    document.documentElement.getAttribute('data-theme'),
  );

  await portfolioPage.toggleTheme();

  const newMode = await portfolioPage.page.evaluate(() =>
    document.documentElement.getAttribute('data-theme'),
  );

  expect(newMode).not.toBe(initialMode);
});
```

### API/Network Tests

```typescript
test('should load projects from API', async ({ portfolioPage }) => {
  await portfolioPage.navigateToHome();
  await portfolioPage.page.waitForLoadState('networkidle');

  const projectsCount = await portfolioPage.getProjectsCount();
  expect(projectsCount).toBeGreaterThan(0);
});
```

### Accessibility Tests

```typescript
test('should have proper heading hierarchy', async ({ portfolioPage }) => {
  await portfolioPage.navigateToHome();

  const h1Count = await portfolioPage.page.locator('h1').count();
  expect(h1Count).toBe(1); // Should have exactly one h1

  const headings = await portfolioPage.page.locator('h1, h2, h3').all();
  expect(headings.length).toBeGreaterThan(0);
});
```

## Debugging & Troubleshooting

### Enable Debug Mode

```bash
npm run e2e:debug
```

Or set environment variable:

```bash
PWDEBUG=1 npm run e2e
```

### Visual Debugging with Headed Mode

```bash
npm run e2e:headed
```

### Inspect Element

```bash
npx playwright test --inspector
```

### Slow Motion

```bash
npx playwright test --headed --slowMo=500
```

### View Trace on Failure

```bash
npx playwright show-trace trace.zip
```

## Handling Common Issues

### Element Not Found

```typescript
// Use better selectors
await page.waitForSelector('app-component', { timeout: 10000 });
await page.locator('button:has-text("Click me")').click();

// Check if element exists before interaction
if (await page.isVisible('.element')) {
  await page.click('.element');
}
```

### Test Timeout

```typescript
// Increase timeout for specific test
test('slow operation', async ({ portfolioPage }) => {
  // ...
}, { timeout: 60000 });

// Or globally in playwright.config.ts
timeout: 60 * 1000,
```

### Flaky Tests

```typescript
// Use proper waits instead of timeouts
await page.waitForLoadState('networkidle');
await page.waitForFunction(() => /* stable state */);

// Use retries for flaky tests
test('may be flaky', async ({ portfolioPage }) => {
  // ...
}, { retries: 2 });
```

## CI/CD Integration

### GitHub Actions Setup

```yaml
name: E2E Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npm run e2e

      - name: Upload artifacts
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 5
```

## Configuration Reference

Key settings in `playwright.config.ts`:

```typescript
{
  testDir: './e2e',                    // Where tests live
  fullyParallel: true,                 // Run tests in parallel
  timeout: 30 * 1000,                  // Per test timeout
  expect: { timeout: 5000 },           // Per assertion timeout
  use: {
    baseURL: 'http://localhost:4200',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run start',          // Auto-start dev server
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env['CI'],
  },
}
```

## Creating New Tests Workflow

1. **Create Page Object** (if needed)

   ```bash
   # e2e/pages/my.page.ts
   export class MyPage extends BasePage { ... }
   ```

2. **Export Page Objects** (update e2e/pages/index.ts)

   ```typescript
   export { MyPage } from './my.page';
   ```

3. **Create Fixture** (if using custom page)

   ```typescript
   // e2e/fixtures/my.fixture.ts
   export const test = base.extend<MyFixtures>({ ... });
   ```

4. **Write Tests**

   ```typescript
   // e2e/my.spec.ts
   import { test, expect } from '../fixtures/my.fixture';

   test('should do something', async ({ myPage }) => {
     await myPage.navigate();
     // arrange, act, assert
   });
   ```

5. **Run Tests**
   ```bash
   npm run e2e
   npm run e2e:report
   ```

## Advanced Topics

### Visual Regression Testing

```typescript
test('should match screenshot', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('home-page.png');
});
```

### Network Mocking

```typescript
test('should handle API errors', async ({ page }) => {
  await page.route('**/api/**', (route) => route.abort());
  await page.goto('/');
  await expect(page.locator('.error')).toBeVisible();
});
```

### API Testing Integration

```typescript
test('should make correct API calls', async ({ page }) => {
  const requests: string[] = [];

  page.on('request', (req) => {
    if (req.url().includes('/api/')) {
      requests.push(req.url());
    }
  });

  await page.goto('/');
  expect(requests).toContainEqual(expect.stringContaining('/api/projects'));
});
```

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Debugging Guide](https://playwright.dev/docs/debug)
- [CI/CD Setup](https://playwright.dev/docs/ci)

## Quick Reference

| Command                                     | Purpose             |
| ------------------------------------------- | ------------------- |
| `npm run e2e`                               | Run all tests       |
| `npm run e2e:ui`                            | Interactive UI mode |
| `npm run e2e:debug`                         | Debug mode          |
| `npm run e2e:headed`                        | See browser         |
| `npm run e2e:report`                        | View HTML report    |
| `npm run e2e:chromium`                      | Chromium only       |
| `npx playwright test --headed --slowMo=500` | Slow motion         |
| `npx playwright test -g "pattern"`          | Run matching tests  |

## Next Steps

1. ✅ Run `npm run e2e` to verify setup
2. ✅ Check `npm run e2e:report` for results
3. ✅ Add more page objects as features grow
4. ✅ Integrate into CI/CD pipeline
5. ✅ Monitor test results and coverage

---

**Need help?** Check [E2E-TESTING.md](../../E2E-TESTING.md) for detailed examples and guides.
