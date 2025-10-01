import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutsPage extends HelperBase {

  constructor(page: Page) {
   super(page)
  }
  /**
   * this method will fill up the form and click the radio button
   * @param email - should be  valid email
   * @param password - should be valid password 
   * @param optiopnText - choose option 1 or 2
   */
async submitUsingTheGridFormwithCredentialAndSelectOption(email: string, password: string, optiopnText:string){
    const usingTheGridForm = this.page.locator("nb-card", {hasText: "Using the Grid",});
    await usingTheGridForm.getByRole("textbox", { name: "Email" }).fill(email)
    await usingTheGridForm.getByRole("textbox", { name: "Password" }).fill(password)
    await usingTheGridForm.getByRole("radio", { name: optiopnText}).check({ force: true })
    await usingTheGridForm.getByRole('button').click()


}

/**
 *  This method will out the Inline form with user details
 * @param name - first name and last name
 * @param email - valid email
 * @param rememberMe - true or false if user session should be saved
 */
async sumbitInlineFormWithNameEmailAndCheckbox (name: string, email: string, rememberMe: boolean){
    const inlineForm = this.page. locator('nb-card', {hasText: "Inline form"})
    await inlineForm.getByRole('textbox', {name: "Jane Doe"}) . fill (name ) 
    await inlineForm.getByRole('textbox', {name: "Email"}). fill(email)
    if( rememberMe)
    await inlineForm.getByRole('checkbox' ).check({force: true})
    await inlineForm.getByRole('button') .click()
  

}
}