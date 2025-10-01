import { test, expect } from '@playwright/test';
import { first } from "rxjs-compat/operator/first";

test.beforeEach(async ({page}) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});


// test('Reusing the locators', async ({ page }) => {
//   const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
//   const emailField = basicForm.getByRole("textbox", { name: "Email" });

//   await emailField.fill("test@test.com");
//   await basicForm.getByRole("textbox", { name: "Password" }).fill("Welcome123");
//   await basicForm.locator("nb-checkbox").click();
//   await basicForm.locator("button").click();
//   //Assertion
//   await expect(emailField).toHaveValue("test@test.com");
// });

test('Reusing the locators', async ({page}) => {
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
  const emailField = basicForm.getByRole("textbox", { name: "Email" });

  await emailField.fill("test@test.com");
  await basicForm.getByRole("textbox", { name: "Password" }).fill("Welcome123");
  await basicForm.locator("nb-checkbox").click();
  await basicForm.locator("button").click();

  // Assertion
  await expect(emailField).toHaveValue("test@test.com");
});


