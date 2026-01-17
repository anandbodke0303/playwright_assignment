import { test, expect } from "@playwright/test";
import { logStep } from "./helpers.js";

test("Search for github repositories", async ({ page }) => {
    const searchValues = "vscode-explorer-command";
    logStep("Navigate to GitHub homepage");
    await page.goto("https://github.com/microsoft");
    
    logStep("Go to Repositories tab and search for repo");
    await page.getByRole("link", { name: "Repositories" }).nth(0).click();
    const filterInput = page.getByPlaceholder("Search repositories");
    await expect(filterInput).toBeVisible();
    await filterInput.fill(searchValues);
    await page.keyboard.press("Enter");

    logStep("Verify search results displayed");
    const results = page.locator('a[class="Title-module__anchor--GmXUE Title-module__inline--oM0P7"] span');
    await expect(results.first()).toContainText(searchValues);
});

test("Test non-existent repo/user shows proper 404", async ({ page }) => {
  logStep("Navigate to non-existent user");
  await page.goto("https://github.com/microsoft/repos/nonexistent-repo-12345");

  logStep("Verify 404 'page not found' message is visible");
  const image = page.locator('img[alt="404 “This is not the web page you are looking for”"]');
  await expect(image).toBeVisible();

  logStep("Verify correct text for confirmation");
  const altText = await image.getAttribute("alt");
  expect(altText).toContain("404");
});