# Playwright Assignment - Automated Testing Project

A comprehensive test automation project using **Playwright** for testing GitHub repositories, APIs, and search functionality.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Installation & Setup](#installation--setup)
4. [Project Structure](#project-structure)
5. [Configuration](#configuration)
6. [Running Tests](#running-tests)
7. [Test Files Explanation](#test-files-explanation)
8. [Logging](#logging)
9. [Reports](#reports)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

This project automates testing for:
- **UI Tests**: Repository page UI validation, search functionality
- **API Tests**: GitHub API endpoint validation

**Tools Used:**
- **Playwright**: End-to-end testing framework
- **Winston**: Logging library for test logs
- **Node.js**: Runtime environment

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (for version control)
- **VS Code** (recommended) with Playwright Test extension

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd playwright_assignment
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs:
- `@playwright/test` - Playwright testing framework
- `winston` - Logging library
- `@types/node` - TypeScript types for Node.js

### Step 3: Install Playwright Browsers
```bash
npx playwright install
```

This installs browser binaries (Chromium, Firefox, WebKit).

---

## 📁 Project Structure

```
playwright_assignment/
├── tests/
│   ├── test_repository_ui.spec.js       # UI tests for GitHub repository
│   ├── repository_api.spec.js           # API tests for GitHub endpoints
│   ├── search.spec.js                   # Search functionality tests
│   ├── helpers.js                       # Logging utilities
│   └── logs/
│       └── tests.log                    # Test execution logs
├── playwright.config.js                 # Playwright configuration
├── package.json                         # Project dependencies
├── README.md                            # This file
├── test-report/                         # HTML test reports
└── test-results/                        # Test result data

```

---

## ⚙️ Configuration

### `playwright.config.js`

Key configuration settings:

```javascript
{
  timeout: 60000,                 // Test timeout (60 seconds)
  workers: 1,                     // Run 1 test at a time (sequential)
  testDir: './tests',             // Location of test files
  headless: false,                // Show browser window (headed mode)
  slowMo: 5000,                   // Slow down actions by 5 seconds
  viewport: {                     // Browser window size
    width: 1400,
    height: 900
  },
  video: 'retain-on-failure',     // Record video only if test fails
  trace: 'retain-on-failure'      // Record trace only if test fails
}
```

### Browser Configurations

**UI Tests** (chromium, firefox, webkit):
- Run on all 3 browsers for cross-browser compatibility
- Files: `test_repository_ui.spec.js`, `search.spec.js`

**API Tests** (chromium only):
- Run only on chromium (browser not needed for API testing)
- File: `repository_api.spec.js`

---

## 🧪 Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Tests in Headed Mode (with browser visible)
```bash
npx playwright test --headed
```

### Run Specific Test File
```bash
npx playwright test repository_api.spec.js
```

### Run Tests for Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run Single Test with Specific Browser
```bash
npx playwright test test_repository_ui.spec.js --headed --project=chromium
```

### List All Available Tests
```bash
npx playwright test --list
```

### Run Tests in Debug Mode
```bash
npx playwright test --debug
```

### Run Tests in UI Mode (Interactive)
```bash
npx playwright test --ui
```

---

## 📝 Test Files Explanation

### 1. `test_repository_ui.spec.js` - Repository UI Tests

**Purpose:** Validates the GitHub VSCode repository page UI elements

**Test Case:** "Repository page loads and displays"
- ✅ Navigates to https://github.com/microsoft/vscode
- ✅ Verifies repository owner name ("microsoft")
- ✅ Verifies repository name ("vscode")
- ✅ Verifies star count is greater than 100k
- ✅ Verifies fork count is visible
- ✅ Verifies README content is rendered

**Run Command:**
```bash
npx playwright test test_repository_ui.spec.js
```

---

### 2. `repository_api.spec.js` - API Tests

**Purpose:** Tests GitHub API endpoints

**Tests:**
- Repository data retrieval
- User information
- API response validation
- Status codes verification

**Run Command:**
```bash
npx playwright test repository_api.spec.js
```

---

### 3. `search.spec.js` - Search Functionality Tests

**Purpose:** Tests GitHub search functionality

**Tests:**
- Search by repository name
- Search result display
- Filter and sorting

**Run Command:**
```bash
npx playwright test search.spec.js
```

---

## 📊 Logging

### Logger Setup (`helpers.js`)

Tests use **Winston logger** to record execution details:

```javascript
import { logStep } from "./helpers.js";

// In your test:
logStep("Navigate to VSCode repo page");
```

### Log Output

**Console Output:**
```
2026-01-18T10:30:45.123Z - info: Navigate to VSCode repo page
2026-01-18T10:30:46.456Z - info: Verify repo owner and name
```

**File Output:** `tests/logs/tests.log`

---

## 📈 Test Reports

### Generate HTML Report
```bash
npx playwright test
```

Reports are generated in:
- **Default:** `test-report/index.html`
- **Custom:** Configure in `playwright.config.js`

### View Report
```bash
npx playwright show-report
```

---

## ❓ Troubleshooting

### Problem: Tests Not Found

**Solution:** Ensure test files have correct naming:
- ✅ `*.spec.js` 
- ✅ `*.test.js`
- ✅ `test.*.js`

❌ Incorrect: `test_file.js`

### Problem: Tests Running on Headless Mode Unexpectedly

**Solution:** Check `playwright.config.js`:
```javascript
use: {
  headless: false,  // Set to false for headed mode
}
```

### Problem: Logs Not Being Written

**Solution:** Verify log path in `helpers.js`:
```javascript
new winston.transports.File({ filename: "tests/logs/tests.log" })
```

Ensure `tests/logs/` directory exists.

### Problem: Browser Takes Too Long to Load

**Solution:** Increase timeout in config:
```javascript
timeout: 90000  // 90 seconds
```

### Problem: Tests Failing Due to Selectors

**Solution:** 
1. Update selectors to match current GitHub UI
2. Use `--debug` mode to inspect elements:
```bash
npx playwright test --debug
```

---

## 🔄 Git Workflow

### Commit Changes
```bash
git add .
git commit -m "Your commit message"
```

### Push Changes
```bash
git push origin main
```

### Pull Latest Changes
```bash
git pull origin main
```

---

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright API Reference](https://playwright.dev/docs/api/class-test)
- [Winston Logger Docs](https://github.com/winstonjs/winston)
- [GitHub API Docs](https://docs.github.com/en/rest)

---

## 🤝 Contributing

1. Create a new branch for your feature
2. Write tests for new functionality
3. Run all tests to ensure nothing breaks
4. Commit with descriptive messages
5. Push and create a pull request

---

## 📄 License

ISC

---

## 👤 Author

Anand Bodkhe (QA Automation)

---

## 🎓 Quick Tips

- **Use `--headed` flag** when debugging tests
- **Use `--debug` mode** to step through test execution
- **Keep selectors updated** as GitHub UI may change
- **Run tests regularly** to catch issues early
- **Check logs** in `tests/logs/tests.log` for execution details
- **Review HTML reports** for detailed test results

---

**Last Updated:** January 18, 2026

