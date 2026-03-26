# 🚀 Copilot Skills & Guides

Este diretório contém skills customizadas e guias de especialização para o GitHub Copilot dentro do projeto Portfolio Page.

## 📚 Skills Disponíveis

### 1. 🎭 E2E Testing with Playwright

**Arquivo:** [`e2e-testing.md`](./e2e-testing.md)

Skill completa para criar e manter testes end-to-end com Playwright seguindo padrões da indústria.

**Inclui:**

- Page Object Model (POM) pattern
- Fixtures e dependency injection
- BDD-style test organization
- Best practices e anti-patterns
- Debugging techniques
- CI/CD integration examples
- Network mocking e API testing
- Accessibility testing

**Quando usar:**

- Criando novos testes e2e
- Debugando testes flaky
- Implementando CI/CD
- Estruturando testes complexos
- Melhorando cobertura de testes

**Exemplos de uso com Copilot:**

```
"Create a new test for the projects section using POM pattern"
"Help me fix this flaky test"
"Show me how to mock API calls in playwright"
"Generate accessibility tests for the portfolio"
```

---

## 🗂️ Estrutura do Projeto

```
.github/copilot/          ← Você está aqui
├── index.md             (Este arquivo)
├── e2e-testing.md       (Skill de testes e2e)

e2e/                      (Testes e2e)
├── pages/               (Page Objects)
├── fixtures/            (Fixtures customizadas)
├── steps/               (BDD steps - opcional)
└── *.spec.ts           (Arquivos de teste)

playwright.config.ts      (Configuração Playwright)
E2E-TESTING.md           (Guia completo)
SKILL.md                 (Patterns avançados)
```

---

## 🎯 Como Usar as Skills com Copilot

### Ativação Automática

As skills são ativadas automaticamente quando você:

- Está editando arquivos em `e2e/`
- Editando `playwright.config.ts`
- Citando "e2e" ou "testing" nas suas queries

### Ativação Manual

Mencione a skill explicitamente:

```
"Using the e2e-testing skill, create tests for..."
"According to the e2e-testing guide, how do I..."
"Show me the e2e-testing best practices for..."
```

### Padrões Recomendados

1. **Criar novo teste:**
   - "Create a new spec file for the contact form using Page Object Model"
   - Copilot usará a skill para seguir os padrões estabelecidos

2. **Debugar teste flaky:**
   - "This test is flaky, help me fix it"
   - "Show me how to add proper waits instead of timeouts"

3. **Implementar feature:**
   - "Add tests for the new theme toggle feature"
   - "Generate tests for accessibility compliance"

4. **CI/CD:**
   - "Setup GitHub Actions for e2e tests"
   - "How to configure Playwright for CI?"

---

## 🔄 Workflow Recomendado

### 1. Antes de Criar Testes

```bash
npm run e2e:ui          # Ver testes existentes
npm run e2e:report      # Verificar cobertura
```

### 2. Criar Novo Teste

- Mencionar o que quer testar
- Deixar o Copilot sugerir usando a skill
- Usar POM pattern das sugestões
- Rodar e verificar resultado

### 3. Manter Testes

```bash
npm run e2e             # Rodar todos
npm run e2e:debug       # Debugar
npm run e2e:report      # Ver resultados
```

---

## 📋 Checklist de Boas Práticas

- [ ] Use Page Object Model para página/componente
- [ ] Crie fixtures para injetar dependências
- [ ] Use _proper waits_ em vez de timeouts
- [ ] Escreva assertions significativas
- [ ] Organize testes com `describe` blocks
- [ ] Use before/after hooks para setup
- [ ] Configure CI/CD pipeline
- [ ] Monitore flakiness dos testes
- [ ] Atualize seletores quando DOM muda
- [ ] Mantenha test data organizado

---

## 🔗 Links Rápidos

| Recurso           | Localização                                          |
| ----------------- | ---------------------------------------------------- |
| Guia Completo     | [E2E-TESTING.md](../../E2E-TESTING.md)               |
| Padrões Avançados | [SKILL.md](../../SKILL.md)                           |
| Instruções Base   | [.instructions.md](../../.instructions.md)           |
| Config Playwright | [playwright.config.ts](../../playwright.config.ts)   |
| Testes Exemplo    | [e2e/portfolio.spec.ts](../../e2e/portfolio.spec.ts) |

---

## 💡 Exemplos Rápidos

### Teste Simples

```typescript
import { test, expect } from '../fixtures/portfolio.fixture';

test('should navigate to home', async ({ portfolioPage }) => {
  await portfolioPage.navigateToHome();
  expect(await portfolioPage.isHeaderVisible()).toBe(true);
});
```

### Page Object

```typescript
export class MyPage extends BasePage {
  readonly mySelector = 'app-my-component';

  async myAction() {
    await this.click(this.mySelector);
  }
}
```

### Fixture

```typescript
export const test = base.extend<MyFixtures>({
  myPage: async ({ page }, use) => {
    const myPage = new MyPage(page);
    await use(myPage);
  },
});
```

---

## 🚀 Próximos Passos

1. Explore os arquivos de teste em `e2e/`
2. Rode `npm run e2e:ui` para ver testes rodando
3. Pergunte ao Copilot sobre padrões usando a skill
4. Crie novos testes seguindo os exemplos
5. Mantenha a documentação atualizada

---

## 📞 Suporte

Para dúvidas sobre:

- **E2E Testing:** Consulte `e2e-testing.md` (esta skill)
- **Exemplos Práticos:** Veja `E2E-TESTING.md`
- **Padrões Avançados:** Leia `SKILL.md`
- **Arquitetura:** Confira `.instructions.md`

---

**Última atualização:** Março 2026
**Versão Playwright:** 1.58.2
**Status:** ✅ Produção
