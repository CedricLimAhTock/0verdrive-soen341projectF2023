import { test, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import MortgageCalculator from "../components/MortgageCalculator/MortgageCalculator";

test("renders MortgageCalculator and updates input values", async () => {
  const onClose = () => {}; // Mock function
  const { getByPlaceholderText, getByText } = render(
    <MortgageCalculator isOpen={true} onClose={onClose} property={null} />
  );

  const homePriceInput = getByPlaceholderText("Enter home price");
  const downPaymentInput = getByPlaceholderText(
    "Enter down payment percentage"
  );
  const interestRate = getByPlaceholderText("Enter annual interest rate");
  const loanTerm = getByPlaceholderText("Enter loan term in years");
  const propertyTaxes = getByPlaceholderText(
    "Enter annual property tax amount"
  );

  await fireEvent.change(homePriceInput, { target: { value: "250000" } });
  await fireEvent.change(downPaymentInput, { target: { value: "20" } });
  await fireEvent.change(interestRate, { target: { value: "5" } });
  await fireEvent.change(loanTerm, { target: { value: "30" } });
  await fireEvent.change(propertyTaxes, { target: { value: "1000" } });

  expect(homePriceInput.value).toBe("250000");
  expect(downPaymentInput.value).toBe("20");
  expect(interestRate.value).toBe("5");
  expect(loanTerm.value).toBe("30");
  expect(propertyTaxes.value).toBe("1000");

  await new Promise((resolve) => setTimeout(resolve, 0));

  // Get the mortgage result
  const mortgageResult =
    getByText(/Mortgage Result:/).querySelector("span").textContent;
  // Check the mortgage result
  expect(mortgageResult).toBe("$1073.64");
});
