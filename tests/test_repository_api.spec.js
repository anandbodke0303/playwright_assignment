import { test, expect } from "@playwright/test";
import { logStep } from "./helpers.js";

const getHeaders = () => {
    const headers = { "User-Agent": "playwright-tests" };
    if (process.env.GITHUB_TOKEN)
        headers["Authorization"] = "token ${process.env.GITHUB_TOKEN}";
    return headers;
};

test("Verify the endpoint: GET /repos/facebook/react", async ({ request }) => {
    const response = await request.get("https://api.github.com/repos/facebook/react", {
        headers: getHeaders()
    });
    logStep("Verify status code is 200");
    expect(response.status()).toBe(200);

    logStep("Verify Response contains name: 'react', owner.login: 'facebook'");
    const data = await response.json();
    expect(data.name).toBe("react");
    expect(data.owner.login).toBe("facebook");

    logStep("Verify stargazers_count > 100000 and private is false");
    expect(data.stargazers_count).toBeGreaterThan(100000);
    expect(data.private).toBe(false);
});

test("Verify the end point: GET /repos/facebook/react/contents returns list", async ({ request }) => {
    const response = await request.get("https://api.github.com/repos/facebook/react/contents", {
        headers: getHeaders()
    });
    logStep("Verify status code is 200");
    expect(response.status()).toBe(200);

    logStep("Verify response is an array containing README.md and package.json");
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    const names = data.map(f => f.name);
    expect(names).toContain("README.md");
    expect(names).toContain("package.json");
});

test("Verify the endpoint: GET nonexistent repo returns 404", async ({ request }) => {
    const response = await request.get("https://api.github.com/repos/microsoft/nonexistent-repo-12345", {
        headers: getHeaders()
    });
    logStep("Verify status code is 404");
    expect(response.status()).toBe(404);

    logStep("Verify error message contains 'Not Found'");
    const data = await response.json();
    expect(data.message).toContain("Not Found");
});

test("Verify Rate limit headers exist", async ({ request }) => {
    const response = await request.get("https://api.github.com/repos/facebook/react", {
        headers: getHeaders()
    });
    logStep("Verify status code is 200 and rate limit headers exist");
    expect(response.status()).toBe(200);
    const headers = response.headers();
    expect(headers["x-ratelimit-limit"]).toBeDefined();
    expect(headers["x-ratelimit-remaining"]).toBeDefined();
});
