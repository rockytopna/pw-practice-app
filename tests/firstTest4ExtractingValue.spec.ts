//How to extract value from Dom 

import {test, expect } from "@playwright/test";


test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test('extracting values', async({ page })=>{
  //single test value
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
  const buttonText = await basicForm.locator('button').textContent()
  expect(buttonText).toEqual('Submit');

  //all text value
  const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
  expect(allRadioButtonsLabels).toContain('Option 1');

  //input value (hidden values)
  const emailField = basicForm.getByRole('textbox', {name:"Email"})
  await emailField.fill('test@test.com')
  const emailValue = await emailField.inputValue()
  expect(emailValue).toEqual('test@test.com');

  //find the attribute
  const placeHolderValue = await emailField.getAttribute('placeholder')
  expect(placeHolderValue).toEqual('Email')

});

test('assertions', async({page})=>{
  //General Assertion
  const value = 5
  expect(value).toEqual(5)

})
