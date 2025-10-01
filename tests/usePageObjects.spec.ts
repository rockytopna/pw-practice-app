import { test, expect } from "@playwright/test";
import { PageManager } from "../page-object/pageManager";
import {faker} from "@faker-js/faker"


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
//Using faker lib. to generate test data (name, pass, email etc)
const randomFullName = faker.person.fullName()
//added JS library to replace the space 
const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@test.com`

await pm.navigateTo().formLayoutPage();
await pm.onFormLayoutPage().submitUsingTheGridFormwithCredentialAndSelectOption('test@test.com','Welcome', 'Option 2')
//Here we added the faker random fullname, email 
await pm.onFormLayoutPage().sumbitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
await pm.navigateTo().datePickerPage()
await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(10);
await pm.onDatePickerPage().selectDatepickerWithRangeFromToday(5,15)
   
})


