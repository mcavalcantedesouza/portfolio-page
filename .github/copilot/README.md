# 📚 Copilot Skills Configuration

Este diretório contém as configurações de skills customizadas do GitHub Copilot para o projeto Portfolio Page.

## 📂 Estrutura

```
.github/copilot/
├── index.md              # Índice e guia de skills disponíveis
├── e2e-testing.md        # Skill de testes e2e com Playwright
├── README.md             # Este arquivo
```

## 🎯 Skills Disponíveis

### 1️⃣ E2E Testing with Playwright (`e2e-testing.md`)

**Propósito:** Criar e manter testes end-to-end com Playwright seguindo padrões da indústria.

**Inclui:**

- ✅ Page Object Model (POM) pattern
- ✅ Fixtures e dependency injection
- ✅ BDD-style test organization
- ✅ Best practices e anti-patterns
- ✅ Debugging techniques
- ✅ CI/CD integration
- ✅ Network mocking
- ✅ Accessibility testing

**Quando usar:**

```
"Show me how to create a test for the hero section using POM"
"Help me fix this flaky test"
"Generate tests for the projects component"
"How do I mock API calls in playwright?"
```

---

## 🚀 Como o Copilot Encontra as Skills

### Ativação Automática

As skills são ativadas automaticamente quando:

- ✨ Você está editando arquivos em `e2e/`
- ✨ Você edita `playwright.config.ts`
- ✨ Você menciona "e2e", "testing", ou "playwright"

### Ativação Manual

Mencione a skill explicitamente:

```
"Using the e2e-testing skill..."
"According to the e2e-testing guide..."
"Show me the e2e-testing best practices..."
```

---

## 📋 Localização das Instruções

| Tipo                      | Localização                                  | Propósito                                            |
| ------------------------- | -------------------------------------------- | ---------------------------------------------------- |
| **Instruções Principais** | [`.instructions.md`](../../.instructions.md) | Guia geral do projeto e redirecionamento para skills |
| **Index de Skills**       | [`index.md`](./index.md)                     | Listagem e overview das skills disponíveis           |
| **Skill: E2E Testing**    | [`e2e-testing.md`](./e2e-testing.md)         | Skill especializada em testes end-to-end             |
| **Guia Completo**         | [`E2E-TESTING.md`](../../E2E-TESTING.md)     | Documentação detalhada com exemplos                  |

---

## 🔄 Workflow Recomendado

### 1. Explorar Skills Disponíveis

```bash
# Ver as skills no VS Code
# Command Palette > Copilot: View Skills / Agents
```

### 2. Usar Skills ao Desenvolver Testes

```typescript
// Editing: e2e/my-feature.spec.ts
// Copilot detecta automaticamente e oferece skill de E2E testing
```

### 3. Pedir Ajuda com Skills

```
Ctrl+I (ou Cmd+I no Mac)
"Help me create tests for the skills according to e2e-testing best practices"
```

---

## 💡 Exemplos de Uso

### Criar Novo Teste

```bash
# Você está em: e2e/new-feature.spec.ts
# Diga ao Copilot:
"Generate a complete E2E test for the contact form using the e2e-testing skill"
```

### Debugar Teste Flaky

```bash
# Você está em: e2e/flaky-test.spec.ts
# Diga ao Copilot:
"This test is flaky. According to e2e-testing best practices, how should I fix it?"
```

### Implementar CI/CD

```bash
# Você está criando: .github/workflows/e2e.yml
# Diga ao Copilot:
"Use the e2e-testing skill to generate a complete GitHub Actions workflow"
```

---

## 🔗 Links Úteis

- [GitHub Copilot Skills Documentation](https://docs.github.com/en/copilot/managing-copilot/managing-copilot-business/managing-skills-in-github-copilot)
- [Portfolio Page E2E Testing Guide](../../E2E-TESTING.md)
- [Main Instructions](../../.instructions.md)

---

## 🛠️ Manutenção

### Adicionar Nova Skill

1. Crie arquivo `.md` em `.github/copilot/`
2. Adicione YAML frontmatter com metadados
3. Atualize `index.md` com a nova skill
4. Commit & Push

### Exemplo de Frontmatter

```yaml
---
name: my-skill
description: Descrição curta da skill
applyTo: ^padrão/regex/dos/arquivos$
keywords:
  - keyword1
  - keyword2
---
```

---

## 🎓 Padrão de Skill

Uma skill bem estruturada inclui:

- ✅ Descrição clara do escopo
- ✅ Padrões recomendados
- ✅ Exemplos de código
- ✅ Anti-patterns (o que evitar)
- ✅ Troubleshooting / FAQ
- ✅ Links para documentação
- ✅ Casos de uso comuns

---

## 📊 Status das Skills

| Skill       | Status      | Versão | Última Atualização |
| ----------- | ----------- | ------ | ------------------ |
| E2E Testing | ✅ Produção | 1.0    | Março 2026         |

---

## 🤝 Contribuir

Para adicionar ou melhorar skills:

1. Edite o arquivo `.md` correspondente
2. Teste com o Copilot
3. Faça commit com mensagem clara
4. Push para main branch

---

**Gerado em:** Março 2026  
**Playwright Version:** 1.58.2  
**Status:** ✅ Ativo e Pronto para Uso
