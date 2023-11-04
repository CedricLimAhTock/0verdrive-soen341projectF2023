import { expect, test } from "vitest";
import axios from "axios";

test("Search API should return expected results", async (t) => {
  // Define the search query
  const query = {
    fields: {
      civic_address: "",
      apt_number: "",
      street: "Mcguire",
      neighbourhood: "",
      city: "Montreal",
      province: "Quebec",
      postal_code: "",
      country: "Canada",
      listing_type: "sale",
      price: {},
      living_area: { "min": 0, "max": 9999 },
      property_area: { "min": 0, "max": 99999 },
      num_bedrooms: { "min": 0, "max": 1000 },
      num_bathrooms: { "min": 0, "max": 1000 },
      num_floors: { "min": 0, "max": 1000 },
      year_built: { "min": "1970-01-01" },
      listed_date: {},
      property_type: ""
    },
    sort: {
      parameter: "price",
      order: "desc"
    }
  };

  // Make a request to the search API
  const response = await axios.post(
    "http://localhost:8080/property/search",
    query
  );

  // Assert that the response status is 200 (OK)
  expect(response.status).toBe(200);

  // Assert that the response data matches the expected format
  const result = response.data;

  // Add assertions to validate the response data
  // ...

});