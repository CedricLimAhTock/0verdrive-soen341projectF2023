import { test, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import MortgageCalculator from "../components/MortgageCalculator/MortgageCalculator";

test("renders MortgageCalculator and updates input values", async () => {
  const onClose = () => {}; // Mock function

  const property = {
    images: [
      {
        original: "https://picsum.photos/id/1018/1000/600/",
      },
      {
        original: "https://picsum.photos/id/1015/1000/600/",
      },
      {
        original: "https://picsum.photos/id/1019/1000/600/",
      },
    ],

    id: 1,
    active: true,
    civicAddress: "4",
    aptNumber: "801",
    street: "Heffernan",
    neighbourhood: "Conception Bay South",
    city: "Montreal",
    province: "Quebec",
    postal_code: "I6Y 1M6",
    country: "Canada",
    listing_type: "rent",
    price: 9256,
    living_area: 3122,
    property_area: 8996,
    num_bedrooms: 3,
    num_bathrooms: 8,
    num_floors: 4,
    year_built: "1923-01-01",
    listed_date: "2022-12-15",
  };
  const { getByPlaceholderText, getByText } = render(
    <MortgageCalculator isOpen={true} onClose={onClose} property={property} />
  );

  const homePriceInput = getByPlaceholderText("Enter home price");
  const downPaymentInput = getByPlaceholderText(
    "Enter down payment percentage"
  );
  const interestRate = getByPlaceholderText("Enter annual interest rate");
  const loanTerm = getByPlaceholderText("Enter loan term in years");

  await fireEvent.change(homePriceInput, { target: { value: "250000" } });
  await fireEvent.change(downPaymentInput, { target: { value: "20" } });
  await fireEvent.change(interestRate, { target: { value: "5" } });
  await fireEvent.change(loanTerm, { target: { value: "30" } });

  expect(homePriceInput.value).toBe("250000");
  expect(downPaymentInput.value).toBe("20");
  expect(interestRate.value).toBe("5");
  expect(loanTerm.value).toBe("30");

  await new Promise((resolve) => setTimeout(resolve, 0));

  // Get the mortgage result
  const mortgageResult =
    getByText(/Mortgage Result:/).querySelector("span").textContent;
  // Check the mortgage result
  expect(mortgageResult).toBe("$104158");
});
