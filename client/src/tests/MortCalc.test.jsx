import { test, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import MortgageCalculator from "../components/MortgageCalculator/MortgageCalculator";

test("renders MortgageCalculator and updates input values", async () => {
  const onCloseMock = () => {}; // Mock function
  const { getByPlaceholderText, getByText } = render(
    <MortgageCalculator isOpen={true} onClose={onCloseMock} property={null} />
  );

  const homePriceInput = getByPlaceholderText("Enter home price");
  const downPaymentInput = getByPlaceholderText(
    "Enter down payment percentage"
  );
  const interestRateInput = getByPlaceholderText("Enter annual interest rate");
  const loanTermInput = getByPlaceholderText("Enter loan term in years");

  // Change input values
  await fireEvent.change(homePriceInput, { target: { value: "250000" } });
  await fireEvent.change(downPaymentInput, { target: { value: "20" } });
  await fireEvent.change(interestRateInput, { target: { value: "5" } });
  await fireEvent.change(loanTermInput, { target: { value: "30" } });

  // Check if input values are updated
  expect(homePriceInput.value).toBe("250000");
  expect(downPaymentInput.value).toBe("20");
  expect(interestRateInput.value).toBe("5");
  expect(loanTermInput.value).toBe("30");

  // Wait for the chart to be updated
  await new Promise((resolve) => setTimeout(resolve, 0));

  // Get the mortgage result
  const mortgageResult = getByText(/Mortgage Result:/).querySelector("span")
    .textContent;

  // Check the mortgage result
  expect(mortgageResult).toBe("$104158");
});
