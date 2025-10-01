import { test, expect } from "@playwright/test";
import { PageManager } from "../page-object/pageManager";


test.beforeEach(async ({ page }) => {
await page.goto("http://localhost:4200/");

})

test('navigation to from page', async ({page}) => {
const pm = new PageManager (page)    
await pm.navigateTo().formLayoutPage()
await pm.navigateTo().datePickerPage()
await pm.navigateTo().smartTablePage()
await pm.navigateTo().toastrPage()
await pm.navigateTo().tooltipPage()

})

test('parameterized methods', async ({page})=> {
const pm = new PageManager (page)
await pm.navigateTo().formLayoutPage();
await pm.onFormLayoutPage().submitUsingTheGridFormwithCredentialAndSelectOption('test@test.com','Welcome', 'Option 2')
await pm.onFormLayoutPage().sumbitInlineFormWithNameEmailAndCheckbox('John Smith', 'Johnsmith@test.com', true)
await pm.navigateTo().datePickerPage()
await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(10);
await pm.onDatePickerPage().selectDatepickerWithRangeFromToday(5,15)
   
})


