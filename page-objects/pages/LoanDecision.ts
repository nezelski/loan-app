import BasePage from "./BasePage";
import { Page, Locator, expect } from "@playwright/test";
import Button from "../atoms/Button";
import Select from "../atoms/Select";

export default class LoanDecision extends BasePage {
  readonly amountSpan: Locator;
  readonly languageSelect: Select;
  readonly continueButton: Button;
  readonly popupOkButton: Button;

  constructor(page: Page) {
    super(page, "/loan-decision");

    this.amountSpan = page.getByTestId("final-page-amount");
    this.languageSelect = new Select(
      page,
      page.getByTestId("final-page-communication-language"),
    );
    this.continueButton = new Button(
      page,
      page.getByTestId("final-page-continue-button"),
    );
    this.popupOkButton = new Button(
      page,
      page.getByTestId("final-page-success-ok-button"),
    );
  }

  async checkFinalAmount(expected: string) {
    const currentAmount = await this.amountSpan.innerText();
    expect(currentAmount.split(" ")[0]).toBe(expected);
  }
}
