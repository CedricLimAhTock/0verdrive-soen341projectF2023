import { test, expect, vi } from "vitest";
import { render, fireEvent, waitFor, findByText } from "@testing-library/react";
import OfferForm from "../components/OfferForm/OfferForm";
import ReceivedOffers from "../components/DashboardDetails/ReceivedOffers";
import axios from "axios";
import { DarkModeContext } from "../components/DarkModeContext/DarkModeContext";
import DarkModeProvider from "../components/DarkModeProvider/DarkModeProvider";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

test("renders OfferForm and updates input values", async ({ expect }) => {
  const closeForm = () => {}; // Mock function
  globalThis.alert = () => {};
  localStorage.setItem(
    "jwtToken",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJteXN0ZXJpb3VzcHJvcGVydHkiLCJyb2xlIjoiYnJva2VyIiwiYnJva2VyX2lkIjozLCJpYXQiOjE2OTk1ODgyMzF9.LY-Bd9khYuQcwwhECppd3iTQCpe5nruEC6Low7cCmnA"
  );

  const brokerFetch = await axios.get(
    "http://localhost:8080/broker/username/mysteriousproperty"
  );

  const property = {
    images: [
      {
        original: "https://picsum.photos/id/1018/1000/600/",
      },
    ],
    id: 1,
    active: true,
    civic_address: "4",
    apt_number: "801",
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
    property_type: "condominium",
  };
  const broker = brokerFetch.data;
  const { getByPlaceholderText: getByPlaceholderText1 } = render(
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <DarkModeProvider>
              <OfferForm
                isFormOpen={true}
                closeForm={closeForm}
                property={property}
                broker={broker}
              />
            </DarkModeProvider>
          }
        ></Route>
      </Routes>
    </Router>
  );

  const priceOfferedInput = getByPlaceholderText1("Enter a price");

  await fireEvent.change(priceOfferedInput, { target: { value: "2" } });

  expect(priceOfferedInput.value).toBe("2");

  // await fireEvent.click(getByText1("Submit"));
  // localStorage.removeItem("jwtToken");
  // unmount1();
  // localStorage.setItem(
  //   "jwtToken",
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJnb29meW1lbW9yeSIsInJvbGUiOiJicm9rZXIiLCJicm9rZXJfaWQiOjEsImlhdCI6MTY5OTY3MDg3MH0.obmYIVx2lBGNg5luZIiGyRegxQjzy7Hi1ecbLJx-Bvo"
  // );
  // const {
  //   getByPlaceholderText: getByPlaceholderText2,
  //   getAllByPlaceholderText: getAllByPlaceholderText2,
  //   getByText: getByText2,
  //   getByDisplayValue: getByDisplayValue2,
  //   findByText: findByText2,
  // } = render(<ReceivedOffers />);

  // let test;
  // await waitFor(
  //   async () => {
  //     test = await findByText2("$2");
  //     expect(test).toBeTruthy();
  //   },
  //   { timeout: 10000 }
  // );

  // localStorage.removeItem("jwtToken");
});
