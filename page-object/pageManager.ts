import { Page, expect } from "@playwright/test";
import { NavigationPage } from "./navigationPage";
import { FormLayoutsPage } from "./formLayoutPage";
import { DatePickerPage } from "./datePickerPage";

export class PageManager {
  private readonly page: Page;
  private readonly navigationPage: NavigationPage;
  private readonly formLayoutsPage: FormLayoutsPage;
  private readonly datepickerPage: DatePickerPage;

  constructor(page: Page) {
  this.page = page;
  this.navigationPage = new NavigationPage(this.page);
  this.formLayoutsPage = new FormLayoutsPage(this.page);
  this.datepickerPage = new DatePickerPage(this.page);

  }


  navigateTo() {
    return this.navigationPage;
  }

  onFormLayoutPage() {
    return this.formLayoutsPage;
  }

  onDatePickerPage() {
    return this.datepickerPage;
  }
  
}
