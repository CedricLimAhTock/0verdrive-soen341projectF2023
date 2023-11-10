import { test, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import OfferForm from "../components/OfferForm/OfferForm";
import axios from "axios";

test("renders OfferForm and updates input values", async ({ assert }) => {
  const closeForm = () => {}; // Mock function

  localStorage.setItem(
    "jwtToken",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJteXN0ZXJpb3VzcHJvcGVydHkiLCJyb2xlIjoiYnJva2VyIiwiYnJva2VyX2lkIjozLCJpYXQiOjE2OTk1ODgyMzF9.LY-Bd9khYuQcwwhECppd3iTQCpe5nruEC6Low7cCmnA"
  );
  const propertyFetch = await axios.get("http://localhost:8080/property/1");
  const brokerFetch = await axios.get(
    "http://localhost:8080/broker/username/mysteriousproperty"
  );

  propertyFetch.data.images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
    },
  ];
  const property = propertyFetch.data;
  const broker = brokerFetch.data;

  const { getByPlaceholderText, getAllByPlaceholderText } = render(
    <OfferForm
      isFormOpen={true}
      closeForm={closeForm}
      property={property}
      broker={broker}
    />
  );

  const nameInput = getByPlaceholderText("Name");
  const [userAddressInput, propertyAddressInput] =
    getAllByPlaceholderText("Address");
  const emailInput = getByPlaceholderText("Email");
  const priceOfferedInput = getByPlaceholderText("Enter a price");

  await fireEvent.change(nameInput, { target: { value: "Test User" } });
  await fireEvent.change(userAddressInput, {
    target: { value: "123 Test St" },
  });
  await fireEvent.change(emailInput, {
    target: { value: "test.user@example.com" },
  });
  await fireEvent.change(priceOfferedInput, { target: { value: "200000" } });

  expect(nameInput.value).toBe("Test User");
  expect(userAddressInput.value).toBe("123 Test St");
  expect(emailInput.value).toBe("test.user@example.com");
  expect(priceOfferedInput.value).toBe("200000");
});
