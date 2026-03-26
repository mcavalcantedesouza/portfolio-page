# 📁 Portfolio Page - Complete Project Structure

## 🎯 Copilot Skills (CORRECT LOCATION)

```
.github/copilot/                    ← SKILLS GO HERE
├── README.md                        # Skills documentation
├── index.md                         # Index of available skills
└── e2e-testing.md                  # ⭐ E2E Testing Skill (Main)
```

**How Copilot finds skills:**
- GitHub Copilot looks in `.github/copilot/` for skill files
- Skills should be named `*.md` with YAML frontmatter
- They're automatically activated based on file patterns and keywords

---

## 📋 Documentation Files

```
Root Directory
├── .instructions.md                # Main project instructions
├── E2E-TESTING.md                  # Detailed E2E testing guide
├── playwright.config.ts             # Playwright configuration
└── .github/copilot/                 # ⭐ COPILOT SKILLS (THIS LOCATION)
    ├── README.md                   # Skills overview
    ├── index.md                    # Skills index & quick ref
    └── e2e-testing.md              # ⭐ Main E2E skill
```

---

## 🧪 E2E Testing Structure

```
e2e/
├── pages/                          # Page Objects (POM pattern)
│   ├── base.page.ts                # Base class with common methods
│   ├── portfolio.page.ts           # Portfolio-specific page object
│   └── index.ts                    # Exports
├── fixtures/                        # Test fixtures
│   ├── portfolio.fixture.ts         # Portfolio fixture
│   └── index.ts                    # Exports
├── steps/                          # BDD steps (optional)
├── portfolio.spec.ts               # Main test suite
├── portfolio-advanced.spec.ts       # Advanced tests
└── [other-feature].spec.ts          # Feature-specific tests

playwright.config.ts                # Configuration (root)
test-results/                       # Generated reports
```

---

## 🏗️ Application Code

```
src/
├── app/
│   ├── components/                 # Reusable components
│   │   ├── about/
│   │   ├── contact/
│   │   ├── footer/
│   │   ├── header/
│   │   ├── hero/
│   │   ├── icon/
│   │   ├── language-selector/
│   │   ├── project-card/
│   │   ├── projects/
│   │   ├── skill-card/
│   │   ├── skills/
│   │   └── theme-toggle/
│   ├── pages/                      # Page components
│   │   └── portfolio-page/
│   ├── services/                   # Business logic
│   │   ├── github.service.ts
│   │   ├── icon.service.ts
│   │   ├── image-optimizer.service.ts
│   │   ├── language.service.ts
│   │   ├── portfolio.service.ts
│   │   ├── theme-builder.service.ts
│   │   └── theme.service.ts
│   ├── models/                     # TypeScript types
│   │   └── portfolio.types.ts
│   ├── config/                     # Configuration
│   │   └── github.config.ts
│   ├── utils/                      # Helper functions
│   │   └── class-builder.ts
│   ├── app.routes.ts               # Routing
│   ├── app.config.ts               # App config
│   ├── app.ts                      # Root component
│   ├── app.html                    # Root template
│   ├── app.css                     # Component styles
│   └── app.spec.ts                 # Component tests
├── styles.css                      # Global styles
├── main.ts                         # Entry point
└── index.html                      # HTML template
```

---

## ⚙️ Configuration Files

```
Root
├── angular.json                    # Angular CLI config
├── playwright.config.ts            # Playwright config ⭐
├── tsconfig.json                   # TypeScript config
├── tsconfig.app.json               # App TS config
├── tsconfig.spec.json              # Spec TS config
├── tailwind.config.ts              # Tailwind config
├── package.json                    # Dependencies
├── mise.toml                       # Task runner config
└── .gitignore                      # Git ignore rules
```

---

## 📦 VS Code Configuration

```
.vscode/
├── settings.json                   # Editor settings
├── extensions.json                 # Recommended extensions
└── mcp.json                        # MCP servers (Playwright, etc.)
```

---

## 🌐 GitHub Actions

```
.github/
├── workflows/
│   └── deploy.yml                  # Deployment workflow
└── copilot/                        # ⭐ SKILLS HERE
    ├── README.md
    ├── index.md
    └── e2e-testing.md              # Main skill
```

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| `.instructions.md` | Main project instructions |
| `E2E-TESTING.md` | Complete E2E testing guide |
| `SECURITY.md` | Security policy |
| `README.md` | Project overview |
| `.github/copilot/README.md` | Skills documentation |
| `.github/copilot/index.md` | Skills index |

---

## 🚀 To Use Copilot Skills

1. **Open VS Code** in this project
2. **Copilot automatically finds skills** in `.github/copilot/`
3. **When editing E2E tests**, Copilot offers the E2E skill
4. **Ask Copilot about E2E patterns** - it uses the skill
5. **View Copilot Skills** - Command Palette > "Copilot: View Skills"

---

## 🎯 Key Locations

| What | Where |
|------|-------|
| **E2E Skill** | `.github/copilot/e2e-testing.md` |
| **Skills Index** | `.github/copilot/index.md` |
| **Instructions** | `.instructions.md` |
| **E2E Guide** | `E2E-TESTING.md` |
| **Tests** | `e2e/*.spec.ts` |
| **Page Objects** | `e2e/pages/*.ts` |
| **Fixtures** | `e2e/fixtures/*.ts` |

---

## ✅ Quick Verification

```bash
# Check skills are in correct location
ls -la .github/copilot/
# Output:
# -rw-r--r-- README.md
# -rw-r--r-- e2e-testing.md
# -rw-r--r-- index.md

# Verify E2E setup
npm run e2e:report      # Run tests and view report
```

---

**Last Updated:** March 25, 2026
**Playwright Version:** 1.58.2
**Status:** ✅ Ready for Production
