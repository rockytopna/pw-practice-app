import { expect, test } from "@playwright/test";
import { first } from "rxjs-compat/operator/first";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test('Locator syntax rules', async ({ page }) => {
  //By Tag Name
  await page.locator("input").first().click();

  //By ID
  page.locator("#inputEmail1");

  //By Class value
  page.locator(".shape-rectangle");

  //By attribute
  page.locator('[placeholder="Email"]');

  //By Class full value
  page.locator(
    '[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]'
  );

  //By combine different selectors (Added Tad name and attribute together)
  page.locator('input[placeholder="Email"][nbinput]');

  //By locator (NOT RECOMENDED)
  page.locator('//*[@id="inputEmail1"]');

  //By partial text match
  page.locator('text("Using")');

  //By exact text match
  page.locator(':text-is("Using the Grid")');
});

test.skip("Using faceing Locators", async ({ page }) => {
  //Get by role we use to interact with web elements
  await page.getByRole("textbox", { name: "Email" }).first().click();
  await page.getByRole("button", { name: "Sign in" }).first().click();

  //Get by Label
  await page.getByLabel("Email").first().click();

  //Get by placeholder
  await page.getByPlaceholder("Jane Doe").click();

  //Get by Text any static Text
  page.getByText("Email");

  //Get by Title- Its also HTLM attribute
  //   await page.getByTitle("IoT Dashboard").click();

  //Get by TestID- its
  await page.getByTestId("SignIn").click();

  //
});

test("Using Child Elements", async ({ page }) => {
  //Finding child elements for redio button
  //First find nb-card
  await page.locator('nb-card nb-radio :text-is("Option 1")').click();

  //Finding child elements is also Chaining the locators one by one
  await page.locator("nb-card").locator("nb-radio").locator(':text-is("Option 2")').click();

  //**Remember Always try to find more unique elements without using index or the order of the web elements and how 
  // to find more unique elements using apparent locators. */
  
  //Combination of the regular locator methods and user facing locator 
  await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click();

  await page.locator('nb-card').nth(3).getByRole('button').click()


});

test('locating parents elements', async({page}) =>{
  //1st Approach
await page.locator('nb-card', {hasText:"Using the Grid"}).getByRole("textbox", { name: "Email" }).click();
// Prodiving second attribute but NOT text as loactor
await page.locator('nb-card',{has: page.locator('#inputEmail1')}).getByRole("textbox", { name: "Email" }).click();

//Use dedicated method filter it is an independent menthods for playwright 
/**So you may wonder what is the difference if locator has an option to filter the result?
Why do we need to use a filter method?
Two reasons.
The reason Number one is if you want to use a user facing locator such as getting by role get by role
does not have a filter like that.
So you can chain an independent method filter to filter the result and to find the parent element that
you want.
And the second reason that you can actually chain a multiple filters one by one in order to filter your
result output. */

// So you may wonder what is the difference if locator has an option to filter the result?
// Why do we need to use a filter method?
// Two reasons.
// The reason Number one is if you want to use a user facing locator such as getting by role get by role
// does not have a filter like that.
// So you can chain an independent method filter to filter the result and to find the parent element that
// you want.
// And the second reason that you can actually chain a multiple filters one by one in order to filter your
// result output.

await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole("textbox", {name: "Email"}).click()
await page.locator('nb-card').filter({has:page.locator('.status-danger')}).getByRole("textbox", {name: "Password"}).click()

//Using multiple filter to find the loactor
await page.locator('nb-card').filter({has:page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole("textbox", {name: "Email"}).click()

//Using Xpath for Filter locator
await page.locator(':text-is("Using the Grid")').locator('..').getByRole("textbox", {name: "Email"}).click()

})

test("Reusing the locators", async ({ page }) => {
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
  const emailField = basicForm.getByRole("textbox", { name: "Email" });

  await emailField.fill("test@test.com");
  await basicForm.getByRole("textbox", { name: "Password" }).fill("Welcome123");
  await basicForm.locator("nb-checkbox").click();
  await basicForm.locator("button").click();

  //Assertion
  await expect(emailField).toHaveValue("test@test.com");
});




