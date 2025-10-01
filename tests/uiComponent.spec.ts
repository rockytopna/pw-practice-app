import { test, expect } from "@playwright/test";
import { tooltip } from "leaflet";
import { DialogComponent } from "../src/app/pages/modal-overlays/dialog/dialog.component";
import { TooltipDirective } from "@swimlane/ngx-charts";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  
});

// test.describe("From Layout page", () => {
//   test.beforeEach(async ({ page }) => {
//     await page.getByText("Forms").click();
//     await page.getByText("Form Layouts").click();
//   });

//   test
// });


test.describe("Form Layouts page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("input fields", async ({ page }) => {
    const usingTheGridEmailInput = page.locator("nb-card", { hasText: "Using the Grid" }).getByRole("textbox", { name: "Email" });
   
    await usingTheGridEmailInput.fill("test@test.com");
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially("test2@test.com")


    //generic assertion
    const inputValue = await usingTheGridEmailInput.inputValue();
    expect(inputValue).toEqual("test2@test.com");
    // locator assertion
    await expect(usingTheGridEmailInput).toHaveValue("test2@test.com");
  });

  test("radio button fields", async ({ page }) => {
    const usingTheGridForm = page.locator("nb-card", {hasText: "Using the Grid",});

    //using getByLabel
    // await usingTheGridForm.getByLabel('Option 1').check({force:true})

    await usingTheGridForm.getByRole("radio", { name: "Option 1" }).check({ force: true });
    //Check the status of the radio button is selected or not.
    const radioStatus1 = await usingTheGridForm.getByRole("radio", { name: "Option 1" }).isChecked()

    //Assertion if it is checked then it will be toBeTruthy. If it is not checked it will be toBeFalsy
    //Genertic Assertion
    expect(radioStatus1).toBeTruthy //We are checking here that the radio button one was selected.

    //Second Assertion Locator Assertion 
    await expect(usingTheGridForm.getByRole('radio',{name:'Option 1'})).toBeChecked()

    //Validating Radio Button 2 where Radio Button 1 is not checked
    await usingTheGridForm.getByRole("radio", { name: "Option 2" }).check({ force: true });
    const radioStatus2 =  await usingTheGridForm.getByRole("radio", { name: "Option 2" }).isChecked()
    //Generic Assertion 
    expect (radioStatus1).toBeFalsy
    expect(radioStatus2).toBeTruthy
    //Locator Assertion it validating Radio Button 1 is not checked and Radio Button 2 is checked. 
    expect (await usingTheGridForm.getByRole("radio", { name: "Option 1" }).isChecked()).toBeFalsy()
    expect(await usingTheGridForm.getByRole("radio", { name: "Option 2" }).isChecked()).toBeTruthy()

  });

 test("checkbox", async ({page}) => {
 await page.getByText("Modal & Overlays").click();
 await page.getByText("Toastr").click();

//  Check and uncheck commands are checking the 
// status of the checkbox if the checkbox is checked.
 await page.getByRole("checkbox", {name: "Hide on click"}).uncheck({force:true}) 
 await page.getByRole("checkbox", {name: "Prevent arising of duplicate toast"}).check({force:true}) 

 //how to uncheck all the check box or check
 // we have to loop through it */

 const allBoxes = page.getByRole("checkbox")
 for( const box of await allBoxes.all()){
  await box.check({force: true})
  expect(await box.isChecked()).toBeTruthy()


//To uncheck have to add in line 83
  //  await box.uncheck({force: true})
  // expect(await box.isChecked()).toBeFalsy()

 }


 })


  test('list and dropdown', async ({page})=> {
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    page.getByRole('list') //When the list has a UL tag
    page.getByRole('listitem')

    //Using getByRole
    // const optionList = page.getByRole("list").locator('nb-option')

    //Another Locator very useful one
    const optionList = page.locator('nb-option-list nb-option')

    //Assertion of all the list items Text (NOTE: HOW TO VALIDATE ALL TEXT)
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])

    //Click Cosmic Text. Where we use filter
    await optionList.filter({hasText: "Cosmic"}).click()

  //Assert the cosmic color 
   const header = page.locator('nb-layout-header')
   await expect(header).toHaveCSS('background-color' , 'rgb(50, 50, 89)')

   //Assert All the color of the item using loop

  const colors = {
    "Light": "rgb(255, 255, 255)",
    "Dark": "rgb(34, 43, 69)",
    "Cosmic": "rgb(50, 50, 89)",
    "Corporate": "rgb(255, 255, 255)",
  }
    
  await dropDownMenu.click()
    for(const color in colors ){
    await optionList.filter({hasText: color}).click()
    await expect(header).toHaveCSS('background-color', colors[color])

    if(color != "Corporate")
    await dropDownMenu.click()

  }

  })

  test('tooltip', async ({page})=> {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Tooltip").click();

  const toolTipCard = page.locator('nb-card', {hasText: "Tooltip Placements"})
  await toolTipCard.getByRole('button',{name: "Top"}).hover();

  //Validate Text Content 
  const tooltip = await page.locator('nb-tooltip').textContent()
  expect(tooltip).toEqual("This is a tooltip")

  })

  test('smart table', async({page}) => {
    await page.getByText("Tables & Data").click();
    await page.getByText("Smart Table").click();

    //Broswer dialbox click to delete the row
    //Listener
    page.on('dialog', dialog => {
    expect(dialog.message()).toEqual('Are you sure you want to delete?')
    dialog.accept()

    })
  
    
    //Locator for the firs row
    const firstRow = await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash');
    await firstRow.click();
    //assertion not to have text
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
    })


/** Table tag start with table tag or sometimes with table body So, for example, let me click on Inspec and I will show you what I mean.
So table always starts with a table tag.When you open this, usually it has table head or table body, sometimes without the table head, it's
just a table, body tag.And then inside of table body, we have a table rows, which is TR tag and each TR has TDs.
TD is table down, which is table column.So if I hover over each TD, you can see that it is highlighted.
The tricky part of working with the web tables is identifying the unique enough element to pick up the
certain cell from the table or the certain row from the table and making your test table or for example,
a tricky part how to select the entire column in the table.It is pretty difficult task because we know that we have table rows and all columns are within each
of the row, so there is no way how you can select the entire column vertically and just process the
values from this column.*/

//Modify the user age in the table 
test('web tables', async ({page})=> {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  //1. get the row by any test in this row
  const targetRow = await page.getByRole('row', {name: "twitter@outlook.com"})
  await targetRow.locator('.nb-edit').click()
  const editAgeRow = await page.locator('input-editor').getByPlaceholder("Age")
  //clear the age
  await editAgeRow.clear();
  await editAgeRow.fill("40");
  //click checkMark 
  const checkMarkBtn = await page.locator('.nb-checkmark')
  await checkMarkBtn.click();


// TODO: make sure to finish the video WEb Table 1 and 2.
})

test.skip('date picker', async ({page}) => {
await page.getByText("Forms").click(); 
await page.getByText("Datepicker").click();

const calenderInputField = await page.getByPlaceholder('Form Picker');
await calenderInputField.click();
//This method you have change the date manually to chagne the date for automation.
const pickDate = page.locator('[class="day-cell ng-star-inserted"]').getByText('28',{exact:true})
await pickDate.click();
await expect(calenderInputField).toHaveValue('Sep 28, 2025');


})
test('Dynamic date picker', async ({page})=> {
  await page.getByText("Forms").click(); 
  await page.getByText("Datepicker").click();

const calenderInputField = await page.getByPlaceholder('Form Picker');
await calenderInputField.click();

//Date is a JavaScript object that can perform a different operations with the date and time.
let date = new Date ()
date.setDate(date.getDate() + 21) //Change the date
const expectedDate = date.getDate().toString ()
const expectedMonthShot = date. toLocaleString ('En-US', {month: 'short'})
const expectedMonthLong = date. toLocaleString ('En-US', {month: 'long'})
const expectedYear = date.getFullYear ()
const dateToAssert =  `${expectedMonthShot} ${expectedDate}, ${expectedYear}`
let calendarMonthAndYear = await page. locator ('nb-calendar-view-mode'). textContent ( )
const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`
//Change the date dynamicly
while(!calendarMonthAndYear. includes(expectedMonthAndYear)) {
await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
calendarMonthAndYear = await page.locator ('nb-calendar-view-mode').textContent ()

}

const pickDate = page.locator('[class="day-cell ng-star-inserted"]').getByText( expectedDate,{exact:true})
await pickDate.click();
await expect(calenderInputField).toHaveValue(dateToAssert);

})

test('slider', async ({page})=> {
await page.getByText('IoT Dashboard').click()

  //update attribute
  const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
  await tempGauge.evaluate(node => {
    node.setAttribute('cx', '232.6309')
    node.setAttribute('cy', '232.6309')
  })
  //this is short cut
  await tempGauge.click();
})

test('Slider with mouse', async ({page}) => {
  
  await page.getByText('IoT Dashboard').click()
  const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
  await tempBox.scrollIntoViewIfNeeded()

  const box = await tempBox.boundingBox()
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  await page.mouse.move (x, y)
  await page.mouse.down()
  await page.mouse.move(x +100 , y)
  await page.mouse.move(x+100, y+100)
  await page.mouse.up()
  await expect(tempBox).toContainText('30')
})

  })



