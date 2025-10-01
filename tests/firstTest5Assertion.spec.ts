// /*There are two types of assertion
// 1. General Assertions
// 2. Locator Assertions
// */

import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("assertions", async ({ page }) => {
  //General assertion
  const value = 5;
  expect(value).toEqual(5);

  const basicFormButton = page
    .locator("nb-card")
    .filter({ hasText: "Basic form" })
    .locator("button");
  const text = await basicFormButton.textContent();
  expect(text).toEqual("Submit");

  //Locator Assertion
  await expect(basicFormButton).toHaveText("Submit");

  //Soft Assertion is not a good practice but this is an example
  await expect(basicFormButton).toHaveText("Submit");
  await basicFormButton.click();
});
