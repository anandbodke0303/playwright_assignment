import { test, expect } from "@playwright/test";
import { logStep } from "./helpers.js";

test("Repository page loads and displays", async ({ page }) => {
    const OwnerName = "microsoft";
    const RepoName = "vscode";

    logStep("Navigate to VSCode repo page");
    await page.goto("https://github.com/microsoft/vscode");

    logStep("Verify repo owner and name");
    await expect(page.locator('#repository-container-header').getByRole('link', { name: 'microsoft' })).toHaveText(OwnerName);
    await expect(page.getByRole('link', { name: 'vscode', exact: true })).toHaveText(RepoName);

    logStep("Verify star count visible and > 100k");
    const starscount = await (page.locator('#repo-stars-counter-star')).innerText();
    const normalized = starscount.trim().toUpperCase();
    let numeric = 0;
    if (normalized.endsWith('K')) {
        numeric = parseFloat(normalized.replace('K', '')) * 1000;
    }
    expect(numeric).toBeGreaterThan(100000);

    logStep("Verify fork count visible");
    await expect(page.locator('#repo-network-counter')).toBeVisible();

    logStep("Verify README content is rendered");
    await page.locator(".markdown-body.entry-content.container-lg").scrollIntoViewIfNeeded();
    await expect(page.locator(".markdown-body.entry-content.container-lg")).toBeVisible();
});

test("Code navigation", async ({ page }) => {

    logStep("Navigate to VSCode repo page");
    await page.goto("https://github.com/microsoft/vscode");

    logStep("Click on src folder");
    const srcFolder = page.locator("td[class='react-directory-row-name-cell-large-screen'] a[title='src']");
    await srcFolder.scrollIntoViewIfNeeded();
    await expect(srcFolder).toBeVisible();
    await srcFolder.click();

    logStep("verify URL changes");
    await expect(page).toHaveURL("https://github.com/microsoft/vscode/tree/main/src");

    logStep("Verify breadcrumb shows src");
    const breadcrumb = page.locator('#file-name-id-wide');
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb).toHaveText("src");

    logStep("Navigate a .ts file (main.ts)");
    const tsFile = page.locator("td[class='react-directory-row-name-cell-large-screen'] a[title='main.ts']");
    await tsFile.scrollIntoViewIfNeeded();
    await expect(tsFile).toBeVisible();
    await tsFile.click();

    logStep("Verify syntax highlighting is present");
    const coloreClasses = ['.pl-k, .pl-s, .pl-c, .pl-kos, .pl-c1, .pl-s1'];
    await page.waitForTimeout(5000);
    for (const syntaxHighlighting of coloreClasses) {
        expect(await page.locator(syntaxHighlighting).count()).toBeGreaterThan(0);
    }
});

test("Repository stats and metadata", async ({ page }) => {
    const ExpectedDescription = "Visual Studio Code";
    const LicenseTextStartWith = "MIT License";
    const LicenseTextEndWith = "OTHER DEALINGS IN THE\nSOFTWARE.";

    logStep("Navigate to VSCode repo page");
    await page.goto("https://github.com/microsoft/vscode");

    logStep("Verify About section has description");
    await expect(page.locator(".f4.my-3")).toBeVisible();
    const ActualdescriptionText = (await page.locator(".f4.my-3").innerText()).trim();
    expect(ActualdescriptionText).toBe(ExpectedDescription);

    logStep("Verify license information is displayed");
    const licenseButton = page.locator('.Link--muted[href="#MIT-1-ov-file"]');
    await expect(licenseButton).toBeVisible();
    await licenseButton.click();

    const LicenseInfo = page.locator('.plain >pre');
    await expect(LicenseInfo).toBeVisible();
    const ActualLicenseText = await LicenseInfo.innerText();

    expect(ActualLicenseText.startsWith(LicenseTextStartWith)).toBeTruthy();
    expect(ActualLicenseText.trim().endsWith(LicenseTextEndWith)).toBeTruthy();

    logStep("Verify topics/tags are visible");
    const expectedTopics = ["electron", "microsoft", "editor", "typescript", "visual-studio-code"];
    const topics = page.locator('div.f6 > a');
    const actualTopicsText = await topics.allInnerTexts();
    for (const topic of expectedTopics) {
        expect(actualTopicsText).toContain(topic);
    }
});