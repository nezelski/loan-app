import { test, expect } from "@playwright/test";
import Home from "../page-objects/pages/Home";
import LoanDecision from "../page-objects/pages/LoanDecision";

test.describe("loan APP tests", async () => {
  test("TL-20-1  Basic flow", async ({ page }) => {
    const testData = {
      initialAmount: "500",
      amountToSet: "1000",
      initialPeriod: "12",
      periodToSet: "28",
    };
    const home = new Home(page);
    const loanDecision = new LoanDecision(page);
    await home.goto();
    await home.amountSlider.checkValue(testData.initialAmount);
    await home.amountInput.fill(testData.amountToSet);
    await home.amountSlider.checkValue(testData.amountToSet);
    await home.periodSlider.checkValue(testData.initialPeriod);
    await home.periodSelect.click();
    await home.periodSelect.chooseOption(testData.periodToSet);
    await home.periodSlider.checkValue(testData.periodToSet);
    await home.applyNowButton.click();
    await home.usernameField.fill("test");
    await home.passwordField.fill("password");
    await home.continueButton.click();
    await loanDecision.checkFinalAmount(testData.amountToSet);
    await loanDecision.languageSelect.chooseOption("Estonian");
    await loanDecision.continueButton.click();
    await loanDecision.popupOkButton.checkVisible();
  });

  test("TL-20-2 amount field visibility check", async ({ page }) => {
    const home = new Home(page);
    await home.goto();
    await home.applyForLoanButton2.shouldNotBeInViewPort();
    await home.applyForLoanButton2.scroll();
    await home.applyForLoanButton2.shouldBeInViewPort();
    await home.applyForLoanButton2.click();
    await home.amountInput.shouldBeInViewPort();
  });
});
