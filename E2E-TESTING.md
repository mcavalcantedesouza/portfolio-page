# E2E Testing Guide

Este projeto utiliza **Playwright** para testes end-to-end (e2e) seguindo padrões da indústria moderna.

## 📋 Índice

- [Estrutura de Projeto](#estrutura-de-projeto)
- [Instalação](#instalação)
- [Executando Testes](#executando-testes)
- [Pattern Page Object Model](#pattern-page-object-model)
- [Fixtures](#fixtures)
- [Boas Práticas](#boas-práticas)
- [CI/CD Integration](#cicd-integration)

## 📁 Estrutura de Projeto

```
e2e/
├── pages/                 # Page Object Models
│   ├── base.page.ts      # Classe base com métodos comuns
│   ├── portfolio.page.ts # Página específica do portfolio
│   └── index.ts          # Re-exports
├── fixtures/             # Fixtures customizadas
│   ├── portfolio.fixture.ts
│   └── index.ts
├── steps/                # BDD Step definitions (opcional)
│   └── *.steps.ts
├── *.spec.ts            # Arquivos de teste
└── *.test.ts            # Arquivos de teste (alternativa)

playwright.config.ts      # Configuração do Playwright
test-results/            # Relatórios gerados
```

## 🚀 Instalação

O Playwright já foi instalado como dependência de desenvolvimento:

```bash
npm install
```

Para instalar os browsers:

```bash
npx playwright install
```

## ✅ Executando Testes

### Comandos Básicos

```bash
# Rodar todos os testes
npm run e2e

# Modo UI (interativo e visual)
npm run e2e:ui

# Modo Debug
npm run e2e:debug

# Com navegador visível
npm run e2e:headed

# Apenas em Chromium
npm run e2e:chromium

# Apenas em Firefox
npm run e2e:firefox

# Apenas em Webkit
npm run e2e:webkit

# Apenas em dispositivos móveis
npm run e2e:mobile

# Ver relatório HTML
npm run e2e:report
```

### Exemplos Avançados

```bash
# Rodar arquivo específico
npx playwright test e2e/portfolio.spec.ts

# Rodar teste específico
npx playwright test -g "should load portfolio page successfully"

# Rodar com verbose output
npx playwright test --reporter=list

# Atualizar snapshots
npx playwright test --update-snapshots

# Rodar em paralelo (padrão)
npx playwright test --workers=4

# Rodar sequencialmente
npx playwright test --workers=1
```

## 🏗️ Pattern Page Object Model

O padrão POM encapsula os seletores e ações de cada página:

### Base Page (`e2e/pages/base.page.ts`)

Contém métodos comuns e reutilizáveis:

```typescript
export class BasePage {
  async goto(path: string = '/') {
    /* ... */
  }
  async getTitle(): Promise<string> {
    /* ... */
  }
  async click(selector: string) {
    /* ... */
  }
  async fill(selector: string, text: string) {
    /* ... */
  }
  async getText(selector: string): Promise<string> {
    /* ... */
  }
  async isElementVisible(selector: string): Promise<boolean> {
    /* ... */
  }
}
```

### Portfolio Page (`e2e/pages/portfolio.page.ts`)

Específica para o portfolio:

```typescript
export class PortfolioPage extends BasePage {
  async navigateToHome() {
    /* ... */
  }
  async isHeaderVisible(): Promise<boolean> {
    /* ... */
  }
  async scrollToProjects() {
    /* ... */
  }
  async getProjectsCount(): Promise<number> {
    /* ... */
  }
}
```

### Usando no Teste

```typescript
test('should display all sections', async ({ portfolioPage }) => {
  await portfolioPage.navigateToHome();
  expect(await portfolioPage.isHeaderVisible()).toBe(true);
  expect(await portfolioPage.isFooterVisible()).toBe(true);
});
```

## 🔧 Fixtures

As fixtures injetam dependências nos testes automaticamente:

### Portfolio Fixture

```typescript
// e2e/fixtures/portfolio.fixture.ts
export const test = base.extend<PortfolioFixtures>({
  portfolioPage: async ({ page }, use) => {
    const portfolioPage = new PortfolioPage(page);
    await use(portfolioPage);
  },
});
```

### Usando Fixtures

```typescript
import { test, expect } from '../fixtures/portfolio.fixture';

test('should load page', async ({ portfolioPage }) => {
  // portfolioPage é injetada automaticamente
  await portfolioPage.navigateToHome();
});
```

### Criando Nova Fixture

```typescript
// e2e/fixtures/my.fixture.ts
import { test as base } from '@playwright/test';
import { MyPage } from '../pages/my.page';

type MyFixtures = {
  myPage: MyPage;
};

export const test = base.extend<MyFixtures>({
  myPage: async ({ page }, use) => {
    const myPage = new MyPage(page);
    await use(myPage);
  },
});

export { expect } from '@playwright/test';
```

## ✨ Boas Práticas

### 1. Use Page Object Model

```typescript
// ✅ Bom
await portfolioPage.scrollToProjects();

// ❌ Ruim - lógica no teste
await page.locator('app-projects').scrollIntoViewIfNeeded();
```

### 2. Espere por Condições, Não por Tempo

```typescript
// ✅ Bom
await page.waitForLoadState('networkidle');
await page.locator('app-project-card').isVisible();

// ❌ Ruim
await page.waitForTimeout(5000);
```

### 3. Use Seletores Robustos

```typescript
// ✅ Bom
await page.locator('button:has-text("Submit")').click();
await page.locator('input[type="email"]').fill('test@example.com');

// ❌ Ruim
await page.click('button'); // Ambíguo
await page.locator('.btn-1234').click(); // Frágil
```

### 4. Escreva Testes Independentes

```typescript
// ✅ Bom - cada teste é independente
test('should toggle theme', async ({ portfolioPage }) => {
  await portfolioPage.navigateToHome();
  await portfolioPage.toggleTheme();
  // verificar resultado
});

// ❌ Ruim - depende de teste anterior
test.only('verificar tema foi alternado', async ({ page }) => {
  // Assume que teste anterior já alterou o tema
});
```

### 5. Use Assertions Significativas

```typescript
// ✅ Bom
await expect(portfolioPage.page.locator('h1')).toHaveText('Portfolio');
await expect(portfolioPage.page.locator('button')).toBeVisible();

// ❌ Ruim
expect(await portfolioPage.page.locator('button').count()).toBeGreaterThan(0);
```

### 6. Organize em Describe Blocks

```typescript
test.describe('Portfolio - Navigation', () => {
  test('should navigate to projects', async ({ portfolioPage }) => {
    // ...
  });

  test('should navigate to contact', async ({ portfolioPage }) => {
    // ...
  });
});
```

### 7. Use Before/After Hooks

```typescript
test.describe('Portfolio', () => {
  test.beforeEach(async ({ portfolioPage }) => {
    await portfolioPage.navigateToHome();
  });

  test('should display header', async ({ portfolioPage }) => {
    // Já está na home do portfolio
    expect(await portfolioPage.isHeaderVisible()).toBe(true);
  });
});
```

## 📊 Configuração

### playwright.config.ts

Personalize conforme necessário:

```typescript
export default defineConfig({
  testDir: './e2e',
  timeout: 30 * 1000,
  use: {
    baseURL: 'http://localhost:4200',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env['CI'],
  },
});
```

## 🔄 CI/CD Integration

### GitHub Actions

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
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 5
```

## 🐛 Troubleshooting

### Teste com Timeout

```typescript
// Aumentar timeout para teste específico
test('operação lenta', async ({ portfolioPage }) => {
  // seu teste
}, { timeout: 60000 }); // 60 segundos

// Ou globalmente em playwright.config.ts
timeout: 30 * 1000,
```

### Elemento Não Encontrado

```typescript
// Usar seletores melhores
await page.locator('button:has-text("Click me")').click();

// Aguardar elemento
await page.waitForSelector('app-component', { timeout: 10000 });
```

### Testes Flaky (Instáveis)

```typescript
// Usar retries para testes flaky
test('pode ser flaky', async ({ portfolioPage }) => {
  // seu teste
}, { retries: 2 });

// Ou globalmente
retries: process.env['CI'] ? 2 : 0,
```

## 📚 Recursos

- [Documentação Oficial do Playwright](https://playwright.dev)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging](https://playwright.dev/docs/debug)
- [Trace Viewer](https://trace.playwright.dev)

## 🤝 Contribuindo

Quando adicionar novos testes:

1. Crie/atualize a Page Object em `e2e/pages/`
2. Use fixtures de `e2e/fixtures/`
3. Siga o padrão de nomes: `*.spec.ts`
4. Use em `describe` blocks para organizar
5. Escreva assertions claras
6. Execute localmente antes fazer push

```bash
npm run e2e
npm run e2e:report
```
