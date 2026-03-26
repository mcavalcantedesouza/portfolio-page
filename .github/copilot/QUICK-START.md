# ⚡ Copilot Skills - Quick Start Guide

## 🎯 Where Are the Skills?

Skills are located in this directory: **`.github/copilot/`**

```
.github/copilot/             ← Skills Location
├── QUICK-START.md           ← You are here
├── README.md                ← Skills documentation
├── index.md                 ← Index of all skills
└── e2e-testing.md           ⭐ MAIN SKILL: E2E Testing
```

---

## 🚀 How to Use Copilot Skills

### 1. **Automatic Activation**
Open a file that matches a skill's pattern, and Copilot automatically offers it:

```typescript
// Editing: e2e/portfolio.spec.ts
// Copilot automatically detects E2E testing context
// and offers the e2e-testing skill
```

### 2. **Manual Activation**
Press **Ctrl+I** (or **Cmd+I**) and mention the skill:

```
"Using the e2e-testing skill, create tests for the hero section"
"Show me e2e-testing best practices for handling flaky tests"
```

### 3. **Browse Available Skills**
- **Command Palette** → "Copilot: View Skills"
- Or see [`index.md`](./index.md)

---

## 📋 Current Skills

### 🎭 E2E Testing with Playwright
**File:** [`e2e-testing.md`](./e2e-testing.md)

**Active when editing:**
- `e2e/**/*.ts`
- `playwright.config.ts`
- Mentions of "e2e", "testing", "playwright"

**Includes:**
- Page Object Model (POM)
- Fixtures & Dependency Injection
- Best Practices & Anti-patterns
- Debugging Techniques
- CI/CD Integration
- Network Mocking & API Testing

**Quick Help:**
```
"Help me create tests for the projects section using POM"
"How do I debug a flaky test?"
"Show me examples of proper waits in Playwright"
```

---

## 🔍 Skill Metadata

Each skill file has YAML frontmatter with metadata:

```yaml
---
name: e2e-testing              # Skill identifier
description: Long description   # What it's for
applyTo: ^e2e/.*\.ts$          # Triggers this skill
keywords:                       # Search keywords
  - e2e
  - testing
  - playwright
---
```

---

## 📚 Documentation Structure

| File | Purpose | Read When |
|------|---------|-----------|
| **QUICK-START.md** | This guide | First time |
| **README.md** | Skills overview | Need context |
| **index.md** | Index & examples | Looking for patterns |
| **e2e-testing.md** | Full E2E skill | Creating/fixing tests |
| [**E2E-TESTING.md**](../../E2E-TESTING.md) | Detailed guide | Need detailed help |
| [**.instructions.md**](../../.instructions.md) | Project instructions | General project info |

---

## 💡 Common Scenarios

### Creating a New E2E Test

1. Create file: `e2e/my-feature.spec.ts`
2. Press **Ctrl+I**
3. Ask: `"Create a test suite for the contact form using the e2e-testing skill"`
4. Copilot uses the skill and generates code

### Debugging Flaky Test

1. Open test file: `e2e/flaky.spec.ts`
2. Press **Ctrl+I**
3. Ask: `"This test flakes occasionally. Per e2e-testing best practices, how do I fix it?"`
4. Copilot references the skill patterns

### Implementing CI/CD

1. Create: `.github/workflows/e2e.yml`
2. Press **Ctrl+I**
3. Ask: `"Generate GitHub Actions for E2E tests using e2e-testing patterns"`
4. Copilot integrates the skill guidance

---

## 🎓 Best Practices

The **e2e-testing skill** emphasizes:

✅ **Page Object Model** - Decouple locators from test logic  
✅ **Fixtures** - Reusable test setup/teardown  
✅ **Proper Waits** - Use `waitForLoadState`, not timeouts  
✅ **Meaningful Assertions** - Use specific matchers  
✅ **Test Organization** - Group with `describe` blocks  
✅ **Error Handling** - Proper debugging techniques  
✅ **CI/CD Ready** - Works in pipelines  

---

## 🛠️ Running Tests

```bash
# Full suite
npm run e2e

# Interactive UI
npm run e2e:ui

# Debug mode
npm run e2e:debug

# View results
npm run e2e:report

# Specific browser
npm run e2e:chromium
```

---

## 🤔 FAQ

**Q: How does Copilot find these skills?**  
A: GitHub Copilot searches `.github/copilot/` directory for `.md` files with YAML frontmatter.

**Q: Can I add my own skills?**  
A: Yes! Create a `.md` file in this directory with YAML frontmatter following the skill pattern.

**Q: Do skills work offline?**  
A: Skills are loaded locally. You need internet for Copilot suggestions, but the skill files are in your repo.

**Q: Can I share skills with my team?**  
A: Yes! Version control keeps them synced. Everyone gets the same skills.

**Q: Where can I learn more about Copilot skills?**  
A: See [GitHub Copilot Skills Docs](https://docs.github.com/en/copilot/managing-copilot/managing-skills)

---

## 📞 Quick Links

| Resource | Link |
|----------|------|
| E2E Skill | [`e2e-testing.md`](./e2e-testing.md) |
| Skills Index | [`index.md`](./index.md) |
| Project Structure | [`PROJECT_STRUCTURE.md`](../../PROJECT_STRUCTURE.md) |
| E2E Guide | [`E2E-TESTING.md`](../../E2E-TESTING.md) |
| Project Instructions | [`.instructions.md`](../../.instructions.md) |

---

## ✅ Verify Setup

```bash
# Check skills are in correct location
ls -la .github/copilot/

# Should show:
# e2e-testing.md          ✅
# index.md                ✅
# README.md               ✅
# QUICK-START.md          ✅
```

---

**Status:** ✅ Copilot Skills Configured and Ready  
**Last Updated:** March 25, 2026  
**Playwright Version:** 1.58.2
