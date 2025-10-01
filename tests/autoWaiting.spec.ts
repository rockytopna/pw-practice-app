import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://uitestingplayground.com/ajax");
  await page.getByText("Button Triggering AJAX Request").click();
  // testInfo.setTimeout(testInfo.timeout + 2000)// which will allow two extra second for each test.

});

test("auto waiting", async ({ page }) => {
  const successButton = page.locator(".bg-success");
  /**using auto wait */
  await successButton.click();

  /**using text content */
  //   const text = await successButton.textContent();

  // expect(text).toEqual("Data loaded with AJAX get request.");

  /**using all content */
  //   await successButton.waitFor({ state: "attached" });
  //   const text = await successButton.allTextContents();
  //   expect(text).toContain("Data loaded with AJAX get request.");

  /** we just use expected wait which is by default 5sec or 5000ms the test case will fail*/
  // await expect(successButton).toHaveText('Data loaded with AJAX get request.')

  /** we added additionl wait timeout 20000ms
   * which is same as 20sec the test will pass*/
  // await expect(successButton).toHaveText("Data loaded with AJAX get request.", {timeout: 20000,});
  await expect(successButton).toHaveText("Data loaded with AJAX get request.");
});

//showing another wait which doesn't have allTextContents

test.skip("alternative waits", async ({ page }) => {
  const successButton = page.locator(".bg-success");
  // _wait for elements
  await page.waitForSelector(".bg-success");

  // _Wait for particular respons from API
  // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

  // _ wait for network calls to be completed **NOT RECOMMENDED**
  await page.waitForLoadState("networkidle");

  //_wait page

  const text = await successButton.allTextContents();
  expect(text).toContain("Data loaded with AJAX get request.");
});

test.skip('timeout', async ({page}) => {
  //**test.slow allow for flaky test to execute slowly. So if your 
  // timeout is 10000(10s) it will multiply the test 10s*3=30s  */
  test.slow()
  const successButton = page.locator(".bg-success");
  // _wait for elements
  await successButton.click();
  
})

  


  
