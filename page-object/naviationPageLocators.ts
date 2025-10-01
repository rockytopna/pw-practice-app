import { Locator, Page } from "@playwright/test";

export class NavigationPageLocator {
  readonly page: Page;
  readonly formLayoutMenuItem: Locator
  readonly datePickerMenuItem: Locator
  readonly smartTableMenuItem: Locator
  readonly toastrMenuItem: Locator
  readonly tooltipMenuItem: Locator

  constructor(page: Page) {
    this.page = page;
    this.formLayoutMenuItem = page.getByText("Form Layouts")
    this.datePickerMenuItem = page.getByText("Datepicker")
    this.smartTableMenuItem = page.getByText("Smart Table")
    this.toastrMenuItem = page.getByText("Toastr")
    this.tooltipMenuItem = page.getByText("Tooltip")
  }

  async formLayoutPage() {
    await this.selectGroupMenuItem("Forms");
    await this.formLayoutMenuItem.click();
  }

  async datePickerPage() {
    await this.selectGroupMenuItem("Forms");
    await this.page.waitForTimeout(1000);
    await this.datePickerMenuItem.click();
  }

  async smartTablePage() {
    // await this.page.getByText("Tables & Data").click();
    await this.selectGroupMenuItem("Tables & Data");
    await this.smartTableMenuItem.click();
  }

  async toastrPage() {
    // await this.page.getByText("Modal & Overlays").click();
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.toastrMenuItem.click();
  }

  async tooltipPage() {
    // await this.page.getByText("Modal & Overlays").click();
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.tooltipMenuItem.click();
  }

  //this method private and not visible outside of this class.
  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const expendedState = await groupMenuItem.getAttribute("aria-expanded");
    if (expendedState == "false") await groupMenuItem.click();
  }
}